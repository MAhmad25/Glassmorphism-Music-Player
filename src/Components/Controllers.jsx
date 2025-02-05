/* eslint-disable react/prop-types */
import PlayerButton from "./PlayerButton";
import RangeTimer from "./RangeTimer";
import { PlayingMusic } from "../Contexts/PlayingMusic";
import { useContext } from "react";

const Controllers = ({ song, runMusic }) => {
      const { playingMusic, setPlayingMusic, currentMusicPlaying, setCurrentMusicPlaying, isPlaying, setisPlaying } = useContext(PlayingMusic);
      return (
            <div className="px-10 sm:px-24 md:px-40 w-full py-5">
                  <RangeTimer playingMusic={playingMusic} currentMusicPlaying={currentMusicPlaying} setPlayingMusic={setPlayingMusic} />
                  <PlayerButton song={song} runMusic={runMusic} setPlayingMusic={setPlayingMusic} isPlaying={isPlaying} setisPlaying={setisPlaying} currentMusicPlaying={currentMusicPlaying} setCurrentMusicPlaying={setCurrentMusicPlaying} playingMusic={playingMusic} />
            </div>
      );
};

export default Controllers;
