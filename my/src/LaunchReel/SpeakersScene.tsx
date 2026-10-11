import { AbsoluteFill } from "remotion";
import { MaskUp } from "./MaskUp";
import { SpeakerCard } from "./SpeakerCard";
import { GOLD, lb, sans } from "./style";

const tag: React.CSSProperties = {
  fontFamily: sans,
  fontWeight: 400,
  fontSize: 24,
  letterSpacing: "0.34em",
  color: GOLD,
  textAlign: "center",
};

// Five speakers popping in one per beat, grouped by session.
export const SpeakersScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 262 }}>
      <MaskUp at={0} style={{ ...tag, fontSize: 30, letterSpacing: "0.4em" }}>
        MEET THE
      </MaskUp>
      <MaskUp
        at={3}
        style={{
          fontFamily: sans,
          fontWeight: 800,
          fontSize: 116,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: "white",
        }}
      >
        SPEAKERS
      </MaskUp>
      <MaskUp at={lb(1)} style={{ ...tag, marginTop: 44 }}>
        MIGLOU SESSION
      </MaskUp>
      <div style={{ display: "flex", gap: 40, marginTop: 22 }}>
        <SpeakerCard
          at={lb(1)}
          photo="own/jisoo-kook.jpg"
          name="Dr. Jisoo Kook"
          width={370}
          height={420}
          nameSize={32}
        />
        <SpeakerCard
          at={lb(2)}
          photo="own/dongwoo-shin.jpg"
          name="Dr. Dongwoo Shin"
          width={370}
          height={420}
          nameSize={32}
        />
      </div>
      <MaskUp at={lb(3)} style={{ ...tag, marginTop: 44 }}>
        SYNERJET PRO SESSION
      </MaskUp>
      <div style={{ display: "flex", gap: 30, marginTop: 22 }}>
        <SpeakerCard
          at={lb(3)}
          photo="own/wonkyu-hong.jpg"
          name="Dr. Wonkyu Hong"
          width={250}
          height={280}
          nameSize={24}
        />
        <SpeakerCard
          at={lb(3.5)}
          photo="own/hyunseok-nam.jpg"
          name="Dr. Hyunseok Nam"
          width={250}
          height={280}
          nameSize={24}
        />
        <SpeakerCard
          at={lb(4)}
          photo="own/chris-kim.jpg"
          name="Dr. Chris Gunwoo Kim"
          width={250}
          height={280}
          nameSize={24}
        />
      </div>
    </AbsoluteFill>
  );
};
