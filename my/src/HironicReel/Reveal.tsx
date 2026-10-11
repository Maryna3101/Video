import type React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { EASE_OUT } from "./theme";

type RevealProps = {
  readonly delay: number;
  readonly duration?: number;
  readonly rise?: number;
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
};

// Soft rise + de-blur used for every text element in the cards.
export const Reveal: React.FC<RevealProps> = ({
  delay,
  duration = 30,
  rise = 36,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const opts = {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(...EASE_OUT),
  } as const;

  return (
    <div
      style={{
        opacity: interpolate(frame, [delay, delay + duration], [0, 1], opts),
        translate: interpolate(
          frame,
          [delay, delay + duration],
          [`0px ${rise}px`, "0px 0px"],
          opts,
        ),
        filter: `blur(${interpolate(frame, [delay, delay + duration], [10, 0], opts)}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
