import { useContext, useRef, useState } from "react";
import CardContainer from "./CardContainer";
import Controllers from "./Controllers";
import MusicInfo from "./MusicInfo";
import Navbar from "./Navbar";
import { PlayingMusic } from "../Contexts/PlayingMusic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Foreground = () => {
      const { playingMusicInfo, setFirstRun, setPlayingMusicInfo, currentMusicPlaying, setCurrentMusicPlaying, songs, setisPlaying } = useContext(PlayingMusic);
      const [currentMusic, setCurrentMusic] = useState(currentMusicPlaying);
      const runMusic = (selectedMusicIndex) => {
            setFirstRun(true);
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
      const contref1 = useRef(null);
      const contref2 = useRef(null);
      const contref3 = useRef(null);
      useGSAP(() => {
            gsap.to([contref1.current, contref2.current, contref3.current], {
                  scaleY: 0,
                  stagger: 0.3,
                  transformOrigin: "top top",
                  delay: 0.5,
                  duration: 0.8,
                  ease: "expoScale(1,2,power2.inOut)",
            });
      });
      return (
            <section className={`w-full  h-[100dvh] ${playingMusicInfo.bgColor}/30  absolute  text-white top-0 left-0  backdrop-blur-2xl `}>
                  <div ref={contref1} className="bg-zinc-700 absolute  z-60 w-[33%] h-full"></div>
                  <div ref={contref2} className="bg-zinc-800 absolute left-[33%] z-60 w-[33%] h-full"></div>
                  <div ref={contref3} className="bg-zinc-900 absolute left-[66%] z-60 w-[34%] h-full"></div>
                  <Navbar songs={songs} playingMusicInfo={playingMusicInfo} currentMusicPlaying={currentMusicPlaying} runMusic={runMusic} />
                  <CardContainer />
                  <MusicInfo />
                  <Controllers runMusic={runMusic} />
            </section>
      );
};

export default Foreground;
