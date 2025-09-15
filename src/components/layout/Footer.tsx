"use client";

import React from "react";
import "@/styles/footer.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <div
    style={{
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
        position: "relative",
        height: "550px",
        backgroundColor: "black",
      }}
    >
      <div
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          height: "850px",
          color: "black",
        }}
    >
    <div className="main-footer bg-grid-white/[0.01] ">
      <div className="footer-title">
        <h1 className="footer-heading">
          Let&apos;s make it big together !!!
        </h1>
        <Link className="button" href="/">
          <span>Get Started</span>
        </Link>
      </div>
      <div className="footer-content">
        <div className="footer-items">
          <div className="item-left">
           <h1 className="text-white font-bold text-2xl">Mirofy</h1>
            <p>An AI Infrastructure</p>
            <div className="social-links">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="social-links"
              >
                <img
                  src="https://lync.world/app/assets/linkedin.png"
                  alt="linkedin"
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="social-links farcatser"
              >
                <img
                  src="https://lync.world/app/assets/farcatser.svg"
                  alt="farcatser"
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="social-links"
              >
                <img
                  src="https://lync.world/app/assets/twitter.png"
                  alt="twitter"
                />
              </a>
            </div>
          </div>
          <div className="item-middle">
            <div className="middle-content">
              <p className="content-title">Product</p>
              <div className="content-items">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-item text-body-2"
                >
                  Marketplace SDK
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-item text-body-2"
                >
                  Transfer API's
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-item text-body-2"
                >
                  Token API's
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-item text-body-2"
                >
                  NFT API's
                </a>
              </div>
            </div>
            <div className="middle-content">
              <p className="content-title">Company</p>
              <div className="content-items">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-item text-body-2"
                >
                  About us
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-item text-body-2"
                >
                  Careers
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-item text-body-2"
                >
                  Security
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-item text-body-2"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
            <div className="middle-content">
              <p className="content-title">Contact</p>
              <div className="content-items">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-item text-body-2"
                >
                  Email
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-item text-body-2"
                >
                  Discord
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-item text-body-2"
                >
                  Telegram
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-item text-body-2"
                >
                  Press
                </a>
              </div>
            </div>
          </div>
          <div className="item-right">
            <p className="right-title">Supercharge your inbox</p>
            <p className="right-subtext">Sign up for our newsletter</p>
            <form className="email-form">
              <input
                type="email"
                name="email"
                id="emai"
                className="email-form-input"
                placeholder="enter your email address"
              />
              <button
                type="submit"
                className="email-form-submit-btn"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <small className="copyright-text">
          2025 Mirofy ·{" "}
          <a href="" target="_blank" rel="noopener noreferrer">
            Terms of service
          </a>
        </small>
      </div>
      <div className="footer-gredient-container">
        <img
          className="footer-gredient"
          src={"/footer-gradient.png"}
          alt="footerGredient"
        />
      </div>
    </div>
    </div>
    </div>
  );
};

export default Footer;
