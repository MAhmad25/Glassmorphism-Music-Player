import { useContext, useState } from "react";
import CardContainer from "./CardContainer";
import Controllers from "./Controllers";
import MusicInfo from "./MusicInfo";
import Navbar from "./Navbar";
import { PlayingMusic } from "../Contexts/PlayingMusic";
import { Music } from "../Contexts/MusicState";

const Foreground = () => {
      const { songs } = useContext(Music);
      const { playingMusicInfo, setPlayingMusicInfo, currentMusicPlaying, setCurrentMusicPlaying, setisPlaying } = useContext(PlayingMusic);
      const [currentMusic, setCurrentMusic] = useState(currentMusicPlaying);
      const runMusic = (selectedMusicIndex) => {
            let selectedMusic = songs.find((_, index) => index === selectedMusicIndex);
            const initializeMusic = new Audio(selectedMusic.audioPath);
            initializeMusic.preload = "auto";
            console.log(!currentMusic.paused);
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
