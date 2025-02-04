import { useContext } from "react";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { PlayingMusic } from "../Contexts/PlayingMusic";

const MusicInfo = () => {
      const { playingMusic } = useContext(PlayingMusic);
      return (
            <div className="px-10 flex flex-col items-center place-content-center">
                  <h3 className="text-lg font-medium">{playingMusic.title}</h3>
                  <h1 className={`text-lg flex justify-center tracking-tighter gap-1 items-center font-medium leading-none ${playingMusic.textColor} `}>
                        {playingMusic.title}
                        <span className=" inline-block">
                              <MdOutlineHorizontalRule />
                        </span>
                        {playingMusic.artist}
                  </h1>
            </div>
      );
};

export default MusicInfo;
