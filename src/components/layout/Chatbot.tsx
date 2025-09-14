"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";

const questionCategories = [
  {
    id: 1,
    title: "Tech Stack Choices",
    icon: "⚡",
    color: "from-blue-500 to-cyan-500",
    questions: [
      {
        question: "Why Next.js over plain React?",
        answer:
          "Next.js is React with superpowers: SSR, SEO, API routes, image optimization, code splitting, and built-in optimizations. Deploying on Vercel is seamless—fast shipping without losing performance.",
      },
      {
        question: "Why TailwindCSS for styling?",
        answer:
          "Life’s too short—Tailwind keeps design fast and consistent. Utility-first classes remove naming overhead, enforce a design language, and make responsive layouts easy.",
      },
      {
        question: "Why Framer Motion for animations?",
        answer:
          "It delivers smooth, controlled transitions without wrestling CSS keyframes. Scroll-linked motion integrates cleanly with components.",
      },
    ],
  },
  {
    id: 2,
    title: "Why Hire Mihir?",
    icon: "🎯",
    color: "from-purple-500 to-pink-500",
    questions: [
      {
        question: "Just a cool frontend developer?",
        answer:
          "Not just frontend—I build scalable backends too, making me a complete full-stack developer.",
      },
      {
        question: "What else do you bring besides full stack?",
        answer:
          "SEO, performance optimization, problem-solving, and a bit of DevOps for smooth deployments.",
      },
      {
        question: "How do you fit into a team?",
        answer:
          "I adapt quickly, communicate clearly, and collaborate to keep projects moving efficiently.",
      },
      {
        question: "How do you approach project timelines?",
        answer:
          "I break work into milestones, set realistic goals, and stay transparent to meet deadlines without sacrificing quality.",
      },
    ],
  },
  {
    id: 3,
    title: "Project Deep Dive",
    icon: "🔧",
    color: "from-green-500 to-teal-500",
    questions: [
      {
        question: "What were the biggest technical challenges?",
        answer:
          "Smooth animations, time constraints, responsiveness, and precise typography. I used prior experience to tackle them systematically.",
      },
      {
        question: "How did you optimize performance?",
        answer:
          "Lazy loading, SSR, SEO practices, reusable components, clear naming, and fewer re-renders kept it lightweight and efficient.",
      },
      {
        question: "What about the user experience design?",
        answer:
          "UX was the top priority. I make sure the design remains consistent, intuitive navigation, and avoided scrolling effects that hurt usability.",
      },
      {
        question: "What according to you lacked behind?",
        answer:
          "Responsiveness , Storybook , dual theme and a bit of chat functionality like mock-apis and all. With more time, I’d refine these to bring it closer to perfect.",
      },
    ],
  },
  {
    id: 4,
    title: "Beyond Coding",
    icon: "✨",
    color: "from-orange-500 to-red-500",
    questions: [
      {
        question: "What else brings value to the table?",
        answer:
          "Problem-solving, clear communication, and a proactive mindset—I deliver solutions aligned with business goals.",
      },
      {
        question: "SEO and Performance - how deep do you go?",
        answer:
          "I focus on Core Web Vitals, efficient rendering, optimized assets, clean architecture, and measurable SEO gains.",
      },
      {
        question: "Any unexpected skills?",
        answer:
          "I’m into fitness. So if the team needs diet or workout tips while debugging… I’ll optimize your macros along with your frontend. 🏋️🥗",
      },
      {
        question: "How do you stay current with tech?",
        answer:
          "By following industry leaders, contributing to projects, and experimenting with new frameworks.",
      },
    ],
  },
];


