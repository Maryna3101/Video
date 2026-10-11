import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  beatPulse,
  BUTTON_IN,
  decay,
  flipPulse,
  LAYOUT_END,
  LAYOUT_START,
  ONE_HIT,
} from "./beat";
import { ButtonCall } from "./ButtonCall";
import { GoldDust } from "./GoldDust";
import { OneHitBurst } from "./OneHitBurst";
import { Shine } from "./Shine";

// Centre of the flip cards before and after the source re-lays them out.
const CARDS_BIG = { x: 540, y: 808 };
const CARDS_SMALL = { x: 379, y: 485 };

// Adds energy on top of the original "1 day left" countdown: beat-synced
// camera punches, a shake + burst on "01", glow, gold dust and shines.
export const DayLeftReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const clamp = {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  } as const;

  const hit = decay(frame, ONE_HIT, 7);
  const shake = decay(frame, ONE_HIT, 5) * 18;
  const punch =
    1 +
    flipPulse(frame) * 0.035 +
    hit * 0.08 +
    (frame > ONE_HIT + 10 ? beatPulse(frame, 4) * 0.014 : 0);

  const glowX = interpolate(
    frame,
    [LAYOUT_START, LAYOUT_END],
    [CARDS_BIG.x, CARDS_SMALL.x],
    {
      ...clamp,
      easing: Easing.bezier(0.65, 0, 0.35, 1),
    },
  );
  const glowY = interpolate(
    frame,
    [LAYOUT_START, LAYOUT_END],
    [CARDS_BIG.y, CARDS_SMALL.y],
    {
      ...clamp,
      easing: Easing.bezier(0.65, 0, 0.35, 1),
    },
  );
  const glowSize = interpolate(
    frame,
    [LAYOUT_START, LAYOUT_END],
    [900, 560],
    clamp,
  );
  const glowStrength =
    0.18 + flipPulse(frame) * 0.35 + hit * 0.6 + beatPulse(frame, 5) * 0.16;

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <AbsoluteFill
        style={{
          // Slow push-in for constant motion, plus beat punches and shake.
          scale: interpolate(frame, [0, 360], [1, 1.05], clamp) * punch,
          translate: `${(random(`sx${frame}`) - 0.5) * shake}px ${(random(`sy${frame}`) - 0.5) * shake}px`,
        }}
      >
        <Video
          name="Source"
          src={staticFile("hironic-1-day-left.mp4")}
          premountFor={fps}
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            left: glowX,
            top: glowY,
            width: glowSize,
            height: glowSize,
            translate: "-50% -50%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,206,150,1) 0%, rgba(214,190,142,0.35) 35%, rgba(214,190,142,0) 70%)",
            mixBlendMode: "screen",
            opacity: glowStrength,
            pointerEvents: "none",
          }}
        />
        <Shine
          left={156}
          top={548}
          width={768}
          height={520}
          radius={24}
          sweeps={[ONE_HIT + 18, ONE_HIT + 48]}
          duration={20}
        />
        <Shine
          left={186}
          top={356}
          width={386}
          height={258}
          radius={16}
          sweeps={[LAYOUT_END + 20, BUTTON_IN + 60]}
          duration={18}
        />
        <Shine
          left={190}
          top={1250}
          width={700}
          height={110}
          radius={55}
          sweeps={[BUTTON_IN + 8, BUTTON_IN + 53, BUTTON_IN + 98]}
        />
        <ButtonCall />
      </AbsoluteFill>
      <GoldDust />
      <Sequence
        name="01 burst"
        from={ONE_HIT}
        durationInFrames={40}
        premountFor={fps}
      >
        <OneHitBurst x={CARDS_BIG.x} y={CARDS_BIG.y} />
      </Sequence>
      <AbsoluteFill
        style={{
          // Gentle vignette so the edges stay calm while the centre moves.
          background:
            "radial-gradient(120% 80% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
