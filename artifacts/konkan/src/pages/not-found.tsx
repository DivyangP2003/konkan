import { Link } from "wouter";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex h-screen overflow-hidden bg-[#120606] text-[#f6e8d5]">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#3b1414_0%,#120606_70%)]" />

      {/* Glow */}
      <motion.div
        animate={{
          opacity: [0.25, 0.45, 0.25],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8d3b32]/20 blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center px-6 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.07, y: 0 }}
          className="text-[180px] font-serif leading-none tracking-tight"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .2 }}
          className="mt-4 text-5xl font-serif"
        >
          Lost in Konkan?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: .75 }}
          transition={{ delay: .35 }}
          className="mt-6 max-w-xl text-lg leading-8"
        >
          Every memorable journey takes a wrong turn.
          <br />
          Let's find your way back to hidden beaches,
          ancient forts, and timeless villages.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .45 }}
          className="mt-10 flex gap-4"
        >
          <Link href="/">
            <button className="group flex items-center gap-2 rounded-full bg-[#8d3b32] px-7 py-3 font-medium transition hover:bg-[#a2453a]">
              <Compass
                size={18}
                className="transition group-hover:rotate-90"
              />
              Explore Konkan
            </button>
          </Link>

          <button
            onClick={() => history.back()}
            className="rounded-full border border-[#f6e8d5]/20 px-7 py-3 transition hover:bg-white/5"
          >
            Go Back
          </button>
        </motion.div>

      </div>

      {/* Mountains */}
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1440 260"
        preserveAspectRatio="none"
      >
        <path
          fill="#1a0909"
          d="M0 260L170 110L310 200L520 60L720 210L900 100L1110 190L1280 70L1440 170V260H0Z"
        />
      </svg>

    </div>
  );
}
