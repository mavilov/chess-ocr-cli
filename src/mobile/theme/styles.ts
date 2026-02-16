import { StyleSheet } from "react-native";
import { colors } from "./colors";

/**
 * Shared reusable styles used across all screens.
 */
export const sharedStyles = StyleSheet.create({
  /** Full-screen container with dark background */
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  /** Padded content wrapper */
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  /** Centered content */
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  /** Large screen title */
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  /** Subtitle / description text */
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
    lineHeight: 22,
  },
  /** Primary action button */
  buttonPrimary: {
    backgroundColor: colors.accent,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 14,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  /** Primary button text */
  buttonPrimaryText: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.background,
  },
  /** Secondary / outline button */
  buttonSecondary: {
    borderWidth: 1.5,
    borderColor: colors.accent,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 14,
  },
  /** Secondary button text */
  buttonSecondaryText: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.accent,
  },
  /** Card-like surface */
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  /** Text input field */
  textInput: {
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  /** Small label above inputs */
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  /** Horizontal row with spacing */
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  /** Divider line */
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 20,
  },
});
