import type React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { clamp, easeIn, easeOut } from "./style";

type MaskUpProps = {
  readonly at: number;
  readonly out?: number;
  readonly duration?: number;
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
};

// Text that slides up from behind an invisible edge, and optionally
// slides out upwards again at `out`.
export const MaskUp: React.FC<MaskUpProps> = ({
  at,
  out,
  duration = 14,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [at, at + duration], [110, 0], {
    ...clamp,
    easing: easeOut,
  });
  const exit =
    out === undefined
      ? 0
      : interpolate(frame, [out, out + 10], [0, -110], {
          ...clamp,
          easing: easeIn,
        });

  return (
    <div style={{ overflow: "hidden", paddingBottom: "0.04em", ...style }}>
      <div style={{ translate: `0 ${enter + exit}%` }}>{children}</div>
    </div>
  );
};
