import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { clamp, easeOut, sans } from "./style";

type SpeakerCardProps = {
  readonly at: number;
  readonly photo: string;
  readonly name: string;
  readonly width: number;
  readonly height: number;
  readonly nameSize: number;
};

// Portrait revealed bottom-up with a settling zoom, name underneath.
export const SpeakerCard: React.FC<SpeakerCardProps> = ({
  at,
  photo,
  name,
  width,
  height,
  nameSize,
}) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [at, at + 14], [100, 0], {
    ...clamp,
    easing: easeOut,
  });

  return (
    <div style={{ width }}>
      <div
        style={{
          width,
          height,
          borderRadius: 18,
          overflow: "hidden",
          clipPath: `inset(${reveal}% 0 0 0 round 18px)`,
          boxShadow: "0 0 0 1px rgba(214,190,142,0.55)",
        }}
      >
        <Img
          src={staticFile(photo)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 20%",
            scale: interpolate(
              frame,
              [at, at + 30, at + 120],
              [1.25, 1.04, 1],
              {
                ...clamp,
                easing: easeOut,
              },
            ),
          }}
        />
      </div>
      <div
        style={{
          marginTop: 14,
          fontFamily: sans,
          fontWeight: 600,
          fontSize: nameSize,
          color: "white",
          textAlign: "center",
          whiteSpace: "nowrap",
          opacity: interpolate(frame, [at + 6, at + 16], [0, 1], clamp),
          translate: `0 ${interpolate(frame, [at + 6, at + 16], [14, 0], {
            ...clamp,
            easing: easeOut,
          })}px`,
        }}
      >
        {name}
      </div>
    </div>
  );
};
