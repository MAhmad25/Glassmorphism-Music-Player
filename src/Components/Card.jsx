import { useContext } from "react";
import { PlayingMusic } from "../Contexts/PlayingMusic";

const Card = () => {
      const { playingMusic } = useContext(PlayingMusic);
      return (
            <div className="h-80 sm:h-64 lg:h-80 xl:left-[60%] lg:left-[55%] overflow-hidden shadow-zinc-800/30  shadow-2xl  w-[80%] 2xl:w-[65%] absolute left-1/2 rounded-md -translate-y-1/2 -translate-x-1/2 top-1/2 sm:top-[54%] bg-red-200">
                  <img className="w-full h-full object-cover" src={playingMusic.image} alt="" />
            </div>
      );
};

export default Card;
