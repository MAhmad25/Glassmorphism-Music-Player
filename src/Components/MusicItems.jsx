import { motion } from "motion/react";
import { memo } from "react";
/* eslint-disable react/prop-types */
const MusicItems = ({ musicDetail }) => {
      return (
            <motion.div whileHover={{ paddingLeft: "20px" }} className="w-full py-5 px-2 gap-5 flex items-center border-b-[.5px]">
                  <motion.div whileTap={{ opacity: 0, scale: 2 }} className="w-10 h-10 overflow-hidden rounded-md">
                        <img className="w-full h-full object-cover" src={musicDetail.image} alt="" />
                  </motion.div>
                  <motion.h1 whileTap={{ opacity: 0, scale: 1 }} className="text-xl  leading-none">
                        {musicDetail.title}
                  </motion.h1>
            </motion.div>
      );
};

export default memo(MusicItems);
