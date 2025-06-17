import { useState } from "react";
import MusicData from "../config/MusicData";
import { PlayingMusic } from "../Contexts/Context";
// eslint-disable-next-line react/prop-types
const MusicPlaying = ({ children }) => {
      const [songs] = useState(MusicData);
      const [currentMusicPlaying, setCurrentMusicPlaying] = useState(new Audio(`${songs[0].audioPath}`));
      const [isPlaying, setisPlaying] = useState(false);
      const [playingMusicInfo, setPlayingMusicInfo] = useState(songs[0]);
      const runMusic = (selectedMusicIndex) => {
            let selectedMusic = songs[selectedMusicIndex];
            console.log("Selected Music Object: ", selectedMusic);
            const initializeMusic = new Audio(selectedMusic.audioPath);
            initializeMusic.preload = "auto";
            if (!currentMusicPlaying.paused) {
                  currentMusicPlaying.pause();
                  currentMusicPlaying.currentTime = 0;
            }
            setisPlaying(true);
            setCurrentMusicPlaying(initializeMusic);
            setPlayingMusicInfo(selectedMusic);
            setCurrentMusicPlaying(initializeMusic);
            initializeMusic.play();
            initializeMusic.onended = () => {
                  selectedMusicIndex++;
                  const nextIndex = selectedMusicIndex < songs.length ? selectedMusicIndex : 0;
                  runMusic(nextIndex);
            };
      };
      const appStates = {
            songs,
            currentMusicPlaying,
            setCurrentMusicPlaying,
            isPlaying,
            setisPlaying,
            playingMusicInfo,
            setPlayingMusicInfo,
            runMusic,
      };
      return <PlayingMusic.Provider value={appStates}>{children}</PlayingMusic.Provider>;
};
export default MusicPlaying;
