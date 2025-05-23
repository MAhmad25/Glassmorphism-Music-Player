import { useContext } from "react";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { PlayingMusic } from "../Contexts/PlayingMusic";
import { motion } from "motion/react";

const MusicInfo = () => {
      const { playingMusicInfo } = useContext(PlayingMusic);
      return (
            <div className="px-10 z-50   flex flex-col   overflow-hidden items-center h-fit sm:mt-5  py-1 place-content-center ">
                  <motion.h3 initial={{ y: "200%" }} animate={{ y: 0, transition: { delay: 0.2, ease: "backInOut", duration: 0.4 } }} className="text-lg font-medium">
                        {playingMusicInfo.title}
                  </motion.h3>
                  <motion.h1 initial={{ y: "200%" }} animate={{ y: 0, transition: { delay: 0.2, ease: "backInOut", duration: 0.4 } }} className={`text-[17px] sm:text-lg flex justify-center tracking-tighter gap-1 items-center font-medium text-center whitespace-nowrap leading-none ${playingMusicInfo.textColor} `}>
                        Artist
                        <span className=" inline-block">
                              <MdOutlineHorizontalRule />
                        </span>
                        {playingMusicInfo.artist}
                  </motion.h1>
            </div>
      );
};

export default MusicInfo;
