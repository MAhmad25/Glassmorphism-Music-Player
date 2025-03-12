import { createContext, useState } from "react";

export const PlayingMusic = createContext();
const MusicPlaying = (prop) => {
      const [currentMusicPlaying, setCurrentMusicPlaying] = useState(new Audio("/audio/riseup.mp3"));
      const [isPlaying, setisPlaying] = useState(false);
      const [playingMusicInfo, setPlayingMusicInfo] = useState({
            title: "Supplication",
            artist: "Sami Yusuf",
            image: "/images/supplication.jpg",
            bgColor: "bg-[#9F7231]",
            textColor: "text-[#d4bb70]",
            sliderColor: "bg-[#d4bb70]",
            audioPath: "/audio/supplication.mp3",
      });
      return <PlayingMusic.Provider value={{ playingMusicInfo, setPlayingMusicInfo, currentMusicPlaying, setCurrentMusicPlaying, isPlaying, setisPlaying }}>{prop.children}</PlayingMusic.Provider>;
};
export default MusicPlaying;
