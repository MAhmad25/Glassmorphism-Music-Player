import { motion } from "motion/react";
import { useContext, useEffect, useState } from "react";
import { PlayingMusic } from "../Contexts/Context";
const RangeTimer = () => {
      const [currentTime, setCurrentTime] = useState(0);
      const [duration, setDuration] = useState(0);
      const { playingMusicInfo, currentMusicPlaying } = useContext(PlayingMusic);
      const totalMinutes = Math.floor(duration / 60).toFixed(0);
      useEffect(() => {
            if (currentMusicPlaying) {
                  const updateTime = () => setCurrentTime(currentMusicPlaying.currentTime);
                  currentMusicPlaying.addEventListener("timeupdate", updateTime);
                  currentMusicPlaying.addEventListener("loadedmetadata", () => {
                        setDuration(currentMusicPlaying.duration);
                  });
            }
      }, [currentMusicPlaying]);
      return (
            <>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.2, ease: "backInOut", duration: 0.4 } }} className="flex md:w-full md:px-10 lg:px-40 xl:px-52  flex-col justify-center items-center">
                        <label htmlFor="slider"></label>
                        <motion.input
                              whileTap={{ scale: 1.05445 }}
                              whileHover={{ scaleY: 1.1 }}
                              onChange={(e) => {
                                    currentMusicPlaying.currentTime = e.target.value;
                                    setCurrentTime(e.target.value);
                              }}
                              max={duration}
                              value={currentTime}
                              name="slider"
                              className={`w-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5
                                                      [&::-webkit-slider-thumb]:h-5
                                                      [&::-webkit-slider-thumb]:rounded-full
                                                 [&::-webkit-slider-thumb]:bg-white 
                                                 [&::-webkit-slider-thumb]:shadow-[0_0_0_8px_rgba(255,255,255,0.2),0_0_0_15px_rgba(255,255,255,0.067)]  h-2 rounded-full 
                                                  [&::-moz-range-thumb]:appearance-none
                                                [&::-moz-range-thumb]:w-5
                                                [&::-moz-range-thumb]:h-5
                                                [&::-moz-range-thumb]:rounded-full
                                                 [&::-moz-range-thumb]:bg-white
                                                [&::-moz-range-thumb]:shadow-[0_0_0_8px_rgba(255,255,255,0.2),0_0_0_15px_rgba(255,255,255,0.067)] ${playingMusicInfo.sliderColor} `}
                              type="range"
                        />
                        <div className="w-full mt-2 flex justify-between gap-10 items-center">
                              <p className="font-medium">
                                    {Math.floor(currentTime / 60)}:
                                    {Math.floor(currentTime % 60)
                                          .toString()
                                          .padStart(2, "0")}
                              </p>
                              <p className="font-medium">
                                    {totalMinutes}:
                                    {Math.floor(duration % 60)
                                          .toString()
                                          .padStart(2, 0)}
                              </p>
                        </div>
                  </motion.div>
            </>
      );
};

export default RangeTimer;
