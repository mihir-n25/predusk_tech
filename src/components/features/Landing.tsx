import { motion } from "framer-motion";
import { Cover } from "../ui/Cover";
import { Button } from "../ui/moving-border";
import "../../styles/hero.scss";
import Link from "next/link";
const Landing = () => {
  return (
    <div className="main-home bg-grid-white/[0.06] ">
      <div className="header-gradient-container"></div>
      <motion.div className="home-img">
        <motion.img
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "circInOut" }}
          viewport={{ once: true }}
          src={"/Pattern.png"}
          alt="pattern"
        />
      </motion.div>
      <div className="home-content">
        <h1>
          Exploring the <Cover className="text-black">Future</Cover> <br /> of{" "}
          <span className="span1">AI-Powered Interfaces</span> <br /> Like Never
          Before
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "circInOut" }}
          viewport={{ once: true }}
        >
          Seamlessly blending design and intelligence, <br /> our interface
          redefines how you create,<br /> explore, and collaborate with AI
        </motion.p>
        <Link className="mt-1" href={"/"}>
          <Button
            borderRadius="1.75rem"
            className="text-white dark:text-white border-neutral-200 dark:border-slate-800 font-bold text-xl"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
