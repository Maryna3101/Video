import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useVideoConfig,
} from "remotion";
import { IntroCard } from "./IntroCard";
import { OutroCard } from "./OutroCard";
import { SpeakerGrid } from "./SpeakerGrid";

// 110 + 211 + 165 - 2 * 18 = 450 frames, matching the 15 s music bed.
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
          name="Speakers"
          durationInFrames={211}
          premountFor={fps}
        >
          <SpeakerGrid />
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
