import { loadFont } from "@remotion/fonts";
import { Easing, staticFile } from "remotion";
import { GOLD, sans, serif } from "../HironicReel/theme";

export { GOLD, sans, serif };

loadFont({
  family: sans,
  url: staticFile("fonts/inter-latin-800-normal.woff2"),
  weight: "800",
});

export const GOLD_LIGHT = "#F0DDB0";
export const BG = "#050505";

// The music runs at ~144 BPM: one beat every 12.51 frames, first at 6.5.
export const BEAT = 12.51;
export const FIRST_BEAT = 6.5;
// Frame of the n-th beat counted from the start of a scene that itself
// starts on a beat.
export const lb = (n: number) => Math.round(n * BEAT);

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
export const easeIn = Easing.bezier(0.7, 0, 0.84, 0);

export const beatPulse = (frame: number, length = 4) => {
  if (frame < FIRST_BEAT) return 0;
  const n = Math.floor((frame - FIRST_BEAT) / BEAT);
  return Math.exp(-(frame - (FIRST_BEAT + n * BEAT)) / length);
};
