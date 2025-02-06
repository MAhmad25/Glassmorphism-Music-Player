import { useContext } from "react";
import Foreground from "./Foreground";
import { PlayingMusic } from "../Contexts/PlayingMusic";

const Background = () => {
      const { playingMusicInfo } = useContext(PlayingMusic);
      return (
            <section className={`w-full bg-center overflow-hidden relative bg-cover h-svh`}>
                  <img className="w-full h-full object-cover absolute top-0 left-0" src={playingMusicInfo.image} alt="" />
                  <Foreground />
            </section>
      );
};

export default Background;
