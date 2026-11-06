<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from "vue";
import { motion } from "motion-v";
import { TEAM_MEMBERS } from "../constants/about-us";
import type { TeamMember } from "../types/about-us";

// Constants
const RATIO = 96 / 62;
const MAX_W = 124;
const MIN_RAIL_W = 100;
const EM = 11.2;
const RAIL_PITCH_MIN = 1.16;
const RAIL_PITCH_MAX = 1.62;
const CAROUSEL_PITCH = 1.2;
const GAP = 0.07;
const PERSPECTIVE = 900;
const MAX_STRETCH = 64;
const SWING_K = 28;
const SWING_DAMP = 2.2;
const LAG = 0.12;
const REEL_K = 220;
const REEL_ZETA = 0.5;
const REST_Y = [9, -10, 7, -8, 10, -7, 8, -9];
const REST_Z = [-1.6, 1.2, -2, 1.5, -1, 1.8, -1.3, 2];
const DROPS = [6, 20, 0, 13, 22, 4, 16, 9];
const TONE_CLASSES = [
  "text-chart-1",
  "text-chart-2",
  "text-chart-3",
  "text-chart-4",
  "text-chart-5",
];

const METAL =
  "linear-gradient(to right, color-mix(in oklab, var(--color-muted-foreground) 70%, black), color-mix(in oklab, var(--color-muted-foreground) 22%, white) 38%, var(--color-muted-foreground) 70%, color-mix(in oklab, var(--color-muted-foreground) 65%, black))";

// Utilities
function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let a = seed || 1;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildQr(seed: number) {
  const size = 21;
  const next = rng(seed);
  const corners = [
    [0, 0],
    [size - 7, 0],
    [0, size - 7],
  ];
  let d = "";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const corner = corners.find(
        ([cx = 0, cy = 0]) => x >= cx && x < cx + 7 && y >= cy && y < cy + 7,
      );
      const quiet =
        (x < 8 && y < 8) ||
        (x >= size - 8 && y < 8) ||
        (x < 8 && y >= size - 8);
      let on: boolean;
      if (corner)
        on =
          Math.max(
            Math.abs(x - (corner[0] ?? 0) - 3),
            Math.abs(y - (corner[1] ?? 0) - 3),
          ) !== 2;
      else if (quiet) on = false;
      else if (x === 6 || y === 6) on = (x + y) % 2 === 0;
      else on = next() > 0.52;
      if (on) d += `M${x} ${y}h1v1h-1z`;
    }
  }
  return d;
}

function buildBarcode(seed: number) {
  const next = rng(seed ^ 0x9e3779b9);
  let x = 0;
  let d = "";
  while (x < 92) {
    const w = 1 + Math.floor(next() * 3);
    d += `M${x} 0h${w}v20h-${w}z`;
    x += w + 1 + Math.floor(next() * 2.2);
  }
  return { d, width: x };
}

function soft(distance: number, max: number) {
  const knee = max * 0.75;
  if (distance <= knee) return distance;
  return (
    knee + (max - knee) * (1 - Math.exp(-(distance - knee) / (max - knee)))
  );
}

// Badge Data
const badgeData = TEAM_MEMBERS.map((item) => {
  const seed = hash(`${item.id}:${item.name}`);
  const qr = buildQr(seed);
  const bc = buildBarcode(seed);
  const digits = String(seed % 1000000000).padStart(9, "0");
  return { seed, qr, bc, digits };
});

function getTone(item: TeamMember, i: number) {
  return (
    TONE_CLASSES[((item.tone ?? (i % 5) + 1) - 1) % TONE_CLASSES.length] ??
    TONE_CLASSES[0]
  );
}

// Geometry
function geometry(W: number, members: TeamMember[]) {
  const u = W / MAX_W;
  const H = W * RATIO;
  const railR = Math.max(3, 4.2 * u);
  const railY = 14 + railR;
  const ring = 9 * u;
  const pivotY = railY + ring * 0.8;
  const strapW = Math.max(8, 11 * u);
  const crimp = 6 * u;
  const reel = 21 * u;
  const cordRest = 12 * u;
  const clipH = 13 * u;
  const clipW = 30 * u;
  const base = 56 * u;
  const straps = members.map(
    (m, i) => base + Math.max(0, m.drop ?? DROPS[i % DROPS.length] ?? 0) * u,
  );
  const reelTops = straps.map((len) => pivotY + len + crimp * 0.6);
  const clipTops = reelTops.map((top) => top + reel * 0.82 + cordRest);
  const cardTops = clipTops.map((top) => top + clipH * 0.62);
  const pendulum = cardTops.map((top) => top + H / 2 - pivotY);
  const restLength =
    pivotY +
    base +
    crimp * 0.6 +
    reel * 0.82 +
    cordRest +
    clipH * 0.62 +
    H / 2 -
    pivotY;
  const bottom = Math.max(0, ...cardTops.map((top) => top + H));
  return {
    W,
    H,
    u,
    railR,
    railY,
    ring,
    pivotY,
    strapW,
    crimp,
    reel,
    cordRest,
    clipH,
    clipW,
    straps,
    reelTops,
    clipTops,
    cardTops,
    pendulum,
    swingK: pendulum.map((len) => (SWING_K * restLength) / len),
    couple: pendulum.map((len) => (0.25 * 57.3) / len),
    maxStretch: Math.round(MAX_STRETCH * Math.min(1, W / 118)),
    height: Math.ceil(bottom + 16 * u + 8),
  };
}

function layoutTargets(
  width: number,
  W: number,
  carousel: boolean,
  center: number | null,
  n: number,
) {
  if (!carousel) {
    const pitch = clamp(
      (width - 40 - W * 0.6) / Math.max(1, n),
      W * RAIL_PITCH_MIN,
      W * RAIL_PITCH_MAX,
    );
    const start = width / 2 - (pitch * (n - 1)) / 2;
    return {
      xs: Array.from({ length: n }, (_, i) => start + i * pitch),
      total: 0,
    };
  }
  const pitch = W * CAROUSEL_PITCH;
  const total = pitch * n;
  const cyclic = n > 2 && total >= width + W * 2;
  const c = center ?? 0;
  const xs = Array.from({ length: n }, (_, i) => {
    let k = i - c;
    if (cyclic) {
      k = ((k % n) + n) % n;
      if (k >= n / 2) k -= n;
    }
    return width / 2 + k * pitch;
  });
  return { xs, total: cyclic ? total : 0 };
}

// Simulation
type Sim = {
  x: number[];
  vx: number[];
  px: number[];
  tx: number[];
  sw: number[];
  vsw: number[];
  beta: number[];
  ry: number[];
  vry: number[];
  tr: number[];
  rz: number[];
  vrz: number[];
  tz: number[];
  lift: number[];
  vlift: number[];
  tl: number[];
  pop: number[];
  vpop: number[];
  tp: number[];
  st: number[];
  vst: number[];
  drag: number;
  grab: number;
  pull: number;
  free: number;
  last: number;
  raf: number;
  carousel: boolean | null;
};

function emptySim(): Sim {
  return {
    x: [],
    vx: [],
    px: [],
    tx: [],
    sw: [],
    vsw: [],
    beta: [],
    ry: [],
    vry: [],
    tr: [],
    rz: [],
    vrz: [],
    tz: [],
    lift: [],
    vlift: [],
    tl: [],
    pop: [],
    vpop: [],
    tp: [],
    st: [],
    vst: [],
    drag: -1,
    grab: 0,
    pull: -1,
    free: 0,
    last: 0,
    raf: 0,
    carousel: null,
  };
}

