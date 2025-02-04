import Card from "./Card";

const CardContainer = () => {
      return (
            <section className="w-full relative h-[60%]  px-10">
                  <section className="absolute w-[70%] left-1/2 -translate-y-1/2 -translate-x-1/2 top-[46%] rounded-md bg-white/30  h-80"></section>
                  <section className="absolute w-3/4 left-1/2 -translate-y-1/2 -translate-x-1/2 top-[48%] rounded-md bg-white/40  h-80"></section>
                  <Card />
            </section>
      );
};

export default CardContainer;
