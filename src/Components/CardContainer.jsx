import { memo } from "react";
import WaterDistortionCard from "./WaterDistortionCard";
const CardContainer = () => {
      return (
            <section className="w-full  sm:flex sm:justify-center  sm:items-center sm:w-1/2   relative h-[55%]">
                  <WaterDistortionCard />
            </section>
      );
};

export default memo(CardContainer);
