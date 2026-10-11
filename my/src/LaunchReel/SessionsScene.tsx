import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { MaskUp } from "./MaskUp";
import { clamp, easeOut, GOLD, lb, sans, serif } from "./style";

const SWAP = lb(2);
const big: React.CSSProperties = {
  fontFamily: sans,
  fontWeight: 800,
  fontSize: 150,
  lineHeight: 0.98,
  letterSpacing: "-0.03em",
  color: "white",
};
const label: React.CSSProperties = {
  fontFamily: sans,
  fontWeight: 400,
  fontSize: 26,
  letterSpacing: "0.34em",
  color: GOLD,
};

// The two products being launched, swapping on the beat over the device.
export const SessionsScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Img
        src={staticFile("own/device.png")}
        style={{
          position: "absolute",
          left: 470,
          top: 700,
          width: 610,
          maskImage:
            "radial-gradient(75% 55% at 62% 45%, black 50%, transparent 100%)",
          translate: `0 ${interpolate(frame, [0, 18, 70], [260, 40, 0], {
            ...clamp,
            easing: easeOut,
          })}px`,
          opacity: interpolate(frame, [0, 12], [0, 1], clamp),
        }}
      />
      <AbsoluteFill style={{ paddingLeft: 72, paddingTop: 470 }}>
        <div style={{ position: "relative", height: 40 }}>
          <MaskUp
            at={0}
            out={SWAP - 4}
            style={{ ...label, position: "absolute" }}
          >
            SESSION 01
          </MaskUp>
          <MaskUp at={SWAP + 2} style={{ ...label, position: "absolute" }}>
            SESSION 02
          </MaskUp>
        </div>
        <div style={{ position: "relative", height: 300, marginTop: 20 }}>
          <MaskUp
            at={2}
            out={SWAP - 6}
            style={{ ...big, position: "absolute" }}
          >
            MIGLOU
          </MaskUp>
          <div style={{ position: "absolute" }}>
            <MaskUp at={SWAP} style={big}>
              SYNERJET
            </MaskUp>
            <MaskUp at={SWAP + 4} style={{ ...big, color: GOLD }}>
              PRO
            </MaskUp>
          </div>
        </div>
        <MaskUp
          at={8}
          style={{
            fontFamily: serif,
            fontStyle: "italic",
            fontSize: 54,
            color: "rgba(255,255,255,0.8)",
            marginTop: 10,
          }}
        >
          Two launches. One stage.
        </MaskUp>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
