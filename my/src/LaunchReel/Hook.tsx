import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { MaskUp } from "./MaskUp";
import { clamp, easeIn, easeOut, GOLD, GOLD_LIGHT, lb, sans } from "./style";

const CX = 540;
const CY = 900;
const R = 380;
const TICKS = 30;
const LAND = lb(4);

// Days race down from 30 to 01 while the dial's ticks go dark, then the
// scene zooms through the "0" into the next one.
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();

  const days = Math.round(
    interpolate(frame, [4, LAND], [30, 1], {
      ...clamp,
      easing: (t) => 1 - Math.pow(1 - t, 2.2),
    }),
  );
  const landed = frame >= LAND;
  const punch = landed ? 1 + 0.14 * Math.exp(-(frame - LAND) / 5) : 1;
  const flash = landed ? Math.exp(-(frame - LAND) / 8) : 0;
  const circumference = 2 * Math.PI * R;

  return (
    <AbsoluteFill
      style={{
        scale: interpolate(frame, [lb(6.4), lb(7.5)], [1, 7], {
          ...clamp,
          easing: easeIn,
        }),
        opacity: interpolate(frame, [lb(7), lb(7.5)], [1, 0], clamp),
        transformOrigin: `${CX}px ${CY}px`,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${CX}px ${CY}px, rgba(214,190,142,${0.1 + flash * 0.35}) 0%, rgba(0,0,0,0) 45%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 250,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 34,
          opacity: interpolate(frame, [2, 16], [0, 1], clamp),
        }}
      >
        <Img
          src={staticFile("hironic-logo.png")}
          style={{ width: 230, mixBlendMode: "screen" }}
        />
        <div
          style={{
            fontFamily: sans,
            fontWeight: 400,
            fontSize: 25,
            letterSpacing: "0.3em",
            color: GOLD,
          }}
        >
          GLOBAL LAUNCHING SYMPOSIUM 2026
        </div>
      </div>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke={GOLD}
          strokeWidth={3}
          strokeDasharray={circumference}
          strokeDashoffset={interpolate(frame, [0, 34], [circumference, 0], {
            ...clamp,
            easing: easeOut,
          })}
          transform={`rotate(-90 ${CX} ${CY})`}
          opacity={0.7 + flash * 0.3}
        />
        {new Array(TICKS).fill(true).map((_, i) => {
          const a = (i / TICKS) * Math.PI * 2 - Math.PI / 2;
          const lit = i < days;
          return (
            <line
              key={i}
              x1={CX + Math.cos(a) * (R - 34)}
              y1={CY + Math.sin(a) * (R - 34)}
              x2={CX + Math.cos(a) * (R - 14)}
              y2={CY + Math.sin(a) * (R - 14)}
              stroke={lit ? GOLD_LIGHT : "rgba(214,190,142,0.18)"}
              strokeWidth={lit ? 6 : 4}
              strokeLinecap="round"
              opacity={interpolate(
                frame,
                [i * 0.6, i * 0.6 + 6],
                [0, 1],
                clamp,
              )}
            />
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          top: CY - 230,
          textAlign: "center",
          fontFamily: sans,
          fontWeight: 800,
          fontSize: 420,
          lineHeight: "460px",
          letterSpacing: "-0.04em",
          fontVariantNumeric: "tabular-nums",
          color: landed ? GOLD_LIGHT : "white",
          scale: punch,
          textShadow: `0 0 ${60 * flash}px rgba(240,221,176,${flash})`,
        }}
      >
        {String(days).padStart(2, "0")}
      </div>
      <div
        style={{
          position: "absolute",
          top: CY + R + 70,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 34,
          fontFamily: sans,
          fontWeight: 800,
          fontSize: 120,
          letterSpacing: "-0.02em",
          color: "white",
        }}
      >
        <MaskUp at={lb(4.6)}>DAY</MaskUp>
        <MaskUp at={lb(5.1)}>LEFT</MaskUp>
      </div>
    </AbsoluteFill>
  );
};
