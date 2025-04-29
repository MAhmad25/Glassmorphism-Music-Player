/* eslint-disable react/prop-types */
import PlayerButton from "./PlayerButton";
import RangeTimer from "./RangeTimer";
import { PlayingMusic } from "../Contexts/PlayingMusic";
import { useContext } from "react";

const Controllers = ({ runMusic }) => {
      const { playingMusicInfo, songs, setPlayingMusicInfo, currentMusicPlaying, setCurrentMusicPlaying, isPlaying, setisPlaying, firstRun, setFirstRun } = useContext(PlayingMusic);
      return (
            <div className="px-10 z-50 sm:px-24 md:px-40 w-full py-5">
                  <RangeTimer playingMusicInfo={playingMusicInfo} currentMusicPlaying={currentMusicPlaying} setPlayingMusicInfo={setPlayingMusicInfo} />
                  <PlayerButton firstRun={firstRun} setFirstRun={setFirstRun} songs={songs} runMusic={runMusic} setPlayingMusicInfo={setPlayingMusicInfo} isPlaying={isPlaying} setisPlaying={setisPlaying} currentMusicPlaying={currentMusicPlaying} setCurrentMusicPlaying={setCurrentMusicPlaying} playingMusicInfo={playingMusicInfo} />
            </div>
      );
};

export default Controllers;
