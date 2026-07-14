import { Cormorant, Source_Sans_3 } from "next/font/google";

export const fontDisplay = Cormorant({
  variable: "--font-display-family",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const fontBody = Source_Sans_3({
  variable: "--font-body-family",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const fontVariables = `${fontDisplay.variable} ${fontBody.variable}`;
