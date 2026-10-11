// Timing measured from the source video (30 fps).
// Flip-card landings for 04, 03, 02 and the big "01" hit.
export const FLIP_LANDINGS = [24, 36, 48] as const;
export const ONE_HIT = 61;
// The music runs at 120 BPM: a beat every 15 frames, first one at frame 2.
export const BEAT_PERIOD = 15;
export const BEAT_OFFSET = 2;
// The source re-lays out the cards between these frames, and the
// REGISTER NOW button has fully appeared by BUTTON_IN.
export const LAYOUT_START = 126;
export const LAYOUT_END = 162;
export const BUTTON_IN = 215;

// 1 on an impact, decaying exponentially afterwards.
export const decay = (frame: number, hit: number, length: number) =>
  frame < hit ? 0 : Math.exp(-(frame - hit) / length);

export const beatPulse = (frame: number, length = 4) => {
  if (frame < BEAT_OFFSET) return 0;
  const last =
    Math.floor((frame - BEAT_OFFSET) / BEAT_PERIOD) * BEAT_PERIOD + BEAT_OFFSET;
  return decay(frame, last, length);
};

export const flipPulse = (frame: number) =>
  Math.max(...FLIP_LANDINGS.map((hit) => decay(frame, hit, 5)));
