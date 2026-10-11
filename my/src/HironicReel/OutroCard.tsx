import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Glow } from "./Glow";
import { Hairline } from "./Hairline";
import { Reveal } from "./Reveal";
import { GOLD, INK, sans, serif } from "./theme";

export const OutroCard: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <Glow y="42%" />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
          color: "white",
          textAlign: "center",
        }}
      >
        <Reveal delay={6} rise={0}>
          <Img src={staticFile("hironic-logo.png")} style={{ width: 260 }} />
        </Reveal>
        <Reveal delay={14} style={{ marginTop: 110 }}>
          <div
            style={{
              fontFamily: serif,
              fontWeight: 500,
              fontSize: 200,
              lineHeight: 0.95,
            }}
          >
            Register
          </div>
        </Reveal>
        <Reveal delay={22}>
          <div
            style={{
              fontFamily: serif,
              fontStyle: "italic",
              fontSize: 180,
              lineHeight: 1,
              color: GOLD,
            }}
          >
            now
          </div>
        </Reveal>
        <div style={{ marginTop: 64 }}>
          <Hairline delay={32} width={220} />
        </div>
        <div
          style={{
            marginTop: 72,
            opacity: interpolate(frame, [40, 60], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [40, 70], [0.9, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 200 }),
              output: "perceptual-scale",
            }),
            backgroundColor: "white",
            color: "black",
            borderRadius: 999,
            padding: "26px 64px",
            fontFamily: sans,
            fontWeight: 600,
            fontSize: 52,
            letterSpacing: "0.01em",
          }}
        >
          linktr.ee/hironic
        </div>
        <Reveal delay={62} style={{ marginTop: 96 }}>
          <div
            style={{
              fontFamily: sans,
              fontWeight: 400,
              fontSize: 24,
              letterSpacing: "0.42em",
              color: GOLD,
              textTransform: "uppercase",
            }}
          >
            For more information
          </div>
        </Reveal>
        <Reveal delay={70} style={{ marginTop: 28 }}>
          <div
            style={{
              fontFamily: sans,
              fontWeight: 300,
              fontSize: 38,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            +82 10 6648 7010
            <br />
            marketing@hironic.com
          </div>
        </Reveal>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
