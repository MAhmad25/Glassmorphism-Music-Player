import PlayerButton from "./PlayerButton";
import RangeTimer from "./RangeTimer";

const Controllers = () => {
      return (
            <div className="px-10 z-50 sm:px-28  md:px-44  w-full py-5">
                  <RangeTimer />
                  <PlayerButton />
            </div>
      );
};

export default Controllers;
