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
                              onChange={(e) => {
                                    currentMusicPlaying.currentTime = e.target.value;
                                    setCurrentTime(e.target.value);
                              }}
                              max={duration}
                              value={currentTime}
                              name="slider"
                              className={`w-full appearance-none h-2 rounded-full ${playingMusicInfo.sliderColor} `}
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
