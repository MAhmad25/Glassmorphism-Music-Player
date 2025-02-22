import { createContext, useState } from "react";

export const PlayingMusic = createContext();
const MusicPlaying = (prop) => {
      const [currentMusicPlaying, setCurrentMusicPlaying] = useState(new Audio("/audio/riseup.mp3"));
      const [isPlaying, setisPlaying] = useState(false);
      const [playingMusicInfo, setPlayingMusicInfo] = useState({
            title: "Machine",
            artist: "Neoni",
            image: "/images/machine.jpg",
            bgColor: "bg-[#313A7D]",
            textColor: "text-[#a4bcec]",
            sliderColor: "bg-[#a4bcec]",
            audioPath: "/audio/machine.mp3",
      });
      return <PlayingMusic.Provider value={{ playingMusicInfo, setPlayingMusicInfo, currentMusicPlaying, setCurrentMusicPlaying, isPlaying, setisPlaying }}>{prop.children}</PlayingMusic.Provider>;
};
export default MusicPlaying;