function springStep(
  val: number[],
  vel: number[],
  target: number,
  i: number,
  k: number,
  zeta: number,
  h: number,
) {
  const v = vel[i] ?? 0;
  const x = val[i] ?? 0;
  const next = v + (-k * (x - target) - 2 * zeta * Math.sqrt(k) * v) * h;
  vel[i] = next;
  val[i] = x + next * h;
}

function bw(s: Sim, W: number, i: number) {
  return W * (1 + 0.08 * (s.pop[i] ?? 0));
}

function mg(s: Sim, W: number, a: number, b: number) {
  return (bw(s, W, a) + bw(s, W, b)) / 2 + W * GAP;
}

function stops(s: Sim, W: number, width: number, n: number) {
  return [
    W * 0.32 + bw(s, W, 0) / 2,
    width - W * 0.32 - bw(s, W, n - 1) / 2,
  ] as const;
}

type EG = {
  W: number;
  H: number;
  pivotY: number;
  clipTops: number[];
  cardTops: number[];
};

function cardEdge(s: Sim, g: EG, i: number, side: 1 | -1) {
  const theta = ((s.sw[i] ?? 0) * Math.PI) / 180;
  const psi = (((s.beta[i] ?? 0) + (s.rz[i] ?? 0)) * Math.PI) / 180;
  const scale = 1 + 0.08 * (s.pop[i] ?? 0);
  const clipDepth =
    (g.clipTops[i] ?? 0) + (s.st[i] ?? 0) - 4 * (s.lift[i] ?? 0) - g.pivotY;
  const offset = (g.cardTops[i] ?? 0) - (g.clipTops[i] ?? 0);
  const cx = (s.x[i] ?? 0) - clipDepth * Math.sin(theta);
  const half = (g.W / 2) * scale * Math.cos(psi) * side;
  return [
    cx + half - offset * scale * Math.sin(psi),
    cx + half - (offset + g.H) * scale * Math.sin(psi),
    clipDepth + offset * scale,
    clipDepth + (offset + g.H) * scale,
  ] as const;
}

// Reactive State
const stageRef = ref<HTMLDivElement | null>(null);

const slotEls = ref<(HTMLDivElement | null)[]>(
  Array(TEAM_MEMBERS.length).fill(null),
);

const swingEls = ref<(HTMLSpanElement | null)[]>(
  Array(TEAM_MEMBERS.length).fill(null),
);

const strapEls = ref<(HTMLSpanElement | null)[]>(
  Array(TEAM_MEMBERS.length).fill(null),
);

const cordEls = ref<(HTMLSpanElement | null)[]>(
  Array(TEAM_MEMBERS.length).fill(null),
);

const hangEls = ref<(HTMLSpanElement | null)[]>(
  Array(TEAM_MEMBERS.length).fill(null),
);

const flipEls = ref<(HTMLSpanElement | null)[]>(
  Array(TEAM_MEMBERS.length).fill(null),
);

const shadowEls = ref<(HTMLSpanElement | null)[]>(
  Array(TEAM_MEMBERS.length).fill(null),
);

const linkLayers = ref<(HTMLDivElement | null)[]>(
  Array(TEAM_MEMBERS.length).fill(null),
);

const buttonEls = ref<(HTMLButtonElement | null)[]>(
  Array(TEAM_MEMBERS.length).fill(null),
);

const sim = ref<Sim>(emptySim());
const stageWidth = ref(0);
const stageW = ref(MAX_W);
const isCarousel = ref(false);
const innerActive = ref<number | null>(null);
const innerFlipped = ref<number | null>(null);
const focusIndex = ref(0);
const reduced = ref(false);
const carouselIndex = ref(0);
const cyclic = ref(false);
const swayed = ref(false);
const pendingFlip = ref(-1);

const active = computed(() => {
  const v = innerActive.value;
  return v === null || v < 0 || v >= TEAM_MEMBERS.length ? null : v;
});

const flipped = computed(() => {
  const v = innerFlipped.value;
  return v === null || v < 0 || v >= TEAM_MEMBERS.length ? null : v;
});

const geo = computed(() => geometry(stageW.value, TEAM_MEMBERS));

// Pointer state
const ptr = ref({
  id: -1,
  index: -1,
  x: 0,
  y: 0,
  mode: "",
  kind: "",
  lastX: 0,
  lastY: 0,
  lastT: 0,
  v: 0,
  swipe: 0,
  hoverX: 0,
  hoverT: 0,
  hoverHit: -1,
});

// Paint
function paint(i: number) {
  const s = sim.value;
  const g = geo.value;
  const slot = slotEls.value[i];

  if (!slot) return;

  slot.style.transform = `translate3d(${((s.x[i] ?? 0) - g.W / 2).toFixed(2)}px,0,0)`;

  const swEl = swingEls.value[i];

  if (swEl) swEl.style.transform = `rotate(${(s.sw[i] ?? 0).toFixed(3)}deg)`;

  strapEls.value[i]?.style.setProperty(
    "--stretch",
    `${(s.st[i] ?? 0).toFixed(2)}px`,
  );

  const cord = cordEls.value[i];

  if (cord)
    cord.style.transform = `scaleY(${Math.max(0.12, (g.cordRest + (s.st[i] ?? 0)) / g.cordRest).toFixed(4)})`;

  const hang = hangEls.value[i];

  if (hang)
    hang.style.transform = `translate3d(0,${((s.st[i] ?? 0) - 4 * (s.lift[i] ?? 0)).toFixed(2)}px,0) rotate(${((s.beta[i] ?? 0) - (s.sw[i] ?? 0) + (s.rz[i] ?? 0)).toFixed(3)}deg) scale(${(1 + 0.08 * (s.pop[i] ?? 0)).toFixed(4)})`;

  const ry = s.ry[i] ?? 0;
  const flipEl = flipEls.value[i];
  const facing = Math.abs(Math.cos((ry * Math.PI) / 180));

  if (flipEl) {
    flipEl.style.transform = `perspective(${PERSPECTIVE}px) rotateY(${ry.toFixed(2)}deg)`;
    flipEl.style.setProperty("--shade", ((1 - facing) * 0.45).toFixed(3));
    const phi = ((((ry + 90) % 180) + 180) % 180) - 90;
    flipEl.style.setProperty("--gx", `${(phi * 0.9).toFixed(1)}%`);
  }

  const shadow = shadowEls.value[i];

  if (shadow) {
    const lift = s.lift[i] ?? 0;
    const pop = s.pop[i] ?? 0;
    shadow.style.transform = `translate3d(${(g.W * 0.045 + lift * 3 * g.u).toFixed(2)}px,${(g.H * 0.03 + lift * 7 * g.u).toFixed(2)}px,0) scale(${(Math.max(0.12, facing) * (1 + 0.03 * lift + 0.05 * pop)).toFixed(3)},${(1 + 0.03 * lift + 0.05 * pop).toFixed(3)})`;
    shadow.style.opacity = (0.72 + 0.28 * lift).toFixed(3);
  }

  const layer = linkLayers.value[i];

  const on =
    !!layer &&
    Math.abs(ry - 180) < (layer.style.visibility === "visible" ? 24 : 9);

  if (layer) {
    layer.style.opacity = on ? "1" : "0";
    layer.style.visibility = on ? "visible" : "hidden";
  }

  if (flipEl) flipEl.style.setProperty("--drawn", on ? "0" : "1");
}

