import { useContext, useRef } from "react";
import { PlayingMusic } from "../Contexts/PlayingMusic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Card = () => {
      const { playingMusicInfo } = useContext(PlayingMusic);
      const image = useRef(null);
      useGSAP(() => {
            gsap.from(image.current, {
                  scale: 1.2,
                  duration: 0.8,
                  ease: "expo.out",
                  opacity: 0,
            });
      }, [playingMusicInfo.image]);
      return (
            <div className="h-72 sm:h-64 lg:h-80 xl:left-[60%] lg:left-[55%] overflow-hidden shadow-zinc-800/30  shadow-2xl  w-[80%] 2xl:w-[65%] absolute left-1/2 rounded-md -translate-y-1/2 -translate-x-1/2 top-1/2 sm:top-[54%] bg-transparent ">
                  <img ref={image} className="w-full  h-full  object-cover" src={playingMusicInfo.image} alt="" />
            </div>
      );
};

export default Card;
