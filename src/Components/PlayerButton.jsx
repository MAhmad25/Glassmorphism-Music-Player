/* eslint-disable react/prop-types */
import { FaPlay } from "react-icons/fa6";
import { IoIosPause } from "react-icons/io";

import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
const size = "3rem";

const PlayerButton = ({ playingMusic, currentMusicPlaying, isPlaying, setisPlaying, song, runMusic }) => {
      const codewithBracket = playingMusic.textColor.split("[").at(-1);
      const color = codewithBracket.slice(0, codewithBracket.length - 1);
      const Findindex = song.findIndex((eachItem) => eachItem.title === playingMusic.title);
      return (
            <div className="w-full flex items-center justify-between mt-4">
                  <span
                        onClick={() => {
                              Findindex > 0 ? runMusic(Findindex - 1) : runMusic(song.length - 1);
                        }}
                  >
                        <MdSkipPrevious color={color} size={size} />
                  </span>
                  {isPlaying ? (
                        <span
                              onClick={() => {
                                    currentMusicPlaying.pause();
                                    setisPlaying(false);
                              }}
                        >
                              <IoIosPause color={color} size={size} />
                        </span>
                  ) : (
                        <span
                              onClick={() => {
                                    currentMusicPlaying.play();
                                    setisPlaying(true);
                              }}
                        >
                              <FaPlay color={color} size={"2.5rem"} />
                        </span>
                  )}
                  <span onClick={() => (Findindex < song.length - 1 ? runMusic(Findindex + 1) : runMusic(0))}>
                        <MdSkipNext color={color} size={size} />
                  </span>
            </div>
      );
};

export default PlayerButton;
