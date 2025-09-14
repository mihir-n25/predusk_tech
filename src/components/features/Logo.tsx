import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Sparkles className="w-5 h-5 text-blue-400" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Mirofy
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return <Sparkles className="w-5 h-5 text-blue-400" />;
};
