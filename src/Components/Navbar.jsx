/* eslint-disable react/prop-types */
import { SlPlaylist } from "react-icons/sl";
import MusicList from "./MusicList";
import { motion } from "motion/react";
import { useRef } from "react";
const Navbar = ({ runMusic, song, playingMusic }) => {
      const navBar = useRef(null);
      return (
            <>
                  <section className="w-full flex justify-end items-center p-5 ">
                        <h1 className="text-xl text-white whitespace-nowrap tracking-tighter leading-none w-[95%] text-center  font-medium">
                              Based on <span className={`${playingMusic.textColor} font-bold`}>{playingMusic.artist}</span>
                        </h1>
                        <motion.span
                              onClick={() => {
                                    navBar.current.style.right = 0;
                              }}
                        >
                              <SlPlaylist size={"1.4rem"} />
                        </motion.span>
                  </section>
                  <motion.div ref={navBar} initial={{ right: "-100%" }} className="z-50 transition-all ease-in-out duration-200 w-full h-screen absolute top-0">
                        <MusicList playingMusic={playingMusic} song={song} runMusic={runMusic} nav={navBar} />
                  </motion.div>
            </>
      );
};

export default Navbar;