// Simulation Step
function step(now: number) {
  const s = sim.value;
  const g = geo.value;
  const width = stageWidth.value;
  const carousel = isCarousel.value;
  const dt = s.last ? Math.min(0.1, (now - s.last) / 1000) : 1 / 60;
  s.last = now;
  const sub = Math.max(3, Math.ceil(dt / 0.006));
  const h = dt / sub;
  let busy = false;
  for (let k = 0; k < sub; k++) {
    for (let i = 0; i < TEAM_MEMBERS.length; i++) {
      const before = s.vx[i] ?? 0;
      if (i !== s.drag) {
        const ax =
          now > s.free
            ? -130 * ((s.x[i] ?? 0) - (s.tx[i] ?? 0)) -
              2 * Math.sqrt(130) * 0.86 * before
            : -3.2 * before;
        s.vx[i] = before + ax * h;
        s.x[i] = (s.x[i] ?? 0) + (s.vx[i] ?? 0) * h;
      }
    }
    if (!carousel && TEAM_MEMBERS.length > 0) {
      const [left, right] = stops(s, g.W, width, TEAM_MEMBERS.length);
      if (s.drag >= 0) {
        const d = s.drag;
        for (let j = d - 1; j >= 0; j--) {
          const lim = (s.x[j + 1] ?? 0) - mg(s, g.W, j, j + 1);
          if ((s.x[j] ?? 0) > lim) {
            s.x[j] = lim;
            s.vx[j] = Math.min(s.vx[j] ?? 0, s.vx[j + 1] ?? 0);
          }
        }
        for (let j = d + 1; j < TEAM_MEMBERS.length; j++) {
          const lim = (s.x[j - 1] ?? 0) + mg(s, g.W, j - 1, j);
          if ((s.x[j] ?? 0) < lim) {
            s.x[j] = lim;
            s.vx[j] = Math.max(s.vx[j] ?? 0, s.vx[j - 1] ?? 0);
          }
        }
      } else {
        for (let pass = 0; pass < 3; pass++) {
          for (let j = 0; j < TEAM_MEMBERS.length - 1; j++) {
            const a = s.x[j] ?? 0;
            const b = s.x[j + 1] ?? 0;
            const ov = mg(s, g.W, j, j + 1) - (b - a);
            if (ov <= 0) continue;
            s.x[j] = a - ov / 2;
            s.x[j + 1] = b + ov / 2;
            const va = s.vx[j] ?? 0;
            const vb = s.vx[j + 1] ?? 0;
            if (va > vb) {
              const sh = (va + vb) / 2;
              s.vx[j] = sh;
              s.vx[j + 1] = sh;
            }
          }
        }
        if ((s.x[0] ?? 0) < left) {
          s.x[0] = left;
          s.vx[0] = Math.abs(s.vx[0] ?? 0) * 0.3;
        }
        for (let j = 1; j < TEAM_MEMBERS.length; j++)
          s.x[j] = Math.max(
            s.x[j] ?? 0,
            (s.x[j - 1] ?? 0) + mg(s, g.W, j - 1, j),
          );
        if ((s.x[TEAM_MEMBERS.length - 1] ?? 0) > right) {
          s.x[TEAM_MEMBERS.length - 1] = right;
          s.vx[TEAM_MEMBERS.length - 1] =
            -Math.abs(s.vx[TEAM_MEMBERS.length - 1] ?? 0) * 0.3;
        }
        for (let j = TEAM_MEMBERS.length - 2; j >= 0; j--)
          s.x[j] = Math.min(
            s.x[j] ?? 0,
            (s.x[j + 1] ?? 0) - mg(s, g.W, j, j + 1),
          );
      }
    }
    for (let i = 0; i < TEAM_MEMBERS.length; i++) {
      const dv = (s.vx[i] ?? 0) - (s.px[i] ?? 0);
      s.px[i] = s.vx[i] ?? 0;
      if (i !== s.pull) {
        const sw = s.sw[i] ?? 0;
        const vsw = clamp(
          (s.vsw[i] ?? 0) + (g.couple[i] ?? 0.07) * clamp(dv, -900, 900),
          -90,
          90,
        );
        const next =
          vsw + (-(g.swingK[i] ?? SWING_K) * sw - SWING_DAMP * vsw) * h;
        s.vsw[i] = next;
        s.sw[i] = clamp(sw + next * h, -18, 18);
      }
      s.beta[i] =
        (s.beta[i] ?? 0) +
        ((s.sw[i] ?? 0) - (s.beta[i] ?? 0)) * Math.min(1, h / LAG);
      springStep(s.ry, s.vry, s.tr[i] ?? 0, i, 170, 0.62, h);
      springStep(s.rz, s.vrz, s.tz[i] ?? 0, i, 120, 0.8, h);
      springStep(s.lift, s.vlift, s.tl[i] ?? 0, i, 200, 0.75, h);
      springStep(s.pop, s.vpop, s.tp[i] ?? 0, i, 160, 0.55, h);
      if (i !== s.pull) {
        springStep(s.st, s.vst, 0, i, REEL_K, REEL_ZETA, h);
        s.st[i] = Math.max(-g.cordRest * 0.85, s.st[i] ?? 0);
      }
    }
    for (let a = 0; a < TEAM_MEMBERS.length - 1; a++) {
      const b = a + 1;
      if ((s.x[b] ?? 0) <= (s.x[a] ?? 0)) continue;
      const [aT, aB, aAT, aAB] = cardEdge(s, g, a, 1);
      const [bT, bB, bAT, bAB] = cardEdge(s, g, b, -1);
      const topEx = aT - bT + 2;
      const botEx = aB - bB + 2;
      const excess = Math.max(topEx, botEx);
      if (excess <= 0) continue;
      const arm = Math.max(
        40,
        topEx > botEx ? (aAT + bAT) / 2 : (aAB + bAB) / 2,
      );
      const push = (Math.asin(clamp(excess / arm, 0, 1)) * 180) / Math.PI;
      const share = a === s.pull ? 0 : b === s.pull ? 1 : 0.5;
      s.sw[a] = clamp((s.sw[a] ?? 0) + push * share, -18, 18);
      s.beta[a] = (s.beta[a] ?? 0) + push * share;
      s.sw[b] = clamp((s.sw[b] ?? 0) - push * (1 - share), -18, 18);
      s.beta[b] = (s.beta[b] ?? 0) - push * (1 - share);
      const va = s.vsw[a] ?? 0;
      const vb = s.vsw[b] ?? 0;
      if (vb - va > 0) {
        const mean = (va + vb) / 2;
        if (a !== s.pull) s.vsw[a] = mean + (vb - va) * 0.15;
        if (b !== s.pull) s.vsw[b] = mean - (vb - va) * 0.15;
      }
    }
  }
  for (let i = 0; i < TEAM_MEMBERS.length; i++) {
    paint(i);
    if (
      Math.abs(s.vx[i] ?? 0) > 0.4 ||
      (now > s.free && Math.abs((s.x[i] ?? 0) - (s.tx[i] ?? 0)) > 0.25) ||
      Math.abs((s.ry[i] ?? 0) - (s.tr[i] ?? 0)) > 0.05 ||
      Math.abs(s.vry[i] ?? 0) > 0.05 ||
      Math.abs((s.rz[i] ?? 0) - (s.tz[i] ?? 0)) > 0.02 ||
      Math.abs(s.vrz[i] ?? 0) > 0.05 ||
      Math.abs((s.lift[i] ?? 0) - (s.tl[i] ?? 0)) > 0.002 ||
      Math.abs(s.vlift[i] ?? 0) > 0.01 ||
      Math.abs((s.pop[i] ?? 0) - (s.tp[i] ?? 0)) > 0.002 ||
      Math.abs(s.vpop[i] ?? 0) > 0.01 ||
      Math.abs(s.sw[i] ?? 0) > 0.02 ||
      Math.abs(s.vsw[i] ?? 0) > 0.05 ||
      Math.abs((s.beta[i] ?? 0) - (s.sw[i] ?? 0)) > 0.01 ||
      Math.abs(s.st[i] ?? 0) > 0.05 ||
      Math.abs(s.vst[i] ?? 0) > 0.1
    )
      busy = true;
  }
  if (s.drag >= 0 || s.pull >= 0 || now < s.free) busy = true;
  if (busy) {
    s.raf = requestAnimationFrame(step);
  } else {
    s.raf = 0;
    s.last = 0;
    for (let i = 0; i < TEAM_MEMBERS.length; i++) {
      if (now > s.free) {
        s.x[i] = s.tx[i] ?? 0;
        s.vx[i] = 0;
        s.px[i] = 0;
      }
      s.sw[i] = 0;
      s.vsw[i] = 0;
      s.beta[i] = 0;
      s.st[i] = 0;
      s.vst[i] = 0;
      s.ry[i] = s.tr[i] ?? 0;
      s.vry[i] = 0;
      s.rz[i] = s.tz[i] ?? 0;
      s.vrz[i] = 0;
      s.lift[i] = s.tl[i] ?? 0;
      s.vlift[i] = 0;
      s.pop[i] = s.tp[i] ?? 0;
      s.vpop[i] = 0;
      paint(i);
    }
  }
}

