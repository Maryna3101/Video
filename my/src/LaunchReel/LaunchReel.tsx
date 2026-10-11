import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  Series,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FinalScene } from "./FinalScene";
import { Hook } from "./Hook";
import { SessionsScene } from "./SessionsScene";
import { SpeakersScene } from "./SpeakersScene";
import { beatPulse, BG } from "./style";
import { TitleScene } from "./TitleScene";

// Scene lengths land every cut on a beat of the 144 BPM track:
// 94 + 100 + 62 + 88 + 106 = 450 frames (15 s).
export const LaunchReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(70% 45% at 50% 42%, rgba(214,190,142,0.10), rgba(0,0,0,0) 70%)",
          opacity: 0.6 + beatPulse(frame, 6) * 0.4,
        }}
      />
      <Series>
        <Series.Sequence name="Hook" durationInFrames={94} premountFor={fps}>
          <Hook />
        </Series.Sequence>
        <Series.Sequence name="Title" durationInFrames={100} premountFor={fps}>
          <TitleScene />
        </Series.Sequence>
        <Series.Sequence
          name="Sessions"
          durationInFrames={62}
          premountFor={fps}
        >
          <SessionsScene />
        </Series.Sequence>
        <Series.Sequence
          name="Speakers"
          durationInFrames={88}
          premountFor={fps}
        >
          <SpeakersScene />
        </Series.Sequence>
        <Series.Sequence
          name="Register"
          durationInFrames={106}
          premountFor={fps}
        >
          <FinalScene globalStart={344} />
        </Series.Sequence>
      </Series>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(120% 80% at 50% 45%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      <Audio
        name="Music"
        src={staticFile("hironic-source.mp4")}
        premountFor={fps}
        volume={(f) =>
          interpolate(
            f,
            [0, 4, durationInFrames - 18, durationInFrames],
            [0, 0.85, 0.85, 0],
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
