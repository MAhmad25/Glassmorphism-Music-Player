/* eslint-disable react/prop-types */
import MusicItems from "./MusicItems";
import { motion } from "motion/react";
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

const MusicList = ({ nav, songs, playingMusicInfo, runMusic }) => {
      const [position, setPosition] = useState(0);
      // window.addEventListener("resize", (e) => {
      //       console.log(position);
      //       if (e.target.screen.width - 6 >= 640) {
      //             if (position < 0) {
      //                   setPosition(100);
      //             }
      //       }
      // });
      return (
            <motion.div className={`w-full nav sm:right-[${position}%] relative h-full cursor-pointer overflow-x-hidden overflow-y-scroll  p-5 sm:bg-transparent ${playingMusicInfo.bgColor}`}>
                  <h1 className={`text-4xl mb-2 font-semibold tracking-tight ${playingMusicInfo.textColor} rounded-3xl sm:hidden  py-2 leading-none uppercase`}>PlayList</h1>
                  <motion.span
                        whileTap={{ scale: 0.7 }}
                        onClick={() => {
                              nav.current.style.right = "-100%";
                        }}
                        className="absolute sm:hidden top-7 right-5"
                  >
                        <MdOutlineClose size={"2.5rem"} />
                  </motion.span>
                  <section className="w-full pb-5 h-full">
                        {songs.map((eachMusic, index) => (
                              <span onClick={() => runMusic(index)} key={index}>
                                    <MusicItems musicDetail={eachMusic} />
                              </span>
                        ))}
                  </section>
            </motion.div>
      );
};

export default MusicList;