function snapAll() {
  const s = sim.value;
  for (let i = 0; i < TEAM_MEMBERS.length; i++) {
    s.x[i] = s.tx[i] ?? 0;
    s.vx[i] = 0;
    s.px[i] = 0;
    s.sw[i] = 0;
    s.vsw[i] = 0;
    s.beta[i] = 0;
    if (i !== s.pull) {
      s.st[i] = 0;
      s.vst[i] = 0;
    }
    s.ry[i] = s.tr[i] ?? 0;
    s.vry[i] = 0;
    s.rz[i] = s.tz[i] ?? 0;
    s.vrz[i] = 0;
    s.lift[i] = s.tl[i] ?? 0;
    s.vlift[i] = 0;
    s.pop[i] = s.tp[i] ?? 0;
    s.vpop[i] = 0;
    paint(i);
  }
}

function kick() {
  const s = sim.value;

  if (reduced.value) {
    cancelAnimationFrame(s.raf);
    s.raf = 0;
    snapAll();
    return;
  }

  if (!s.raf) {
    s.last = 0;
    s.raf = requestAnimationFrame(step);
  }
}

function impulse(i: number, amount: number) {
  if (reduced.value || i < 0 || i >= TEAM_MEMBERS.length) return;
  sim.value.vsw[i] = (sim.value.vsw[i] ?? 0) + amount;
  kick();
}

function tug(i: number, amount: number) {
  if (reduced.value || i < 0 || i >= TEAM_MEMBERS.length) return;
  sim.value.vst[i] = (sim.value.vst[i] ?? 0) + amount;
  kick();
}

// Layout
function syncTargets() {
  const s = sim.value;
  const center = isCarousel.value
    ? (active.value ?? carouselIndex.value)
    : null;
  const { xs } = layoutTargets(
    stageWidth.value,
    stageW.value,
    isCarousel.value,
    center,
    TEAM_MEMBERS.length,
  );
  for (let i = 0; i < TEAM_MEMBERS.length; i++)
    s.tx[i] = (xs[i] ?? 0) + (isCarousel.value ? ptr.value.swipe : 0);
}

function updateLayout(fresh: boolean) {
  const s = sim.value;
  const carousel = isCarousel.value;
  const center = carousel ? (active.value ?? carouselIndex.value) : null;
  const { xs, total } = layoutTargets(
    stageWidth.value,
    stageW.value,
    carousel,
    center,
    TEAM_MEMBERS.length,
  );
  cyclic.value = total > 0;
  for (let i = 0; i < TEAM_MEMBERS.length; i++) {
    const tx = (xs[i] ?? 0) + (carousel ? ptr.value.swipe : 0);
    if (!fresh && total > 0) {
      const shift = Math.round((tx - (s.tx[i] ?? tx)) / total) * total;
      if (shift) s.x[i] = (s.x[i] ?? 0) + shift;
    }
    s.tx[i] = tx;
    s.tr[i] =
      flipped.value === i
        ? 180
        : active.value === i
          ? 0
          : (REST_Y[i % REST_Y.length] ?? 0);
    s.tz[i] =
      flipped.value === i || active.value === i
        ? 0
        : (REST_Z[i % REST_Z.length] ?? 0);
    s.tl[i] = flipped.value === i || active.value === i ? 1 : 0;
    s.tp[i] = flipped.value === i ? 1 : 0;
    if (fresh) {
      s.x[i] = tx;
      s.vx[i] = 0;
      s.px[i] = 0;
      s.sw[i] = 0;
      s.vsw[i] = 0;
      s.beta[i] = 0;
      s.st[i] = 0;
      s.vst[i] = 0;
      s.ry[i] = s.tr[i] ?? 0;
      s.vry[i] = 0;
      s.rz[i] = s.tz[i] ?? 0;
      s.vrz[i] = 0;
      s.lift[i] = s.tl[i] ?? 0;
      s.vlift[i] = 0;
      s.pop[i] = s.tp[i] ?? 0;
      s.vpop[i] = 0;
    }
  }
  for (const key of [
    "x",
    "vx",
    "px",
    "tx",
    "sw",
    "vsw",
    "beta",
    "ry",
    "vry",
    "tr",
    "rz",
    "vrz",
    "tz",
    "lift",
    "vlift",
    "tl",
    "pop",
    "vpop",
    "tp",
    "st",
    "vst",
  ] as const)
    (s[key] as number[]).length = TEAM_MEMBERS.length;
  if (fresh) for (let i = 0; i < TEAM_MEMBERS.length; i++) paint(i);
  kick();
}

// Active / Flip Setters
function setActive(index: number | null) {
  if (active.value === index) return;
  if (index !== null) carouselIndex.value = index;
  innerActive.value = index;
}

function setFlipped(index: number | null) {
  if (flipped.value === index) return;
  innerFlipped.value = index;
}

function toggleFlip(index: number) {
  const next = flipped.value === index ? null : index;
  if (next !== null) setActive(index);
  setFlipped(next);
}

// Feasible Range
function feasible(d: number) {
  const s = sim.value;
  const W = stageW.value;
  let [lo, hi] = stops(s, W, stageWidth.value, TEAM_MEMBERS.length);
  for (let k = 0; k < d; k++) lo += mg(s, W, k, k + 1);
  for (let k = TEAM_MEMBERS.length - 1; k > d; k--) hi -= mg(s, W, k - 1, k);
  return [lo, Math.max(lo, hi)] as const;
}

function nearest(clientX: number, clientY: number) {
  const stage = stageRef.value;
  if (!stage) return null;
  const box = stage.getBoundingClientRect();
  const x = clientX - box.left;
  const y = clientY - box.top;
  const g = geo.value;
  const s = sim.value;
  if (y < g.railY - 12) return null;
  let best: number | null = null;
  let dist = Infinity;
  for (let i = 0; i < TEAM_MEMBERS.length; i++) {
    if (y > (g.cardTops[i] ?? 0) + g.H + Math.max(0, s.st[i] ?? 0) + 8)
      continue;
    const d = Math.abs(x - (s.x[i] ?? 0));
    if (d < g.W / 2 + 6 && d < dist) {
      best = i;
      dist = d;
    }
  }
  return best;
}

