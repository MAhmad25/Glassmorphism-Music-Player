import { createContext, useEffect, useState } from "react";
import MusicData from "../config/MusicData";
export const Music = createContext();
const MusicContext = (prop) => {
      const [song, setSong] = useState([]);
      const fetchData = () => {
            const allMusics = JSON.parse(localStorage.getItem("musics"));
            setSong(allMusics);
      };
      useEffect(() => {
            localStorage.setItem("musics", JSON.stringify(MusicData));
            fetchData();
      }, []);
      // console.log(music);
      return <Music.Provider value={{ song, setSong }}>{prop.children}</Music.Provider>;
};
export default MusicContext;
