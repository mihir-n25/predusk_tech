import React from 'react'
import { motion } from 'framer-motion'
import "../../styles/cards-section.scss";


const CardSections = () => {
  return (
    <div className='cardsections-main bg-grid-white/[0.01]'>
      <div className="gradient-cards"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "circInOut" }}
        viewport={{ once: true }}
        className="power-card">
        <div className="power-content">
          <h1 className="power-card-title">Simplify AI Chatbot <span>Development</span></h1>
          <ul className='power-point-list'>
            <li className='power-point-item'>Reduce months of integration into just days</li>
            <li className='power-point-item'>Focus entirely on user experience and product logic</li>
            <li className='power-point-item'>Cut down high costs of model deployment & infrastructure</li>
            <li className='power-point-item'>Deploy across platforms with minimal setup</li>
          </ul>
        </div>
        <div className="power-img">
          {/* <img src={"/ai.gif"} alt=""/ /> */}
        </div>
      </motion.div>
      <div className="project-done">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "circInOut" }}
          viewport={{ once: true }}
          className="project-docs">
          <div className="docs-content">
          <h1>
  Power Up Your Games <br /> with Smarter AI!
</h1>
<p>
  Unlock game-ready AI tools, <br /> explore our documentation, <br /> and start creating next-level play.
</p>
            <button>View Docs</button>
          </div>
          <div className="remote-img">
            <img src="/game-animation.gif" alt="" />
          </div>
        </motion.div>
        <div className="reach-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "circInOut" }}
            viewport={{ once: true }}
            className="contracts">
            <div className="contracts-box">
              <h1>500+</h1>
              <p>Chatbot projects <br /> built using our <br /> AI toolkit</p>
            </div>
            <div className="contracts-box">
              <h1>10K+</h1>
              <p>Conversations <br /> powered daily <br /> by our system</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "circInOut" }}
            viewport={{ once: true }}
            className="user-ops">
            <div className="ops-content">
              <h1>100K+</h1>
              <p>Messages processed <br /> in under 24 hours</p>
              <div className="medium-img">
                <img src={"/ai.gif"} alt="" />
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}

export default CardSections
