/**
 * Dark chess-themed color palette for the mobile app.
 */
export const colors = {
  /** Primary dark background */
  background: "#0f0f1a",
  /** Slightly lighter surface for cards and inputs */
  surface: "#1a1a2e",
  /** Elevated surface for modals, headers */
  surfaceElevated: "#222240",
  /** Primary accent — warm gold (chess piece vibe) */
  accent: "#d4a843",
  /** Secondary accent — muted teal */
  accentSecondary: "#3a9e8f",
  /** Primary text on dark backgrounds */
  textPrimary: "#eaeaea",
  /** Secondary/dimmed text */
  textSecondary: "#8e8ea0",
  /** Placeholder text */
  textPlaceholder: "#5a5a6e",
  /** Success green */
  success: "#4caf50",
  /** Error / destructive red */
  error: "#e74c3c",
  /** Warning amber */
  warning: "#f39c12",
  /** Border / divider color */
  border: "#2e2e48",
  /** White for icons and high-contrast elements */
  white: "#ffffff",
  /** Transparent overlay */
  overlay: "rgba(0, 0, 0, 0.6)",
} as const;

export type ColorKey = keyof typeof colors;
