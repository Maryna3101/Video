import type React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { EASE_OUT, GOLD, sans, serif } from "./theme";

const CARD_W = 250;
const CARD_H = 310;
const ease = Easing.bezier(...EASE_OUT);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

type CardProps = {
  readonly at: number;
  readonly photo: string;
  readonly name: string;
};

// One portrait: soft rise, de-blur and a settling zoom inside the frame.
const Card: React.FC<CardProps> = ({ at, photo, name }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: CARD_W,
        opacity: interpolate(frame, [at, at + 22], [0, 1], clamp),
        translate: `0 ${interpolate(frame, [at, at + 28], [46, 0], { ...clamp, easing: ease })}px`,
        filter: `blur(${interpolate(frame, [at, at + 22], [8, 0], { ...clamp, easing: ease })}px)`,
      }}
    >
      <div
        style={{
          width: CARD_W,
          height: CARD_H,
          borderRadius: 10,
          overflow: "hidden",
          boxShadow:
            "0 0 0 1px rgba(214,190,142,0.5), 0 24px 60px rgba(0,0,0,0.6)",
        }}
      >
        <Img
          src={staticFile(photo)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 22%",
            scale: interpolate(frame, [at, at + 60], [1.12, 1], {
              ...clamp,
              easing: ease,
            }),
          }}
        />
      </div>
      <div
        style={{
          marginTop: 16,
          fontFamily: sans,
          fontWeight: 400,
          fontSize: 25,
          color: "rgba(255,255,255,0.92)",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </div>
    </div>
  );
};

const Session: React.FC<{ at: number; number: string; title: string }> = ({
  at,
  number,
  title,
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        textAlign: "center",
        opacity: interpolate(frame, [at, at + 20], [0, 1], clamp),
        translate: `0 ${interpolate(frame, [at, at + 24], [24, 0], { ...clamp, easing: ease })}px`,
      }}
    >
      <div
        style={{
          fontFamily: sans,
          fontWeight: 400,
          fontSize: 24,
          letterSpacing: "0.42em",
          color: GOLD,
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontFamily: serif,
          fontStyle: "italic",
          fontSize: 66,
          lineHeight: 1.15,
          color: "white",
        }}
      >
        {title}
      </div>
    </div>
  );
};

// All five speakers at the same size, grouped by session and revealed
// with a gentle stagger.
export const SpeakerGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        alignItems: "center",
        paddingTop: 300,
        scale: interpolate(frame, [0, durationInFrames], [1, 1.03], clamp),
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(60% 40% at 50% 45%, rgba(214,190,142,0.10), rgba(0,0,0,0) 70%)",
        }}
      />
      <Session at={6} number="SESSION I" title="Miglou" />
      <div style={{ display: "flex", gap: 32, marginTop: 26 }}>
        <Card at={16} photo="own/jisoo-kook.jpg" name="Dr. Jisoo Kook" />
        <Card at={24} photo="own/dongwoo-shin.jpg" name="Dr. Dongwoo Shin" />
      </div>
      <div style={{ marginTop: 60 }}>
        <Session at={62} number="SESSION II" title="Synerjet Pro" />
      </div>
      <div style={{ display: "flex", gap: 32, marginTop: 26 }}>
        <Card at={72} photo="own/wonkyu-hong.jpg" name="Dr. Wonkyu Hong" />
        <Card at={80} photo="own/hyunseok-nam.jpg" name="Dr. Hyunseok Nam" />
        <Card at={88} photo="own/chris-kim.jpg" name="Dr. Chris Gunwoo Kim" />
      </div>
    </AbsoluteFill>
  );
};
