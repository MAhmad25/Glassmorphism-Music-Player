/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useRef, useEffect } from "react";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { PlayingMusic } from "../Contexts/PlayingMusic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);
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
            const splitTitle = new SplitText(title.current);
            let tl = gsap.timeline({ defaults: { duration: 0.3, ease: "power4.out" } });
            gsap.killTweensOf(splitTitle.chars);
            gsap.killTweensOf(artist.current);
            gsap.set([splitTitle.chars, artist.current], { yPercent: 100 });
            tl.to(splitTitle.chars, {
                  yPercent: 0,
                  skewX: 5,
                  stagger: {
                        from: "center",
                        axis: "x",
                        amount: 0.4,
                  },
            }).to(
                  artist.current,
                  {
                        yPercent: 0,
                        duration: 0.6,
                        onComplete: () => {
                              animationInProgress = false;
                        },
                  },
                  "-=0.5"
            );
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
