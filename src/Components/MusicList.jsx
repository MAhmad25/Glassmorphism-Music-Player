/* eslint-disable react/prop-types */
import MusicItems from "./MusicItems";
import { motion } from "motion/react";
import { memo, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
const MusicList = ({ nav, songs, playingMusicInfo, runMusic }) => {
      useEffect(() => {
            const handleResize = () => {
                  if (window.innerWidth >= 640) nav.current.style.right = "3%";
            };
            window.addEventListener("resize", handleResize);
            return () => removeEventListener("resize", handleResize);
      }, [nav]);
      return (
            <motion.div className={`w-full [&::-webkit-scrollbar]:hidden sm:right-[0%] relative h-dvh sm:h-full cursor-pointer sm:bg-transparent p-5  ${playingMusicInfo.bgColor}`}>
                  <h1 className={`text-4xl mb-2 font-semibold tracking-tight ${playingMusicInfo.textColor} rounded-3xl sm:hidden  py-2 leading-none uppercase`}>playlist</h1>
                  <motion.span
                        whileTap={{ scale: 0.7 }}
                        onClick={() => {
                              nav.current.style.right = "-100%";
                        }}
                        className="absolute sm:hidden top-7 right-5"
                  >
                        <MdOutlineClose size={"2.5rem"} />
                  </motion.span>
                  <section className="w-full [&::-webkit-scrollbar]:hidden overflow-hidden overflow-y-scroll  sm:h-full h-[90%]">
                        {songs.map((eachMusic, index) => (
                              <span onClick={() => runMusic(index)} key={index}>
                                    <MusicItems musicDetail={eachMusic} />
                              </span>
                        ))}
                  </section>
            </motion.div>
      );
};

export default memo(MusicList);
