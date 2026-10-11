import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  useCurrentFrame,
} from "remotion";

const SPARKS = 28;

// Shockwave ring, flash and sparks when the countdown lands on "01".
// Frame 0 of this component is the moment of impact.
export const OneHitBurst: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const frame = useCurrentFrame();
  const clamp = {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  } as const;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          backgroundColor: "rgb(255,240,210)",
          mixBlendMode: "screen",
          opacity: interpolate(frame, [0, 1, 5], [0, 0.16, 0], clamp),
        }}
      />
      {[0, 6].map((delay) => (
        <div
          key={delay}
          style={{
            position: "absolute",
            left: x,
            top: y,
            // Grow the size, not the scale, so the ring stays a thin line.
            width: interpolate(frame - delay, [0, 26], [0, 1400], {
              ...clamp,
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            aspectRatio: "1",
            borderRadius: "50%",
            border: "5px solid rgba(232,206,150,1)",
            boxShadow: "0 0 30px rgba(232,206,150,0.6)",
            translate: "-50% -50%",
            opacity: interpolate(frame - delay, [0, 3, 26], [0, 0.9, 0], clamp),
            mixBlendMode: "screen",
          }}
        />
      ))}
      {new Array(SPARKS).fill(true).map((_, i) => {
        const angle = (i / SPARKS) * Math.PI * 2 + random(`a${i}`) * 0.3;
        const dist = interpolate(
          frame,
          [0, 30],
          [0, 380 + random(`d${i}`) * 420],
          {
            ...clamp,
            easing: Easing.bezier(0.1, 0.9, 0.3, 1),
          },
        );
        const len = 18 + random(`l${i}`) * 30;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + Math.cos(angle) * dist,
              top: y + Math.sin(angle) * dist + frame * frame * 0.08,
              width: len,
              height: 4,
              borderRadius: 2,
              background:
                "linear-gradient(90deg, rgba(255,240,200,0), rgba(255,236,190,1))",
              rotate: `${angle}rad`,
              opacity: interpolate(frame, [0, 3, 30], [0, 1, 0], clamp),
              mixBlendMode: "screen",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
