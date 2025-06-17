import { motion } from "motion/react";
import { useContext } from "react";
import { FaPlay } from "react-icons/fa6";
import { IoIosPause } from "react-icons/io";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { PlayingMusic } from "../Contexts/Context";
const size = "3rem";

const PlayerButton = () => {
      const { playingMusicInfo, runMusic, currentMusicPlaying, isPlaying, setisPlaying, songs } = useContext(PlayingMusic);
      const codewithBracket = playingMusicInfo.textColor.split("[").at(-1);
      const color = codewithBracket.slice(0, codewithBracket.length - 1);
      const index = playingMusicInfo.id;
      return (
            <div className="w-full  md:px-10 lg:px-40 xl:px-64  flex items-center justify-around">
                  <motion.span
                        initial={{ x: "-100%" }}
                        animate={{ x: 0, transition: { delay: 0.1, ease: "backInOut", duration: 0.5 } }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => {
                              index > 0 ? runMusic(index - 1) : runMusic(songs.length - 1);
                        }}
                        className="p-2 bg-black/10 backdrop-blur-md rounded-full"
                  >
                        <MdSkipPrevious color={color} size={size} />
                  </motion.span>
                  {isPlaying ? (
                        <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1, transition: { delay: 0.1, ease: "backInOut", duration: 0.5 } }}
                              whileTap={{ scale: 0.8 }}
                              onClick={() => {
                                    if (!currentMusicPlaying.paused) {
                                          currentMusicPlaying.pause();
                                          setisPlaying(false);
                                    }
                              }}
                              className="p-2 bg-black/10 backdrop-blur-md rounded-full"
                        >
                              <IoIosPause color={color} size={size} />
                        </motion.span>
                  ) : (
                        <motion.span
                              whileTap={{ scale: 0.8 }}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1, transition: { delay: 0.2, ease: "backInOut", duration: 0.5 } }}
                              onClick={() => {
                                    currentMusicPlaying.play();
                                    setisPlaying(true);
                              }}
                              className=" p-3 bg-black/10 backdrop-blur-md rounded-full"
                        >
                              <FaPlay color={color} size={"2.4rem"} />
                        </motion.span>
                  )}
                  <motion.span initial={{ x: "100%" }} animate={{ x: 0, transition: { delay: 0.2, ease: "backInOut", duration: 0.5 } }} whileTap={{ scale: 0.8 }} className=" p-2  bg-black/10 backdrop-blur-md rounded-full" onClick={() => (index < songs.length - 1 ? runMusic(index + 1) : runMusic(0))}>
                        <MdSkipNext color={color} size={size} />
                  </motion.span>
            </div>
      );
};

export default PlayerButton;
