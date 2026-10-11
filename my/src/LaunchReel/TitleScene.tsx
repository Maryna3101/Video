import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { MaskUp } from "./MaskUp";
import { clamp, easeOut, GOLD, lb, sans, serif } from "./style";

const OUT = lb(7.1);
const line: React.CSSProperties = {
  fontFamily: sans,
  fontWeight: 800,
  fontSize: 132,
  lineHeight: 0.98,
  letterSpacing: "-0.03em",
  color: "white",
};

// Stacked kinetic title, one line per beat.
export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ paddingLeft: 72, paddingTop: 400 }}>
      <MaskUp at={0} out={OUT} style={line}>
        HIRONIC
      </MaskUp>
      <MaskUp at={lb(1)} out={OUT + 2} style={line}>
        GLOBAL
      </MaskUp>
      <MaskUp at={lb(2)} out={OUT + 4} style={line}>
        <span style={{ color: "transparent", WebkitTextStroke: `3px ${GOLD}` }}>
          LAUNCHING
        </span>
      </MaskUp>
      <MaskUp at={lb(3)} out={OUT + 6} style={line}>
        SYMPOSIUM
      </MaskUp>
      <div
        style={{
          alignSelf: "flex-end",
          marginRight: 140,
          marginTop: -10,
          fontFamily: serif,
          fontStyle: "italic",
          fontSize: 300,
          lineHeight: 1,
          color: GOLD,
          translate: `${interpolate(frame, [lb(4), lb(4) + 16], [380, 0], {
            ...clamp,
            easing: easeOut,
          })}px 0`,
          opacity:
            interpolate(frame, [lb(4), lb(4) + 8], [0, 1], clamp) *
            interpolate(frame, [OUT + 6, OUT + 14], [1, 0], clamp),
        }}
      >
        2026
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 26,
          marginTop: 20,
          opacity: interpolate(frame, [OUT + 4, OUT + 12], [1, 0], clamp),
        }}
      >
        <div
          style={{
            fontFamily: sans,
            fontWeight: 800,
            fontSize: 34,
            letterSpacing: "0.12em",
            color: "black",
            backgroundColor: "white",
            padding: "10px 22px",
            borderRadius: 8,
            scale: interpolate(frame, [lb(5), lb(5) + 10], [0, 1], {
              ...clamp,
              easing: easeOut,
            }),
          }}
        >
          ONLINE
        </div>
        <MaskUp
          at={lb(5.5)}
          style={{
            fontFamily: serif,
            fontStyle: "italic",
            fontSize: 46,
            lineHeight: 1.1,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Hear the real clinical experience
        </MaskUp>
      </div>
    </AbsoluteFill>
  );
};
