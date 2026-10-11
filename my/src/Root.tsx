import { Composition, Folder } from "remotion";
import { MyComposition } from "./Composition";
import { DayLeftReel } from "./DayLeft/DayLeftReel";
import { HironicReel } from "./HironicReel/HironicReel";
import { IntroCard } from "./HironicReel/IntroCard";
import { OutroCard } from "./HironicReel/OutroCard";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <Folder name="HironicScenes">
        <Composition
          id="HironicIntro"
          component={IntroCard}
          durationInFrames={110}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="HironicOutro"
          component={OutroCard}
          durationInFrames={165}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Composition
        id="HironicReel"
        component={HironicReel}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HironicDayLeft"
        component={DayLeftReel}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
