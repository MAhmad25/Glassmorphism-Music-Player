import { createContext, useState } from "react";

export const PlayingMusic = createContext();
const MusicPlaying = (prop) => {
      const [currentMusicPlaying, setCurrentMusicPlaying] = useState(new Audio("/audio/riseup.mp3"));
      const [isPlaying, setisPlaying] = useState(false);
      const [playingMusic, setPlayingMusic] = useState({
            title: "Rise Up",
            artist: "TheFatRat",
            image: "/images/rise_up.jpg",
            bgColor: "bg-[#D48947]",
            textColor: "text-[#dda56c]",
            sliderColor: "bg-[#e9c79e]",
            audioPath: "/audio/riseup.mp3",
      });
      return <PlayingMusic.Provider value={{ playingMusic, setPlayingMusic, currentMusicPlaying, setCurrentMusicPlaying, isPlaying, setisPlaying }}>{prop.children}</PlayingMusic.Provider>;
};
export default MusicPlaying;
