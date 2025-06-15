import { useState } from "react";
import MusicData from "../config/MusicData";
import { PlayingMusic } from "../Contexts/Context";
const MusicPlaying = (props) => {
      const [songs] = useState(MusicData);
      const [firstRun, setFirstRun] = useState(false);
      const [currentMusicPlaying, setCurrentMusicPlaying] = useState(new Audio("/audio/supplication.mp3"));
      const [isPlaying, setisPlaying] = useState(false);
      const [playingMusicInfo, setPlayingMusicInfo] = useState(songs[0]);
      const appStates = {
            songs,
            firstRun,
            setFirstRun,
            currentMusicPlaying,
            setCurrentMusicPlaying,
            isPlaying,
            setisPlaying,
            playingMusicInfo,
            setPlayingMusicInfo,
      };
      return <PlayingMusic.Provider value={appStates}>{props.children}</PlayingMusic.Provider>;
};
export default MusicPlaying;
