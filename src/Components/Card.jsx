import { useContext, useRef } from "react";
import { PlayingMusic } from "../Contexts/Context";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Card = () => {
      const { playingMusicInfo } = useContext(PlayingMusic);
      const image = useRef(null);
      const animationRef = useRef({ inProgress: false });
      const { contextSafe } = useGSAP();
      const animateImage = contextSafe(() => {
            if (animationRef.current.inProgress) return;
            animationRef.current.inProgress = true;
            gsap.killTweensOf(image.current);
            gsap.from(image.current, {
                  scale: 1.2,
                  autoAlpha: 0,
                  duration: 0.5,
                  ease: "expo.inOut",
                  onComplete: () => {
                        animationRef.current.inProgress = false;
                  },
            });
      });
      useGSAP(() => {
            if (playingMusicInfo.image) {
                  animateImage();
            }
      }, [playingMusicInfo.image]);

      return (
            <div className="h-72 sm:h-64 lg:h-80 xl:left-[60%] lg:left-[55%] overflow-hidden shadow-zinc-800/30 shadow-2xl w-[80%] 2xl:w-[65%] absolute left-1/2 rounded-md -translate-y-1/2 -translate-x-1/2 top-1/2 sm:top-[54%] bg-transparent">
                  <img ref={image} className="w-full h-full object-cover " src={playingMusicInfo.image} alt={playingMusicInfo.title || "Album cover"} />
            </div>
      );
};

export default Card;
