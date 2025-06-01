/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useRef, useEffect } from "react";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { PlayingMusic } from "../Contexts/PlayingMusic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
gsap.registerPlugin(CSSPlugin);

const MusicInfo = () => {
      const { contextSafe } = useGSAP();
      const { playingMusicInfo } = useContext(PlayingMusic);
      const title = useRef(null);
      const artist = useRef(null);
      let animationInProgress = false;
      const animateText = contextSafe(() => {
            if (animationInProgress) return;
            animationInProgress = true;
            gsap.killTweensOf([title.current, artist.current]);
            gsap.set([title.current, artist.current], { yPercent: -100 });
            gsap.to([title.current, artist.current], {
                  yPercent: 0,
                  stagger: 0.1,
                  duration: 0.5,
                  ease: "power4.out",
                  onComplete: () => {
                        animationInProgress = false;
                  },
            });
      });
      useEffect(() => {
            if (playingMusicInfo.title && playingMusicInfo.artist) {
                  animateText();
            }
      }, [playingMusicInfo]);
      return (
            <div className="px-10 z-50   flex flex-col   overflow-hidden items-center h-fit sm:mt-5  py-1 place-content-center ">
                  <div className="overflow-hidden">
                        <h3 ref={title} className="text-lg font-medium">
                              {playingMusicInfo.title}
                        </h3>
                  </div>
                  <div className="overflow-hidden">
                        <h1 ref={artist} className={`text-[17px] sm:text-lg flex justify-center tracking-tighter gap-1 items-center font-medium text-center whitespace-nowrap leading-none ${playingMusicInfo.textColor} `}>
                              Artist
                              <span className=" inline-block">
                                    <MdOutlineHorizontalRule />
                              </span>
                              {playingMusicInfo.artist}
                        </h1>
                  </div>
            </div>
      );
};

export default MusicInfo;
