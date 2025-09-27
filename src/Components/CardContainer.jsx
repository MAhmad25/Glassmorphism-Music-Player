import Card from "./Card";
import { memo } from "react";
const CardContainer = () => {
      return (
            <section className="w-full sm:flex sm:justify-center sm:items-center sm:w-1/2  relative h-[55%]">
                  <Card />
            </section>
      );
};

export default memo(CardContainer);