// Pointer Events
function onPointerMove(event: PointerEvent) {
  const p = ptr.value;
  const s = sim.value;
  const stage = stageRef.value;
  const now = performance.now();
  if (p.id === event.pointerId && stage) {
    const dx = event.clientX - p.x;
    const dy = event.clientY - p.y;
    if (!p.mode && Math.hypot(dx, dy) > 8) {
      if (Math.abs(dy) > Math.abs(dx))
        p.mode = dy > 0 && p.index >= 0 ? "pull" : "none";
      else
        p.mode = isCarousel.value
          ? "swipe"
          : p.index >= 0 && !reduced.value
            ? "drag"
            : "none";
      if (p.mode !== "none" && stage.isConnected)
        stage.setPointerCapture(event.pointerId);
      if (p.mode === "pull") s.pull = p.index;
      if (p.mode === "drag") {
        s.drag = p.index;
        s.grab =
          event.clientX -
          stage.getBoundingClientRect().left -
          (s.x[p.index] ?? 0);
      }
    }
    const elapsed = Math.max(1, now - p.lastT);
    p.v = p.v * 0.6 + ((event.clientX - p.lastX) / elapsed) * 0.4;
    p.lastX = event.clientX;
    p.lastY = event.clientY;
    p.lastT = now;
    if (p.mode === "pull") {
      const i = p.index;
      s.st[i] = soft(Math.max(0, dy), geo.value.maxStretch);
      s.vst[i] = 0;
      const angle = clamp(
        (-Math.atan2(dx, (geo.value.pendulum[i] ?? 200) + (s.st[i] ?? 0)) *
          180) /
          Math.PI,
        -16,
        16,
      );
      s.vsw[i] = ((angle - (s.sw[i] ?? 0)) / elapsed) * 1000 * 0.5;
      s.sw[i] = angle;
      if (reduced.value) paint(i);
      else kick();
    } else if (p.mode === "drag" && s.drag >= 0) {
      const [lo, hi] = feasible(s.drag);
      s.x[s.drag] = clamp(
        event.clientX - stage.getBoundingClientRect().left - s.grab,
        lo,
        hi,
      );
      s.vx[s.drag] = p.v * 1000;
      s.free = now + 900;
      kick();
    } else if (p.mode === "swipe") {
      p.swipe = dx;
      syncTargets();
      if (reduced.value) snapAll();
      else kick();
    }
    return;
  }
  if (event.pointerType !== "mouse" || p.id >= 0) return;
  const hit = nearest(event.clientX, event.clientY);
  const hoverV = (event.clientX - p.hoverX) / Math.max(1, now - p.hoverT);
  p.hoverX = event.clientX;
  p.hoverT = now;
  if (isCarousel.value) {
    const center = active.value ?? carouselIndex.value;
    if (hit !== null && hit === center && active.value !== hit) setActive(hit);
    return;
  }
  if (hit !== null && hit !== p.hoverHit)
    impulse(hit, clamp(-hoverV * 22, -24, 24));
  p.hoverHit = hit ?? -1;
  if (hit !== null && hit !== active.value) setActive(hit);
}

function onPointerDown(event: PointerEvent) {
  if (event.button !== 0) return;
  const hit = nearest(event.clientX, event.clientY);
  ptr.value = {
    ...ptr.value,
    id: event.pointerId,
    index: hit ?? -1,
    x: event.clientX,
    y: event.clientY,
    mode: "",
    kind: event.pointerType,
    lastX: event.clientX,
    lastY: event.clientY,
    lastT: performance.now(),
    v: 0,
    swipe: 0,
  };
}

function finishPointer(event: PointerEvent, cancelled: boolean) {
  const p = ptr.value;

  if (p.id !== event.pointerId) return;
  const s = sim.value;
  const stage = stageRef.value;

  if (stage?.hasPointerCapture(event.pointerId))
    stage.releasePointerCapture(event.pointerId);

  ptr.value = { ...p, id: -1 };

  if (p.mode === "pull") {
    const i = s.pull;
    s.pull = -1;

    if (reduced.value) {
      s.st[i] = 0;
      s.vst[i] = 0;
      s.sw[i] = 0;
      s.vsw[i] = 0;
      s.beta[i] = 0;
      paint(i);
    } else kick();

    return;
  }

  if (p.mode === "drag") {
    s.drag = -1;
    s.free = performance.now() + 700;
    kick();
    return;
  }

  if (p.mode === "swipe") {
    const dx = event.clientX - p.x;
    const current = active.value ?? carouselIndex.value;
    const by =
      Math.abs(dx) > 40 || Math.abs(p.v) > 0.45 ? (dx < 0 ? 1 : -1) : 0;
    ptr.value.swipe = 0;
    const next = cyclic.value
      ? (((current + by) % TEAM_MEMBERS.length) + TEAM_MEMBERS.length) %
        TEAM_MEMBERS.length
      : clamp(current + by, 0, TEAM_MEMBERS.length - 1);
    if (next === active.value) {
      syncTargets();
      if (reduced.value) snapAll();
      else kick();
    } else setActive(next);
    return;
  }
  if (cancelled || p.mode || p.index < 0) return;
  if ((p.kind !== "mouse" || isCarousel.value) && active.value !== p.index)
    setActive(p.index);
  else pendingFlip.value = p.index;
}

function onPointerLeave(event: PointerEvent) {
  ptr.value.hoverHit = -1;
  if (event.pointerType === "mouse" && ptr.value.id < 0 && !isCarousel.value)
    setActive(null);
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    if (flipped.value !== null) {
      event.preventDefault();
      setFlipped(null);
    }
    return;
  }

  const badge = (event.target instanceof HTMLElement ? event.target : null)
    ?.dataset.badge;

  if (event.key === "ArrowDown") {
    if (badge === undefined) return;
    event.preventDefault();
    tug(Number(badge), 300);
    return;
  }

  if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;

  event.preventDefault();
  const from = active.value ?? focusIndex.value;
  const next =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? TEAM_MEMBERS.length - 1
        : clamp(
            from + (event.key === "ArrowRight" ? 1 : -1),
            0,
            TEAM_MEMBERS.length - 1,
          );
  focusIndex.value = next;
  setActive(next);
  buttonEls.value[next]?.focus({ preventScroll: true });
}

// Watchers
watch([active, flipped], ([na, nf], [oa, of_]) => {
  const s = sim.value;

  for (let i = 0; i < TEAM_MEMBERS.length; i++) {
    s.tr[i] = nf === i ? 180 : na === i ? 0 : (REST_Y[i % REST_Y.length] ?? 0);
    s.tz[i] = nf === i || na === i ? 0 : (REST_Z[i % REST_Z.length] ?? 0);
    s.tl[i] = nf === i || na === i ? 1 : 0;
    s.tp[i] = nf === i ? 1 : 0;
  }

  if (isCarousel.value) {
    syncTargets();
  }

  const wrap = (i: number) =>
    cyclic.value
      ? ((i % TEAM_MEMBERS.length) + TEAM_MEMBERS.length) % TEAM_MEMBERS.length
      : i;

  if (oa !== na) {
    if (na !== null) {
      impulse(wrap(na - 1), 16);
      impulse(wrap(na + 1), -16);
    }
    if (oa !== null) {
      impulse(wrap(oa - 1), -6);
      impulse(wrap(oa + 1), 6);
    }
  }

  if (of_ !== nf) {
    if (nf !== null) {
      impulse(nf, nf % 2 ? 9 : -9);
      tug(nf, 70);
    }
    if (of_ !== null) tug(of_, 40);
  }
  kick();
});

watch(pendingFlip, (val) => {
  if (val >= 0) {
    toggleFlip(val);
    pendingFlip.value = -1;
  }
});