export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [askedQuestions, setAskedQuestions] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuestionClick = (question: string, answer: string) => {
    const userMessage = {
      id: crypto.randomUUID(),
      text: question,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setAskedQuestions((prev) => new Set([...Array.from(prev), question]));
    setIsLoading(true);
    setTimeout(() => {
      const botMessage = {
        id: crypto.randomUUID() + 1,
        text: answer,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 600);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setMessages([]);
    setAskedQuestions(new Set());
  };

  const getFollowUpQuestions = () => {
    if (!selectedCategory) return [] as { question: string; answer: string }[];
    const category = questionCategories.find((c) => c.id === selectedCategory);
    if (!category) return [] as { question: string; answer: string }[];
    return category.questions.filter((q) => !askedQuestions.has(q.question));
  };

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      if (scrollYProgress.get() === 0) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    }
  });

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[99999] h-14 w-14 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl hover:shadow-2xl transition-all ${visible ? "opacity-100" : "opacity-0"}`}
        aria-label="Open chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6 m-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 12 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98, x: 12 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed z-[99999] bottom-0 right-0 w-full h-full sm:bottom-6 sm:right-6 sm:w-[440px] sm:h-[92vh] bg-white sm:rounded-3xl shadow-2xl border border-gray-100"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 p-5 sm:rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white leading-5">
                      Mihir Nebani
                    </h3>
                    <p className="text-xs text-gray-300">Full‑Stack Developer</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  aria-label="Close chat"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex flex-col h-[calc(100%-5rem)] bg-gray-50 overflow-auto">
              <div className="p-5">
                {messages.length === 0 && selectedCategory === null && (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 mb-3">
                      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">Hey there! 👋</h2>
                    <p className="text-gray-600 max-w-sm mx-auto text-sm leading-relaxed">
                      I'm Mihir's AI assistant. Explore the topics below to see how I design, build, and ship.
                    </p>
                  </div>
                )}

                {messages.length === 0 && selectedCategory === null && (
                  <div className="grid grid-cols-2 gap-4">
                    {questionCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className="w-full p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-left"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-lg shadow-md`}
                          >
                            {category.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-800 text-sm leading-5">
                              {category.title}
                            </h3>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {messages.length === 0 && selectedCategory !== null && (
                  <div className="grid grid-cols-2 gap-4">
                    {questionCategories
                      .find((cat) => cat.id === selectedCategory)
                      ?.questions.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuestionClick(item.question, item.answer)}
                          className="w-full p-4 bg-white rounded-2xl text-left hover:shadow-md transition-shadow border border-gray-100"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mt-0.5">
                              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <p className="text-gray-700 text-sm font-medium leading-relaxed">
                              {item.question}
                            </p>
                          </div>
                        </button>
                      ))}
                  </div>
                )}

                {messages.length > 0 && (
                  <div className="space-y-5">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex max-w-[85%] items-start gap-3 ${
                            message.sender === "user" ? "flex-row-reverse" : ""
                          }`}
                        >
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                              message.sender === "user"
                                ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                                : "bg-gradient-to-br from-gray-600 to-gray-700"
                            }`}
                          >
                            {message.sender === "user" ? (
                              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            ) : (
                              <span className="text-white font-bold text-xs">M</span>
                            )}
                          </div>
                          <div
                            className={`rounded-2xl px-4 py-3 shadow-sm ${
                              message.sender === "user"
                                ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                                : "bg-white text-gray-800 border border-gray-100"
                            }`}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                              {message.text}
                            </p>
                            <span
                              className={`mt-1 block text-[11px] ${
                                message.sender === "user" ? "text-white/80" : "text-gray-400"
                              }`}
                            >
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-gray-700">
                            <span className="text-white font-bold text-xs">M</span>
                          </div>
                          <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
                            <div className="flex gap-1.5">
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full inline-block" />
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full inline-block" />
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full inline-block" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {(selectedCategory !== null || messages.length > 0) && (
                <div className="mt-auto border-t border-gray-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handleBackToCategories}
                      className="flex items-center text-sm text-gray-600 hover:text-indigo-600 font-medium"
                    >
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back to Categories
                    </button>
                  </div>

                  {messages.length > 0 && getFollowUpQuestions().length > 0 && (
                    <div className="pt-4">
                      <h4 className="mb-3 text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        You might also want to know
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {getFollowUpQuestions()
                          .slice(0, 4)
                          .map((item, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuestionClick(item.question, item.answer)}
                              className="w-full rounded-2xl bg-gray-50 hover:bg-gray-100 p-3 text-left text-xs font-medium text-gray-700 transition-colors border border-transparent hover:border-gray-200"
                            >
                              {item.question}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}