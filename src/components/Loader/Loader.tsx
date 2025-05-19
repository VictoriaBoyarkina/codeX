import { motion } from "framer-motion";
import { FC } from "react";

const Loader: FC = () => {
  return (
    <div className="w-full h-full flex space-x-2 justify-center items-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-primary rounded-full"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
        />
      ))}
    </div>
  );
};

export default Loader;
