import { useContext } from "react";
import CardContainer from "./CardContainer";
import Controllers from "./Controllers";
import MusicInfo from "./MusicInfo";
import Navbar from "./Navbar";
import { PlayingMusic } from "../Contexts/Context";
const Foreground = () => {
      const { playingMusicInfo } = useContext(PlayingMusic);
      return (
            <section className={`w-full  h-[100dvh] ${playingMusicInfo.bgColor}/30  absolute  text-white top-0 left-0  backdrop-blur-2xl `}>
                  <Navbar />
                  <CardContainer />
                  <MusicInfo />
                  <Controllers />
            </section>
      );
};

export default Foreground;
