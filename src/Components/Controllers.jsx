/* eslint-disable react/prop-types */
import PlayerButton from "./PlayerButton";
import RangeTimer from "./RangeTimer";
import { PlayingMusic } from "../Contexts/Context";
import { useContext } from "react";

const Controllers = ({ runMusic }) => {
      const { playingMusicInfo, currentMusicPlaying } = useContext(PlayingMusic);
      return (
            <div className="px-10 z-50 sm:px-28  md:px-44  w-full py-5">
                  <RangeTimer playingMusicInfo={playingMusicInfo} currentMusicPlaying={currentMusicPlaying} />
                  <PlayerButton runMusic={runMusic} />
            </div>
      );
};

export default Controllers;
