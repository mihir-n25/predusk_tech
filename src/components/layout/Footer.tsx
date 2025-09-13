"use client";
import React, { useState } from "react";

const PostLabsFooter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  const ArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="57"
      height="57"
      viewBox="0 0 57 57"
      fill="none"
    >
      <path
        d="M5.09082 0.823242L50.0605 45.7861L49.667 2.61621L49.665 2.36133L49.9199 2.36426L55.5625 2.42969L55.8076 2.43262L55.8096 2.67773L56.25 55.998L56.252 56.252L55.998 56.25C49.1732 56.1848 39.2577 56.1118 29.3418 56.0303L29.0938 56.0273V56.0107C19.2533 55.93 9.4295 55.8577 2.66113 55.793L2.41699 55.791L2.41309 55.5479L2.32422 49.9463L2.31934 49.6895L2.57617 49.6924C8.9767 49.7576 16.4211 49.815 24.0859 49.8721L34.5908 49.9512L44.9131 50.043L45.791 50.0527L0.823242 5.08984L0.646484 4.91309L0.823242 4.73633L4.7373 0.823242L4.91406 0.646484L5.09082 0.823242Z"
        fill="white"
        stroke="white"
        strokeWidth="0.5"
      />
    </svg>
  );

  return (
    <div
      style={{
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
        position: "relative",
        height: "310px",
        backgroundColor: "black",
      }}
    >
      <div
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          height: "650px",
          color: "black",
        }}
      >
        <footer style={{ backgroundColor: "black", color: "white" }}>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              height: "150px",
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div
              style={{
                position: "absolute",
                whiteSpace: "nowrap",
                willChange: "transform",
                animation: "marquee-horizontal 30s linear infinite",
                display: "flex",
                alignItems: "center",
                gap: "48px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.animationPlayState = "paused";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.animationPlayState = "running";
              }}
            >
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "48px",
                    fontSize: "68px",
                    fontFamily: "Inter Tight, Verdana, sans-serif",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    lineHeight: "200%",
                  }}
                >
                  <span>Ready to Build the Future of Canadian Media?</span>
                  <a
                    href="/contact-us"
                    style={{
                      color: "white",
                      textDecoration: "underline",
                      textDecorationThickness: "2px",
                      textUnderlineOffset: "4px",
                    }}
                  >
                    Contact Us
                  </a>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      flexShrink: 0,
                    }}
                  >
                    <ArrowIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-[1500px] mx-auto px-5 md:pt-24 pt-16 md:pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
              <div className="flex flex-col items-start justify-start">
                <a href="/" className="inline-block mb-16">
                  <svg width="200" height="32" viewBox="0 0 200 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="0" y="24" fill="white" fontSize="32" fontFamily="monospace" fontWeight="400">
                      &lt;/&gt;PostLabs
                    </text>
                  </svg>
                </a>
              </div>

              <div className="flex flex-col md:space-y-12 space-y-6">
                <nav>
                  <ul className="flex flex-col space-y-3">
                    {[
                      { text: "About", href: "/#top" },
                      { text: "Contact", href: "/contact-us" },
                      { text: "Privacy Policy", href: "/privacy-policy" },
                      { text: "Cookie Policy", href: "#" },
                    ].map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.href}
                          className="text-white text-base font-normal opacity-90 hover:opacity-100 transition-opacity duration-200 block"
                          style={{ 
                            fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                            textDecoration: index === 3 ? 'underline' : 'underline'
                          }}
                        >
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="space-y-6">
                  <h2 
                    className="md:text-xl text-lg font-normal text-white m-0"
                    style={{ 
                      fontWeight: "400"
                    }}
                  >
                    Sign Up for Our Newsletter
                  </h2>

                  <form onSubmit={handleSubmit} className="max-w-md">
                    <div className="flex">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="flex-1 my-5 bg-transparent border-b-2 border-white/20 rounded-none text-white text-base placeholder-gray-400 outline-none "
                        style={{ 
                        }}
                      />
                      <button
                        type="submit"
                        className="my-5 bg-transparent border-b-2 border-white/20  text-white hover:bg-white/10 transition-colors duration-200 flex items-center justify-center"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 10h12m-6-6l6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>

                    {isSubmitted && (
                      <div className="mt-3 p-3 bg-green-900/20 border border-green-700 rounded text-green-400 text-sm">
                        Thank you! Your submission has been received!
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 md:mt-10 mt-0 pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div 
                  className="text-sm text-white/60"
                  style={{ 
                  }}
                >
                  2025 Post Labs, Inc. All rights reserved.
                </div>
                <div 
                  className="text-sm text-white/60"
                  style={{ 
                  }}
                >
                  Designed by{" "}
                  <a
                    href="https://gohrvst.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:underline transition-all duration-200"
                  >
                    Mihir Nebani
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;600;700&display=swap');
          
          @keyframes marquee-horizontal {
            from { 
              transform: translateX(0); 
            }
            to { 
              transform: translateX(-50%); 
            }
          }

          ::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }

          @media (max-width: 768px) {
            .footer-grid-mobile {
              grid-template-columns: 1fr !important;
              gap: 48px !important;
            }
            
            .footer-nav-mobile {
              flex-direction: column !important;
              gap: 16px !important;
            }
            
            .footer-marquee-mobile {
              font-size: 32px !important;
            }
            
            .footer-copyright-mobile {
              flex-direction: column !important;
              text-align: center !important;
              gap: 8px !important;
            }
          }

          @media (max-width: 480px) {
            .footer-marquee-mobile {
              font-size: 24px !important;
            }
            
            .footer-form-mobile {
              flex-direction: column !important;
            }
            
            .footer-form-mobile input {
              border-radius: 4px !important;
              border-right: 1px solid rgba(255, 255, 255, 0.2) !important;
            }
            
            .footer-form-mobile button {
              border-radius: 4px !important;
              border-left: 1px solid rgba(255, 255, 255, 0.2) !important;
              border-top: none !important;
            }
          }
        `,
            }}
          />
        </footer>
      </div>
    </div>
  );
};

export default PostLabsFooter;