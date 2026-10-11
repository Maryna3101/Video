import {
  AbsoluteFill,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const PARTICLES = 46;

// Slow-rising, twinkling gold specks that keep the black areas alive.
export const GoldDust: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none" }}>
      {new Array(PARTICLES).fill(true).map((_, i) => {
        const x = random(`x${i}`) * width;
        const speed = 0.6 + random(`s${i}`) * 1.6;
        const size = 3 + random(`r${i}`) * 7;
        const y =
          height +
          40 -
          ((random(`y${i}`) * height + frame * speed) % (height + 80));
        const twinkle =
          0.35 +
          0.65 * Math.abs(Math.sin(frame / (10 + random(`t${i}`) * 18) + i));
        const sway = Math.sin(frame / 40 + i) * 14;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + sway,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,236,190,1) 0%, rgba(214,190,142,0.6) 40%, rgba(214,190,142,0) 70%)",
              opacity:
                twinkle *
                interpolate(frame, [0, 20], [0, 0.9], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
