import { Cormorant, Source_Sans_3 } from "next/font/google";

/**
 * Editorial display + body pair via next/font.
 * Weight arrays omitted so Google variable fonts are used (smaller payload).
 */
export const fontDisplay = Cormorant({
  variable: "--font-display-family",
  subsets: ["latin"],
  display: "swap",
});

export const fontBody = Source_Sans_3({
  variable: "--font-body-family",
  subsets: ["latin"],
  display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontBody.variable}`;
