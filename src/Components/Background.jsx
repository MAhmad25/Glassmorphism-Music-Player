import { useContext } from "react";
import Foreground from "./Foreground";
import { PlayingMusic } from "../Contexts/Context";
const Background = () => {
      const { playingMusicInfo } = useContext(PlayingMusic);
      return (
            <main className={`w-full bg-zinc-800 bg-center overflow-hidden relative bg-cover h-svh`}>
                  {playingMusicInfo && <img className="w-full h-full object-cover absolute top-0 left-0" src={playingMusicInfo.image} alt="Music Poster" />}
                  <Foreground />
            </main>
      );
};

export default Background;
