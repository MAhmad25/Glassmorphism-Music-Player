import { createContext, useState } from "react";
import MusicData from "../config/MusicData";

export const PlayingMusic = createContext();
const MusicPlaying = (prop) => {
      const [songs] = useState(MusicData);
      const [firstRun, setFirstRun] = useState(false);
      const [currentMusicPlaying, setCurrentMusicPlaying] = useState(new Audio("/audio/supplication.mp3"));
      const [isPlaying, setisPlaying] = useState(false);
      const [playingMusicInfo, setPlayingMusicInfo] = useState(songs[0]);
      return <PlayingMusic.Provider value={{ playingMusicInfo, firstRun, setFirstRun, songs, setPlayingMusicInfo, currentMusicPlaying, setCurrentMusicPlaying, isPlaying, setisPlaying }}>{prop.children}</PlayingMusic.Provider>;
};
export default MusicPlaying;
