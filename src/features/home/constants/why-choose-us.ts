export const MOBILE_CARD_OFFSETS: Record<string, number> = {
  "01": 0,
  "02": -110,
  "03": -140,
  "04": -250,
};

export const HEADING_ANIMATION = {
  initial: { opacity: 0, y: 30 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};
