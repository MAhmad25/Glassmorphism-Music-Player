import { useContext, useState } from "react";
import CardContainer from "./CardContainer";
import Controllers from "./Controllers";
import MusicInfo from "./MusicInfo";
import Navbar from "./Navbar";
import { PlayingMusic } from "../Contexts/PlayingMusic";
import { Music } from "../Contexts/MusicState";

const Foreground = () => {
      const { playingMusic, setPlayingMusic, currentMusicPlaying, setCurrentMusicPlaying, setisPlaying } = useContext(PlayingMusic);
      const [currentMusic, setCurrentMusic] = useState(currentMusicPlaying);
      const { song } = useContext(Music);
      const runMusic = (selectedMusicIndex) => {
            let selectedMusic = song.find((_, index) => index === selectedMusicIndex);
            const initializeMusic = new Audio(selectedMusic.audioPath);
            if (currentMusic) {
                  currentMusic.pause();
                  currentMusic.currentTime = 0;
            }
            setisPlaying(true);
            setCurrentMusic(initializeMusic);
            setPlayingMusic(selectedMusic);
            setCurrentMusicPlaying(initializeMusic);
            initializeMusic.play();
            initializeMusic.onended = () => {
                  selectedMusicIndex++;
                  const nextIndex = selectedMusicIndex < song.length ? selectedMusicIndex : 0;
                  runMusic(nextIndex);
            };
      };
      return (
            <section className={`w-full  h-[100dvh] ${playingMusic.bgColor}/30  absolute  text-white top-0 left-0 backdrop-blur-2xl `}>
                  <Navbar song={song} playingMusic={playingMusic} runMusic={runMusic} />
                  <CardContainer />
                  <MusicInfo />
                  <Controllers song={song} runMusic={runMusic} />
            </section>
      );
};

export default Foreground;
