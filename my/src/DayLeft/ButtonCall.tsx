import { interpolate, useCurrentFrame } from "remotion";
import { BEAT_OFFSET, BEAT_PERIOD, BUTTON_IN } from "./beat";

const BUTTON = { left: 190, top: 1250, width: 700, height: 110 };

// Gold rings that expand from the REGISTER NOW button every two beats.
export const ButtonCall: React.FC = () => {
  const frame = useCurrentFrame();
  const period = BEAT_PERIOD * 2;
  const first =
    Math.ceil((BUTTON_IN - BEAT_OFFSET) / period) * period + BEAT_OFFSET;
  if (frame < first) return null;
  const local = (frame - first) % period;

  return (
    <div
      style={{
        position: "absolute",
        ...BUTTON,
        borderRadius: BUTTON.height / 2,
        border: "4px solid rgba(232,206,150,1)",
        scale: `${interpolate(local, [0, period], [1, 1.12])} ${interpolate(local, [0, period], [1, 1.6])}`,
        opacity: interpolate(local, [0, 3, period], [0, 0.85, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        boxShadow: "0 0 24px rgba(232,206,150,0.6)",
        pointerEvents: "none",
      }}
    />
  );
};
