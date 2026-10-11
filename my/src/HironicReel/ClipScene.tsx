import type React from "react";
import { Video } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Reveal } from "./Reveal";
import { GOLD, sans, serif } from "./theme";

type ClipSceneProps = {
  readonly trimBefore: number;
  readonly playbackRate: number;
  readonly chapter?: string;
  readonly title?: string;
  // The footage is inset so its baked-in text clears the Reels UI
  // (top bar, right-hand buttons, bottom caption area).
  readonly scaleFrom: number;
  readonly scaleTo: number;
};

// A slowed-down section of the source reel with a gentle push-in and an
// optional chapter caption in the dark lower third.
export const ClipScene: React.FC<ClipSceneProps> = ({
  trimBefore,
  playbackRate,
  chapter,
  title,
  scaleFrom,
  scaleTo,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <AbsoluteFill
        style={{
          scale: interpolate(
            frame,
            [0, durationInFrames],
            [scaleFrom, scaleTo],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.33, 0, 0.67, 1),
              output: "perceptual-scale",
            },
          ),
        }}
      >
        <Video
          src={staticFile("hironic-source.mp4")}
          trimBefore={trimBefore}
          playbackRate={playbackRate}
          muted
          premountFor={fps}
          objectFit="cover"
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
        {/* Feather the inset frame's edges into the black background. */}
        <AbsoluteFill style={{ boxShadow: "inset 0 0 90px 50px black" }} />
      </AbsoluteFill>
      {title ? (
        <>
          <AbsoluteFill
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 66%, rgba(0,0,0,0.9) 78%)",
            }}
          />
          <AbsoluteFill
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              paddingBottom: 430,
              color: "white",
              textAlign: "center",
            }}
          >
            <Reveal delay={8} rise={24}>
              <div
                style={{
                  fontFamily: sans,
                  fontWeight: 400,
                  fontSize: 26,
                  letterSpacing: "0.42em",
                  color: GOLD,
                }}
              >
                {chapter}
              </div>
            </Reveal>
            <Reveal delay={14} rise={24}>
              <div
                style={{
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontSize: 92,
                  lineHeight: 1.1,
                  marginTop: 14,
                }}
              >
                {title}
              </div>
            </Reveal>
          </AbsoluteFill>
        </>
      ) : null}
    </AbsoluteFill>
  );
};
