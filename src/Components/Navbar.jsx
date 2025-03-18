/* eslint-disable react/prop-types */
import { SlPlaylist } from "react-icons/sl";
import MusicList from "./MusicList";
import { useRef } from "react";
import { motion } from "motion/react";
import Loader from "./Loader";
const Navbar = ({ runMusic, songs, currentMusicPlaying, playingMusicInfo }) => {
      const navBar = useRef(null);
      return (
            <>
                  <section className="w-full flex justify-end items-center p-5 ">
                        <h1 className="text-xl text-white whitespace-nowrap flex justify-center items-center  max-h-10  tracking-tighter leading-none w-[95%] text-center  font-medium">
                              {!currentMusicPlaying.paused ? (
                                    <Loader />
                              ) : (
                                    <>
                                          <span> Crafted by </span> <span className={`${playingMusicInfo.textColor} font-bold`}>Ahmad</span>
                                    </>
                              )}
                        </h1>
                        <motion.span
                              whileTap={{ scale: 0.7 }}
                              className="sm:hidden  flex justify-center items-center w-10 h-10"
                              onClick={() => {
                                    navBar.current.style.right = 0;
                              }}
                        >
                              <SlPlaylist size={"2rem"} />
                        </motion.span>
                  </section>
                  <motion.div ref={navBar} className="z-50 right-[-100%] sm:right-16 sm:top-24 transition-all ease-in-out duration-200 w-full sm:w-[40%] h-screen sm:h-[50%] absolute top-0">
                        <MusicList playingMusicInfo={playingMusicInfo} songs={songs} runMusic={runMusic} nav={navBar} />
                  </motion.div>
            </>
      );
};

export default Navbar;
