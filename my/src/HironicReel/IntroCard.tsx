import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Glow } from "./Glow";
import { Hairline } from "./Hairline";
import { Reveal } from "./Reveal";
import { GOLD, INK, sans, serif } from "./theme";

export const IntroCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <Glow />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
          color: "white",
          textAlign: "center",
          // Clear the type before the cross-fade so it dips through black
          // instead of overlapping the next scene's headline.
          opacity: interpolate(
            frame,
            [durationInFrames - 26, durationInFrames - 14],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
        }}
      >
        <Reveal delay={4} rise={0}>
          <Img src={staticFile("hironic-logo.png")} style={{ width: 300 }} />
        </Reveal>
        <Reveal delay={18} style={{ marginTop: 120 }}>
          <div
            style={{
              fontFamily: sans,
              fontWeight: 300,
              fontSize: 30,
              letterSpacing: "0.42em",
              color: GOLD,
              textTransform: "uppercase",
            }}
          >
            Global Launching
          </div>
        </Reveal>
        <Reveal delay={26}>
          <div
            style={{
              fontFamily: serif,
              fontWeight: 500,
              fontSize: 196,
              lineHeight: 1,
              marginTop: 28,
              letterSpacing: "0.01em",
            }}
          >
            Symposium
          </div>
        </Reveal>
        <Reveal delay={36}>
          <div
            style={{
              fontFamily: serif,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 168,
              lineHeight: 1,
              color: GOLD,
            }}
          >
            2026
          </div>
        </Reveal>
        <div style={{ marginTop: 70 }}>
          <Hairline delay={46} />
        </div>
        <Reveal delay={56} style={{ marginTop: 64 }}>
          <div
            style={{
              fontFamily: sans,
              fontWeight: 400,
              fontSize: 32,
              letterSpacing: "0.36em",
              textTransform: "uppercase",
            }}
          >
            Meet the Speakers
          </div>
        </Reveal>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