// Lifecycle
let resizeObs: ResizeObserver | null = null;

function measureStage(width: number) {
  const railW = Math.min(
    MAX_W,
    (width - 40) / (Math.max(1, TEAM_MEMBERS.length) * RAIL_PITCH_MIN + 0.4),
  );

  const carousel = railW < MIN_RAIL_W;

  const W =
    Math.round((carousel ? clamp(width * 0.3, 96, 118) : railW) * 4) / 4;

  const fresh =
    stageWidth.value === 0 ||
    isCarousel.value !== carousel ||
    stageW.value !== W;

  stageWidth.value = width;
  isCarousel.value = carousel;
  stageW.value = W;

  updateLayout(fresh);
}

onMounted(async () => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");

  reduced.value = media.matches;

  media.addEventListener("change", () => {
    reduced.value = media.matches;
  });

  await nextTick();

  const stage = stageRef.value;

  if (stage) {
    measureStage(stage.clientWidth);

    resizeObs = new ResizeObserver((entries) => {
      const b = entries[0];
      if (b) measureStage(b.contentRect.width);
    });

    resizeObs.observe(stage);
  }

  if (!swayed.value && !reduced.value) {
    for (let i = 0; i < TEAM_MEMBERS.length; i++)
      window.setTimeout(
        () => impulse(i, (i % 2 ? -1 : 1) * (30 - (i % 4) * 3)),
        60 + i * 70,
      );
    window.setTimeout(
      () => {
        swayed.value = true;
      },
      80 + TEAM_MEMBERS.length * 70,
    );
  }
});

onBeforeUnmount(() => {
  cancelAnimationFrame(sim.value.raf);
  sim.value.raf = 0;
  resizeObs?.disconnect();
});
</script>

