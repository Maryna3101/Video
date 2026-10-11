import { Easing, interpolate, useCurrentFrame } from "remotion";

type ShineProps = {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
  readonly radius: number;
  // Frames at which a highlight starts sweeping across.
  readonly sweeps: readonly number[];
  readonly duration?: number;
};

// A diagonal highlight that sweeps across a rounded rectangle.
export const Shine: React.FC<ShineProps> = ({
  left,
  top,
  width,
  height,
  radius,
  sweeps,
  duration = 22,
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        borderRadius: radius,
        overflow: "hidden",
        mixBlendMode: "screen",
        pointerEvents: "none",
      }}
    >
      {sweeps.map((start) => (
        <div
          key={start}
          style={{
            position: "absolute",
            top: -height,
            width: Math.max(140, width * 0.22),
            height: height * 3,
            rotate: "20deg",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,250,235,0.75) 50%, rgba(255,255,255,0) 100%)",
            left: interpolate(
              frame,
              [start, start + duration],
              [-width * 0.4, width * 1.2],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.45, 0, 0.25, 1),
              },
            ),
            opacity: frame >= start && frame <= start + duration ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
};
