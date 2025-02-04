/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const RangeTimer = ({ playingMusic, currentMusicPlaying }) => {
      const [currentTime, setCurrentTime] = useState(0);
      const [duration, setDuration] = useState(0);
      useEffect(() => {
            if (currentMusicPlaying) {
                  const updateTime = () => setCurrentTime(currentMusicPlaying.currentTime);
                  currentMusicPlaying.addEventListener("timeupdate", updateTime);
                  currentMusicPlaying.addEventListener("loadedmetadata", () => {
                        setDuration(currentMusicPlaying.duration);
                  });
            }
      }, [currentMusicPlaying]);
      const totalMinutes = Math.floor(duration / 60).toFixed(0);
      return (
            <>
                  <div className="flex flex-col justify-center items-center">
                        <input
                              onChange={(e) => {
                                    currentMusicPlaying.currentTime = e.target.value;
                                    setCurrentTime(e.target.value);
                              }}
                              max={duration}
                              value={currentTime}
                              className={`w-full appearance-none h-2  rounded-full ${playingMusic.sliderColor} `}
                              type="range"
                        />
                        <div className="w-full mt-2 flex justify-between gap-10 items-center">
                              <p className="font-medium">
                                    {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, "0")}
                              </p>
                              <p className="font-medium">
                                    {totalMinutes}:{(duration % 60).toFixed(0).padStart(2, 0)}
                              </p>
                        </div>
                  </div>
            </>
      );
};

export default RangeTimer;