<template>
  <section
    class="relative z-[1] w-screen bg-gradient-to-t from-background-light via-background-light to-background overflow-hidden"
  >
    <div
      class="relative container-wide flex flex-col items-start text-left pt-28 pb-12 lg:pt-32 lg:pb-20 bg-transparent"
    >
      <video
        class="absolute left-0 top-0 w-full h-full object-cover [mask-image:radial-gradient(ellipse_at_top_right,black_0%,black_20%,transparent_50%)] [-webkit-mask-image:radial-gradient(ellipse_at_top_right,black_0%,black_20%,transparent_50%)]"
        autoplay
        loop
        muted
        playsinline
        preload="auto"
      >
        <source
          src="/features/home/about-us/about-us-section-bg.webm"
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>

      <motion.p
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0 }"
        :viewport="{ once: true }"
        class="text-[10px] uppercase tracking-[0.28em] text-primary mb-4 font-medium"
      >
        About Us
      </motion.p>

      <motion.h2
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0.2 }"
        :viewport="{ once: true }"
        class="text-3xl md:text-4xl lg:text-5xl max-w-2xl font-medium leading-[1.2] tracking-tight mb-4"
      >
        Your Partner in Digital Transformation
      </motion.h2>

      <motion.p
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0.4 }"
        :viewport="{ once: true }"
        class="w-full max-w-xl text-base text-muted-foreground max-sm:text-sm max-sm:leading-relaxed mb-8 sm:mb-12"
      >
        PT Simple Journey is an IT consulting company and a provider of
        Infrastructure Solutions, Digital Solutions, Cross-Industry Solutions,
        and IT Operation Services.
      </motion.p>

      <motion.div
        :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: 0.2 }"
        :viewport="{ once: true }"
        class="w-full"
      >
        <div
          ref="stageRef"
          role="group"
          aria-label="Meet the Team"
          aria-roledescription="lanyard rail"
          class="relative w-full touch-pan-y select-none"
          :style="{ height: `${geo.height}px`, overflowX: 'clip' }"
          @pointermove="onPointerMove"
          @pointerdown="onPointerDown"
          @pointerup="(e) => finishPointer(e as PointerEvent, false)"
          @pointercancel="(e) => finishPointer(e as PointerEvent, true)"
          @pointerleave="onPointerLeave"
          @keydown="onKeyDown"
        >
          <!-- Rail bar -->
          <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-x-0 z-0"
            :style="{
              top: `${geo.railY - geo.railR}px`,
              height: `${geo.railR * 2}px`,
            }"
          >
            <div
              class="absolute inset-x-0 h-3 rounded-full bg-foreground/10 blur-[5px]"
              :style="{ top: `${geo.railR * 2 + 2}px` }"
            />
            <div
              class="absolute inset-0 rounded-full"
              style="
                background: linear-gradient(
                  to bottom,
                  color-mix(in oklab, var(--color-muted-foreground) 35%, white)
                    0%,
                  white 20%,
                  color-mix(in oklab, var(--color-muted-foreground) 70%, white)
                    40%,
                  var(--color-muted-foreground) 64%,
                  color-mix(in oklab, var(--color-muted-foreground) 55%, black)
                    100%
                );
                box-shadow: 0 1px 0
                  color-mix(in oklab, var(--color-foreground) 18%, transparent);
              "
            />
            <div
              class="absolute inset-0 rounded-full opacity-40 mix-blend-overlay"
              style="
                background: repeating-linear-gradient(
                  90deg,
                  transparent 0 2px,
                  color-mix(in oklab, white 40%, transparent) 2px 3px,
                  transparent 3px 7px
                );
              "
            />
            <template v-if="!isCarousel">
              <div
                v-for="side in [0, 1]"
                :key="side"
                class="absolute top-1/2 h-7 w-4 -translate-y-1/2 rounded-[3px]"
                :style="{
                  [side ? 'right' : 'left']: '6px',
                  background:
                    'linear-gradient(to right, color-mix(in oklab, var(--color-muted-foreground) 60%, white), var(--color-muted-foreground) 55%, color-mix(in oklab, var(--color-muted-foreground) 60%, black))',
                  boxShadow:
                    '0 3px 6px color-mix(in oklab, var(--color-foreground) 18%, transparent)',
                }"
              >
                <span
                  class="absolute left-1/2 top-1 size-1 -translate-x-1/2 rounded-full bg-foreground/35"
                />
                <span
                  class="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-foreground/35"
                />
              </div>
            </template>
          </div>

          <!-- Badge slots -->
          <div
            v-for="(item, i) in TEAM_MEMBERS"
            :key="item.id"
            :ref="
              (el) => {
                slotEls[i] = el as HTMLDivElement | null;
              }
            "
            :class="[
              'pointer-events-none absolute left-0 top-0',
              getTone(item, i),
            ]"
            :style="{
              width: `${geo.W}px`,
              height: `${geo.height}px`,
              zIndex: flipped === i ? 40 : active === i ? 30 : 10 + i,
              transform: `translate3d(${((sim.x[i] ?? 0) - geo.W / 2).toFixed(2)}px,0,0)`,
            }"
          >
            <!-- Ring -->
            <span
              aria-hidden="true"
              class="absolute block rounded-full"
              :style="{
                left: `${geo.W / 2 - 4.5 * geo.u}px`,
                top: `${geo.railY - geo.ring}px`,
                width: `${9 * geo.u}px`,
                height: `${geo.ring * 2}px`,
                border: `${Math.max(1.6, 2.2 * geo.u).toFixed(2)}px solid color-mix(in oklab, var(--color-muted-foreground) 45%, white)`,
                boxShadow:
                  'inset 1px 0 0 color-mix(in oklab, black 25%, transparent), 1px 1px 2px color-mix(in oklab, black 20%, transparent)',
              }"
            />

            <!-- Swing pivot -->
            <span
              :ref="
                (el) => {
                  swingEls[i] = el as HTMLSpanElement | null;
                }
              "
              class="absolute inset-0 block"
              :style="{ transformOrigin: `${geo.W / 2}px ${geo.pivotY}px` }"
            >
              <!-- Strap group -->
              <span
                :ref="
                  (el) => {
                    strapEls[i] = el as HTMLSpanElement | null;
                  }
                "
                class="absolute inset-0 block"
                style="--stretch: 0px"
              >
                <!-- Strap shadow -->
                <span
                  class="absolute block bg-black/15 blur-[2px] dark:bg-black/45"
                  :style="{
                    left: `${geo.W / 2 - geo.strapW / 2 + 3 * geo.u}px`,
                    top: `${geo.pivotY + 3}px`,
                    width: `${geo.strapW}px`,
                    height: `${geo.straps[i] ?? 0}px`,
                  }"
                />
                <!-- Strap fabric -->
                <span
                  class="absolute block"
                  :style="{
                    left: `${geo.W / 2 - geo.strapW / 2}px`,
                    top: `${geo.pivotY - 2}px`,
                    width: `${geo.strapW}px`,
                    height: `${(geo.straps[i] ?? 0) + 2}px`,
                    background: `repeating-linear-gradient(135deg, color-mix(in oklab, white 16%, transparent) 0 1px, transparent 1px 3px), repeating-linear-gradient(45deg, color-mix(in oklab, black 13%, transparent) 0 1px, transparent 1px 3px), color-mix(in oklab, currentColor 82%, transparent)`,
                  }"
                />
                <!-- Crimp -->
                <span
                  class="absolute block rounded-sm"
                  :style="{
                    left: `${geo.W / 2 - geo.strapW / 2 - 1}px`,
                    top: `${geo.pivotY - 2}px`,
                    width: `${geo.strapW + 2}px`,
                    height: `${geo.crimp}px`,
                    background: METAL,
                    boxShadow: `0 ${geo.u}px ${2 * geo.u}px color-mix(in oklab, black 30%, transparent)`,
                  }"
                />
                <!-- Reel body -->
                <span
                  :ref="
                    (el) => {
                      cordEls[i] = el as HTMLSpanElement | null;
                    }
                  "
                  class="absolute block overflow-hidden rounded-[3px]"
                  :style="{
                    left: `${geo.W / 2 - geo.reel / 2}px`,
                    top: `${geo.reelTops[i] ?? 0}px`,
                    width: `${geo.reel}px`,
                    height: `${geo.cordRest}px`,
                    transformOrigin: 'top center',
                    background: `linear-gradient(180deg, color-mix(in oklab, var(--color-muted-foreground) 30%, var(--color-background)), color-mix(in oklab, var(--color-muted-foreground) 72%, var(--color-background)))`,
                  }"
                >
                  <span
                    class="absolute inset-0 opacity-50"
                    style="
                      background: repeating-linear-gradient(
                        0deg,
                        transparent 0 3px,
                        color-mix(
                            in oklab,
                            var(--color-foreground) 12%,
                            transparent
                          )
                          3px 4px
                      );
                    "
                  />
                </span>
                <!-- Cord -->
                <span
                  class="absolute block"
                  :style="{
                    left: `${geo.W / 2 - 1.5 * geo.u}px`,
                    top: `${(geo.reelTops[i] ?? 0) + geo.reel * 0.82}px`,
                    width: `${3 * geo.u}px`,
                    height: `${geo.cordRest}px`,
                    background: `color-mix(in oklab, var(--color-muted-foreground) 55%, transparent)`,
                  }"
                />
                <!-- Clip -->
                <span
                  class="absolute block rounded-[2px]"
                  :style="{
                    left: `${geo.W / 2 - geo.clipW / 2}px`,
                    top: `${geo.clipTops[i] ?? 0}px`,
                    width: `${geo.clipW}px`,
                    height: `${geo.clipH}px`,
                    background: METAL,
                    boxShadow: `0 ${geo.u}px ${2 * geo.u}px color-mix(in oklab, black 25%, transparent)`,
                  }"
                >
                  <span
                    class="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-[1px] bg-background/40"
                    :style="{
                      width: `${geo.clipW * 0.55}px`,
                      height: `${geo.clipH * 0.45}px`,
                    }"
                  />
                </span>
              </span>

              <!-- Hang pivot -->
              <span
                :ref="
                  (el) => {
                    hangEls[i] = el as HTMLSpanElement | null;
                  }
                "
                class="absolute left-0 top-0 block"
                :style="{
                  width: `${geo.W}px`,
                  transformOrigin: `${geo.W / 2}px ${geo.clipTops[i] ?? 0}px`,
                }"
              >
                <!-- Shadow -->
                <span
                  :ref="
                    (el) => {
                      shadowEls[i] = el as HTMLSpanElement | null;
                    }
                  "
                  aria-hidden="true"
                  class="pointer-events-none absolute block rounded-[0.85em] opacity-70"
                  :style="{
                    top: `${geo.cardTops[i] ?? 0}px`,
                    width: `${geo.W}px`,
                    height: `${geo.H}px`,
                    fontSize: `${geo.W / EM}px`,
                    background:
                      'radial-gradient(closest-side, color-mix(in oklab, black 65%, transparent), transparent)',
                    filter: 'blur(8px)',
                  }"
                />

                <!-- Flip container -->
                <span
                  :ref="
                    (el) => {
                      flipEls[i] = el as HTMLSpanElement | null;
                    }
                  "
                  class="absolute block"
                  :style="{
                    top: `${geo.cardTops[i] ?? 0}px`,
                    width: `${geo.W}px`,
                    height: `${geo.H}px`,
                    fontSize: `${geo.W / EM}px`,
                    transformStyle: 'preserve-3d',
                  }"
                >
                  <!-- FRONT FACE -->
                  <span
                    data-face="front"
                    class="absolute inset-0 flex flex-col items-center overflow-hidden rounded-[0.85em] border bg-surface-glass px-[0.8em] pb-[0.7em] text-card-foreground"
                    style="
                      backface-visibility: hidden;
                      transform: translateZ(1px);
                    "
                  >
                    <!-- Band -->
                    <span
                      aria-hidden="true"
                      :class="[
                        'absolute inset-x-0 top-0 block h-[4.3em]',
                        getTone(item, i),
                      ]"
                      style="
                        background:
                          repeating-linear-gradient(
                            135deg,
                            transparent 0 0.45em,
                            color-mix(in oklab, white 10%, transparent) 0.45em
                              0.56em
                          ),
                          linear-gradient(
                            180deg,
                            color-mix(in oklab, currentColor 80%, white),
                            currentColor 72%,
                            color-mix(in oklab, currentColor 86%, black)
                          );
                      "
                    >
                      <span
                        class="absolute inset-x-0 bottom-0 h-px bg-black/15"
                      />
                    </span>

                    <!-- Hole -->
                    <span
                      aria-hidden="true"
                      class="absolute left-1/2 top-[0.72em] block h-[0.56em] w-[2.7em] -translate-x-1/2 rounded-full bg-background"
                      style="
                        box-shadow:
                          inset 0 0.09em 0.2em
                            color-mix(in oklab, black 55%, transparent),
                          0 0.05em 0 color-mix(in oklab, white 30%, transparent);
                      "
                    />

                    <!-- Photo -->
                    <span
                      class="relative mt-[2.05em] block size-[5.3em] shrink-0 rounded-full bg-surface-glass p-[0.2em]"
                      style="
                        box-shadow: 0 0.15em 0.5em
                          color-mix(
                            in oklab,
                            var(--color-foreground) 22%,
                            transparent
                          );
                      "
                    >
                      <span
                        class="relative block size-full overflow-hidden rounded-full bg-muted"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 40 40"
                          class="size-full text-muted-foreground/60"
                        >
                          <circle cx="20" cy="15" r="7" fill="currentColor" />
                          <path
                            d="M6 38c1.5-8 7-12 14-12s12.5 4 14 12z"
                            fill="currentColor"
                          />
                        </svg>
                        <img
                          :src="item.image"
                          :alt="item.name"
                          draggable="false"
                          decoding="async"
                          class="pointer-events-none absolute inset-0 block size-full select-none object-cover"
                        />
                      </span>
                    </span>

                    <span
                      class="mt-[0.55em] block w-full truncate text-center text-[1.08em] font-semibold leading-tight tracking-tight"
                      >{{ item.name }}</span
                    >

                    <span
                      class="mt-[0.15em] block w-full truncate text-center text-[0.8em] leading-snug text-muted-foreground"
                      >{{ item.role }}</span
                    >

                    <span
                      v-if="item.team"
                      class="mt-[0.5em] block w-full truncate text-center text-[0.6em] font-medium uppercase tracking-[0.2em] text-muted-foreground"
                      >{{ item.team }}</span
                    >

                    <span
                      class="mt-auto block w-full border-t border-dashed border-border pt-[0.5em]"
                    >
                      <svg
                        aria-hidden="true"
                        :viewBox="`0 0 ${badgeData[i]!.bc.width} 20`"
                        preserveAspectRatio="none"
                        class="block h-[1.6em] w-full text-foreground/80"
                      >
                        <path :d="badgeData[i]!.bc.d" fill="currentColor" />
                      </svg>
                      <span
                        class="mt-[0.25em] block text-center font-mono text-[0.52em] tracking-[0.32em] text-muted-foreground"
                        >{{ badgeData[i]!.digits }}</span
                      >
                    </span>

                    <!-- Glare -->
                    <span
                      aria-hidden="true"
                      class="pointer-events-none absolute inset-y-0 -left-1/2 block w-[200%] opacity-70 dark:opacity-35"
                      style="
                        background: linear-gradient(
                          100deg,
                          transparent 40%,
                          color-mix(in oklab, white 26%, transparent) 48%,
                          color-mix(in oklab, white 8%, transparent) 52%,
                          transparent 58%
                        );
                        transform: translateX(var(--gx, 0%));
                      "
                    />

                    <span
                      aria-hidden="true"
                      class="pointer-events-none absolute inset-0 block bg-black"
                      style="opacity: var(--shade, 0)"
                    />
                  </span>

                  <!-- BACK FACE -->
                  <span
                    data-face="back"
                    class="absolute inset-0 overflow-hidden rounded-[0.85em] border bg-surface-glass text-card-foreground"
                    style="
                      backface-visibility: hidden;
                      transform: rotateY(180deg) translateZ(1px);
                    "
                  >
                    <span
                      aria-hidden="true"
                      :class="[
                        'absolute inset-x-0 top-0 block h-[2.15em]',
                        getTone(item, i),
                      ]"
                      style="
                        background:
                          repeating-linear-gradient(
                            135deg,
                            transparent 0 0.45em,
                            color-mix(in oklab, white 10%, transparent) 0.45em
                              0.56em
                          ),
                          linear-gradient(
                            180deg,
                            color-mix(in oklab, currentColor 80%, white),
                            currentColor 72%,
                            color-mix(in oklab, currentColor 86%, black)
                          );
                      "
                    >
                      <span
                        class="absolute inset-x-0 bottom-0 h-px bg-black/15"
                      />
                    </span>

                    <span
                      aria-hidden="true"
                      class="absolute left-1/2 top-[0.72em] block h-[0.56em] w-[2.7em] -translate-x-1/2 rounded-full bg-background"
                      style="
                        box-shadow:
                          inset 0 0.09em 0.2em
                            color-mix(in oklab, black 55%, transparent),
                          0 0.05em 0 color-mix(in oklab, white 30%, transparent);
                      "
                    />

                    <span class="absolute inset-x-[0.85em] top-[2.6em] block">
                      <span
                        class="block truncate text-[0.95em] font-semibold leading-tight"
                        >{{ item.name }}</span
                      >
                      <span
                        class="block truncate text-[0.72em] leading-snug text-muted-foreground"
                        >{{ item.role }}</span
                      >
                    </span>

                    <span
                      v-if="item.bio"
                      class="absolute inset-x-[0.85em] top-[5.1em] block"
                    >
                      <span
                        class="line-clamp-4 block text-[0.74em] leading-[1.4]"
                        >{{ item.bio }}</span
                      >
                    </span>

                    <span
                      v-if="item.tags && item.tags.length"
                      class="absolute inset-x-[0.85em] top-[9.8em] flex flex-wrap gap-[0.28em]"
                    >
                      <span
                        v-for="tag in (item.tags ?? []).slice(0, 3)"
                        :key="tag"
                        class="block rounded-full border border-border bg-muted/60 px-[0.6em] py-[0.16em] text-[0.6em] leading-tight text-muted-foreground"
                        >{{ tag }}</span
                      >
                    </span>

                    <svg
                      aria-hidden="true"
                      viewBox="-1 -1 23 23"
                      class="absolute bottom-[0.8em] right-[0.8em] size-[3.9em] text-foreground"
                    >
                      <path :d="badgeData[i]!.qr" fill="currentColor" />
                    </svg>

                    <span
                      aria-hidden="true"
                      class="pointer-events-none absolute inset-y-0 -left-1/2 block w-[200%] opacity-70 dark:opacity-35"
                      style="
                        background: linear-gradient(
                          100deg,
                          transparent 40%,
                          color-mix(in oklab, white 26%, transparent) 48%,
                          color-mix(in oklab, white 8%, transparent) 52%,
                          transparent 58%
                        );
                        transform: translateX(var(--gx, 0%));
                      "
                    />

                    <span
                      aria-hidden="true"
                      class="pointer-events-none absolute inset-0 block bg-black"
                      style="opacity: var(--shade, 0)"
                    />
                    <!-- Links layer -->
                    <div
                      :ref="
                        (el) => {
                          linkLayers[i] = el as HTMLDivElement | null;
                        }
                      "
                      class="absolute inset-0"
                      style="opacity: 0; visibility: hidden"
                    />
                  </span>

                  <!-- Side edges -->
                  <span
                    v-for="side in [0, 1]"
                    :key="`edge-${side}`"
                    aria-hidden="true"
                    class="absolute inset-y-[0.85em] block w-[2px]"
                    :style="{
                      [side ? 'right' : 'left']: '0',
                      transform: `translateX(${side ? 1 : -1}px) rotateY(90deg)`,
                      background:
                        'color-mix(in oklab, var(--color-foreground) 30%, var(--color-card))',
                    }"
                  />
                </span>

                <!-- Interaction button -->
                <button
                  :ref="
                    (el) => {
                      buttonEls[i] = el as HTMLButtonElement | null;
                    }
                  "
                  :data-badge="i"
                  class="pointer-events-auto absolute inset-x-0 cursor-pointer rounded-[0.85em] bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  :style="{
                    top: `${geo.cardTops[i] ?? 0}px`,
                    height: `${geo.H}px`,
                    fontSize: `${geo.W / EM}px`,
                  }"
                  :aria-label="`${item.name}, ${item.role}. ${flipped === i ? 'Press Enter to turn back' : 'Press Enter to flip badge'}`"
                  :aria-pressed="flipped === i"
                  @click="toggleFlip(i)"
                />
              </span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
</template>
