import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { MaskUp } from "./MaskUp";
import { beatPulse, clamp, easeOut, GOLD, lb, sans, serif } from "./style";

type RowProps = {
  readonly at: number;
  readonly region: string;
  readonly when: string;
};

const Row: React.FC<RowProps> = ({ at, region, when }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ width: 860 }}>
      <div style={{ display: "flex", alignItems: "baseline", height: 86 }}>
        <MaskUp
          at={at}
          style={{
            width: 270,
            fontFamily: sans,
            fontWeight: 600,
            fontSize: 28,
            letterSpacing: "0.2em",
            color: GOLD,
          }}
        >
          {region}
        </MaskUp>
        <MaskUp
          at={at + 3}
          style={{
            fontFamily: sans,
            fontWeight: 300,
            fontSize: 44,
            color: "white",
          }}
        >
          {when}
        </MaskUp>
      </div>
      <div
        style={{
          height: 1,
          backgroundColor: "rgba(214,190,142,0.45)",
          width: `${interpolate(frame, [at, at + 18], [0, 100], { ...clamp, easing: easeOut })}%`,
        }}
      />
    </div>
  );
};

// Schedule per region and the call to action, pulsing on the beat.
export const FinalScene: React.FC<{ globalStart: number }> = ({
  globalStart,
}) => {
  const frame = useCurrentFrame();
  const btnIn = lb(4);
  const pulse = frame > btnIn + 12 ? beatPulse(frame + globalStart, 5) : 0;
  const ring = frame > btnIn + 12 ? ((frame - btnIn - 12) % lb(2)) / lb(2) : -1;

  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 400 }}>
      <Img
        src={staticFile("hironic-logo.png")}
        style={{
          width: 220,
          mixBlendMode: "screen",
          opacity: interpolate(frame, [0, 10], [0, 1], clamp),
        }}
      />
      <MaskUp
        at={0}
        style={{
          marginTop: 56,
          fontFamily: serif,
          fontWeight: 500,
          fontSize: 132,
          lineHeight: 1,
          color: "white",
        }}
      >
        Save your{" "}
        <span style={{ fontStyle: "italic", fontWeight: 400, color: GOLD }}>
          seat
        </span>
      </MaskUp>
      <div style={{ marginTop: 54 }}>
        <Row at={lb(1)} region="EMEA" when="10/14 · 10:00 Paris" />
        <Row at={lb(1.5)} region="APAC" when="10/15 · 14:00 Seoul" />
        <Row at={lb(2)} region="AMERICAS" when="10/15 · 11:00 New York" />
      </div>
      <div style={{ position: "relative", marginTop: 76 }}>
        {ring >= 0 ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 999,
              border: `4px solid ${GOLD}`,
              scale: `${1 + ring * 0.12} ${1 + ring * 0.5}`,
              opacity: (1 - ring) * 0.8,
            }}
          />
        ) : null}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 999,
            backgroundColor: GOLD,
            color: "black",
            padding: "30px 74px",
            fontFamily: sans,
            fontWeight: 800,
            fontSize: 48,
            letterSpacing: "0.02em",
            scale:
              interpolate(frame, [btnIn, btnIn + 12], [0.6, 1], {
                ...clamp,
                easing: easeOut,
              }) *
              (1 + pulse * 0.035),
            opacity: interpolate(frame, [btnIn, btnIn + 6], [0, 1], clamp),
          }}
        >
          REGISTER NOW →
          <div
            style={{
              position: "absolute",
              top: -60,
              width: 120,
              height: 260,
              rotate: "20deg",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.7), rgba(255,255,255,0))",
              left: interpolate(
                (frame - btnIn - 14) % 40,
                [0, 18],
                [-200, 760],
                clamp,
              ),
              opacity: frame > btnIn + 14 ? 1 : 0,
            }}
          />
        </div>
      </div>
      <MaskUp
        at={lb(5)}
        style={{
          marginTop: 44,
          fontFamily: sans,
          fontWeight: 600,
          fontSize: 44,
          color: "white",
        }}
      >
        linktr.ee/hironic
      </MaskUp>
      <MaskUp
        at={lb(5.5)}
        style={{
          marginTop: 16,
          fontFamily: sans,
          fontWeight: 300,
          fontSize: 27,
          color: "rgba(255,255,255,0.7)",
        }}
      >
        +82 10 6648 7010 · marketing@hironic.com
      </MaskUp>
    </AbsoluteFill>
  );
};
