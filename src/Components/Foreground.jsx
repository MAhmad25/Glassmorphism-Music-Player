import { useContext, useState } from "react";
import CardContainer from "./CardContainer";
import Controllers from "./Controllers";
import MusicInfo from "./MusicInfo";
import Navbar from "./Navbar";
import { PlayingMusic } from "../Contexts/PlayingMusic";
const Foreground = () => {
      const { playingMusicInfo, setPlayingMusicInfo, currentMusicPlaying, setCurrentMusicPlaying, songs, setisPlaying } = useContext(PlayingMusic);
      const [currentMusic, setCurrentMusic] = useState(currentMusicPlaying);
      //!   Important
      //?  runMusic() is the Most Important Function of this Application This Handle Everything
      //?  This is where whole App's state Changes
      const runMusic = (selectedMusicIndex) => {
            let selectedMusic = songs.find((_, index) => index === selectedMusicIndex);
            const initializeMusic = new Audio(selectedMusic.audioPath);
            initializeMusic.preload = "auto";
            if (!currentMusic.paused) {
                  currentMusic.pause();
                  currentMusic.currentTime = 0;
            }
            setisPlaying(true);
            setCurrentMusic(initializeMusic);
            setPlayingMusicInfo(selectedMusic);
            setCurrentMusicPlaying(initializeMusic);
            initializeMusic.play();
            initializeMusic.onended = () => {
                  selectedMusicIndex++;
                  const nextIndex = selectedMusicIndex < songs.length ? selectedMusicIndex : 0;
                  runMusic(nextIndex);
            };
      };
      return (
            <section className={`w-full  h-[100dvh] ${playingMusicInfo.bgColor}/30  absolute  text-white top-0 left-0 backdrop-blur-2xl `}>
                  <Navbar songs={songs} playingMusicInfo={playingMusicInfo} runMusic={runMusic} />
                  <CardContainer />
                  <MusicInfo />
                  <Controllers songs={songs} runMusic={runMusic} />
            </section>
      );
};

export default Foreground;
