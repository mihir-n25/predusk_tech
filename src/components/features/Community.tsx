import React from "react";
import { motion } from "framer-motion";
import "../../styles/community.scss";

const CommunitySection = () => {
  return (
    <div className="main-community bg-grid-white/[0.02] ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "circInOut" }}
        viewport={{ once: true }}
        className="community-circle"
      >
        <div className="gradient-circle"></div>
        <h1 className="circle-heading">
          Strongest AI <br /> <span>Community</span>
        </h1>
        <button>
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                ></path>
              </svg>
            </div>
          </div>
          <span>Join Telegram</span>
        </button>
        <div className="community-img">
          <img src="/community-pattern.png" alt="community" />
        </div>
      </motion.div>
   
    </div>
  );
};

export default CommunitySection;
