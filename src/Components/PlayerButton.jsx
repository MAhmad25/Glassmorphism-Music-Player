/* eslint-disable react/prop-types */
import { motion } from "motion/react";
import { useContext } from "react";
import { FaPlay } from "react-icons/fa6";
import { IoIosPause } from "react-icons/io";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { PlayingMusic } from "../Contexts/Context";
//Global Variables
const size = "3rem";

const PlayerButton = ({ runMusic }) => {
      const { playingMusicInfo, firstRun, setFirstRun, currentMusicPlaying, isPlaying, setisPlaying, songs } = useContext(PlayingMusic);
      const codewithBracket = playingMusicInfo.textColor.split("[").at(-1);
      const color = codewithBracket.slice(0, codewithBracket.length - 1);
      const Findindex = songs.findIndex((eachMusic) => eachMusic.title === playingMusicInfo.title);
      return (
            <div className="w-full md:px-10 lg:px-40 xl:px-64  flex items-center justify-around">
                  <motion.span
                        initial={{ y: "200%" }}
                        animate={{ y: 0, transition: { delay: 0.2, ease: "backInOut", duration: 0.4 } }}
                        whileTap={{ scale: 0.755588 }}
                        onClick={() => {
                              Findindex > 0 ? runMusic(Findindex - 1) : runMusic(songs.length - 1);
                        }}
                        className="p-2 bg-black/10 backdrop-blur-md rounded-full"
                  >
                        <MdSkipPrevious color={color} size={size} />
                  </motion.span>
                  {isPlaying ? (
                        <motion.span
                              initial={{ y: "200%" }}
                              animate={{ y: 0, transition: { delay: 0.2, ease: "backInOut", duration: 0.4 } }}
                              whileTap={{ scale: 0.755588 }}
                              onClick={() => {
                                    currentMusicPlaying.pause();
                                    setisPlaying(false);
                              }}
                              className="p-2 bg-black/10 backdrop-blur-md rounded-full"
                        >
                              <IoIosPause color={color} size={size} />
                        </motion.span>
                  ) : (
                        <motion.span
                              whileTap={{ scale: 0.755588 }}
                              initial={{ y: "200%" }}
                              animate={{ y: 0, transition: { delay: 0.2, ease: "backInOut", duration: 0.4 } }}
                              onClick={() => {
                                    if (firstRun) {
                                          currentMusicPlaying.play();
                                    } else {
                                          setFirstRun(false);
                                          runMusic(Findindex);
                                    }
                                    setisPlaying(true);
                              }}
                              className=" p-3 bg-black/10 backdrop-blur-md rounded-full"
                        >
                              <FaPlay color={color} size={"2.4rem"} />
                        </motion.span>
                  )}
                  <motion.span initial={{ y: "200%" }} animate={{ y: 0, transition: { delay: 0.2, ease: "backInOut", duration: 0.4 } }} whileTap={{ scale: 0.755588 }} className=" p-2  bg-black/10 backdrop-blur-md rounded-full" onClick={() => (Findindex < songs.length - 1 ? runMusic(Findindex + 1) : runMusic(0))}>
                        <MdSkipNext color={color} size={size} />
                  </motion.span>
            </div>
      );
};

export default PlayerButton;
