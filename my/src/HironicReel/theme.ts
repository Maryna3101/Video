import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Fonts are bundled in public/fonts so renders never depend on the network.
export const serif = "Cormorant Garamond";
export const sans = "Inter";

loadFont({
  family: serif,
  url: staticFile("fonts/cormorant-garamond-latin-500-normal.woff2"),
  weight: "500",
});
loadFont({
  family: serif,
  url: staticFile("fonts/cormorant-garamond-latin-400-italic.woff2"),
  weight: "400",
  style: "italic",
});
loadFont({
  family: sans,
  url: staticFile("fonts/inter-latin-300-normal.woff2"),
  weight: "300",
});
loadFont({
  family: sans,
  url: staticFile("fonts/inter-latin-400-normal.woff2"),
  weight: "400",
});
loadFont({
  family: sans,
  url: staticFile("fonts/inter-latin-600-normal.woff2"),
  weight: "600",
});

export const GOLD = "#D6BE8E";
export const INK = "#000000";
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
