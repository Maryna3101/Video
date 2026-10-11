import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useVideoConfig,
} from "remotion";
import { ClipScene } from "./ClipScene";
import { IntroCard } from "./IntroCard";
import { OutroCard } from "./OutroCard";

// 110 + 76 + 92 + 79 + 165 - 4 * 18 = 450 frames, matching the 15 s music bed.
export const HironicReel: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <TransitionSeries name="Reel timeline">
        <TransitionSeries.Sequence
          name="Intro"
          durationInFrames={110}
          premountFor={fps}
        >
          <IntroCard />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 18 })}
        />
        <TransitionSeries.Sequence
          name="Miglou speakers"
          durationInFrames={76}
          premountFor={fps}
        >
          <ClipScene
            trimBefore={4.5 * fps}
            playbackRate={0.75}
            chapter="SESSION I"
            title="Miglou"
            scaleFrom={1}
            scaleTo={1.03}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: 18 })}
        />
        <TransitionSeries.Sequence
          name="Synerjet Pro speakers"
          durationInFrames={92}
          premountFor={fps}
        >
          <ClipScene
            trimBefore={7.5 * fps}
            playbackRate={0.75}
            chapter="SESSION II"
            title="Synerjet Pro"
            scaleFrom={1}
            scaleTo={1.03}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 18 })}
        />
        <TransitionSeries.Sequence
          name="Full line-up"
          durationInFrames={79}
          premountFor={fps}
        >
          <ClipScene
            trimBefore={388}
            playbackRate={0.75}
            scaleFrom={1}
            scaleTo={1.03}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 18 })}
        />
        <TransitionSeries.Sequence
          name="Register"
          durationInFrames={165}
          premountFor={fps}
        >
          <OutroCard />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Audio
        name="Music"
        src={staticFile("hironic-source.mp4")}
        premountFor={fps}
        volume={(f) =>
          interpolate(
            f,
            [0, 8, durationInFrames - fps, durationInFrames],
            [0, 0.7, 0.7, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          )
        }
      />
    </AbsoluteFill>
  );
};
