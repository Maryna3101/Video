import { Easing, interpolate, useCurrentFrame } from "remotion";
import { EASE_OUT, GOLD } from "./theme";

export const Hairline: React.FC<{ delay: number; width?: number }> = ({
  delay,
  width = 260,
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        height: 2,
        backgroundColor: GOLD,
        width: interpolate(frame, [delay, delay + 36], [0, width], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(...EASE_OUT),
        }),
      }}
    />
  );
};
