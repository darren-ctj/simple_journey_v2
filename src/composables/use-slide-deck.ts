import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

const VIEWPORT_ENTRY_THRESHOLD = 5;
const VIEWPORT_LEAVE_RATIO = 0.3;
const SCROLL_LOCK_DURATION = 800;
const RESET_DELAY = 500;
const NEXT_KEYS = ["PageDown", "ArrowDown", " ", "Enter"];
const PREVIOUS_KEYS = ["PageUp", "ArrowUp"];

export function useSlideDeck(
  sectionRef: Ref<HTMLElement | null>,
  slideCount: number,
) {
  const currentIndex = ref(0);
  const lastIndex = slideCount - 1;

  let isInViewport = false;
  let isScrolling = false;
  let scrollLockTimeout: ReturnType<typeof setTimeout> | undefined;
  let resetTimeout: ReturnType<typeof setTimeout> | undefined;

  function updateViewportState() {
    const element = sectionRef.value;

    if (!element) {
      isInViewport = false;
      return;
    }

    const bounds = element.getBoundingClientRect();
    isInViewport =
      bounds.top <= VIEWPORT_ENTRY_THRESHOLD &&
      bounds.bottom > window.innerHeight * VIEWPORT_LEAVE_RATIO;

    if (isInViewport) {
      if (resetTimeout) {
        clearTimeout(resetTimeout);
        resetTimeout = undefined;
      }
      return;
    }

    if (currentIndex.value !== 0 && !resetTimeout) {
      resetTimeout = setTimeout(() => {
        if (!isInViewport) {
          currentIndex.value = 0;
        }
        resetTimeout = undefined;
      }, RESET_DELAY);
    }
  }

  function lockScroll() {
    isScrolling = true;
    if (scrollLockTimeout) {
      clearTimeout(scrollLockTimeout);
    }
    scrollLockTimeout = setTimeout(() => {
      isScrolling = false;
    }, SCROLL_LOCK_DURATION);
  }

  function goToSlide(nextIndex: number) {
    currentIndex.value = nextIndex;
    lockScroll();
  }

  function handleWheel(event: WheelEvent) {
    if (!isInViewport || isScrolling) return;

    if (event.deltaY > 0 && currentIndex.value < lastIndex) {
      event.preventDefault();
      goToSlide(currentIndex.value + 1);
    } else if (event.deltaY < 0 && currentIndex.value > 0) {
      event.preventDefault();
      goToSlide(currentIndex.value - 1);
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!isInViewport || isScrolling) return;

    if (NEXT_KEYS.includes(event.key) && currentIndex.value < lastIndex) {
      event.preventDefault();
      goToSlide(currentIndex.value + 1);
    } else if (PREVIOUS_KEYS.includes(event.key) && currentIndex.value > 0) {
      event.preventDefault();
      goToSlide(currentIndex.value - 1);
    }
  }

  onMounted(() => {
    window.addEventListener("scroll", updateViewportState, { passive: true });
    window.addEventListener("keydown", handleKeydown);
    updateViewportState();
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", updateViewportState);
    window.removeEventListener("keydown", handleKeydown);
    if (scrollLockTimeout) clearTimeout(scrollLockTimeout);
    if (resetTimeout) clearTimeout(resetTimeout);
  });

  return { currentIndex, handleWheel };
}
