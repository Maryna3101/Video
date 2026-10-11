import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Faint warm light behind the typography so the black never looks flat.
export const Glow: React.FC<{ y?: string }> = ({ y = "45%" }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(60% 38% at 50% ${y}, rgba(214,190,142,0.13), rgba(0,0,0,0) 70%)`,
        opacity: interpolate(frame, [0, 40], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    />
  );
};
