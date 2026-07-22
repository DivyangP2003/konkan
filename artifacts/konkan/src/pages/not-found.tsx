import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative h-screen overflow-hidden bg-[#090909]">

      {/* Background */}
      <motion.img
        src="https://res.cloudinary.com/wgwu1ii3/image/upload/w_3840/v1784715192/not_found_hywjp8.png"
        alt="Lost in Konkan"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 25,
          ease: "easeOut",
        }}
      />

      {/* Left dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/20" />

      {/* Top fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,.65)_100%)]" />

      {/* Animated fog */}
      <motion.div
        className="absolute bottom-0 left-[-20%] h-72 w-[150%] bg-white/5 blur-[100px]"
        animate={{
          x: [0, -120, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Content */}
      <section className="relative z-20 flex h-full items-center justify-center px-6">
      
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl rounded-3xl bg-black/15 px-10 py-12 text-center backdrop-blur-sm"
        >
      
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-[140px] leading-none tracking-tight text-[#F7E9D2]"
          >
            404
          </motion.h1>
      
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 font-serif text-5xl text-[#F7E9D2]"
          >
            Lost in Konkan?
          </motion.h2>
      
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mx-auto mt-7 max-w-xl text-lg leading-9 text-[#F7E9D2]/80"
          >
            Every memorable journey takes a wrong turn.
            <br />
            The path you followed seems to have disappeared
            <br />
            into the moonlit forests of Konkan.
          </motion.p>
      
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-5"
          >
      
            <Link href="/">
              <button className="group rounded-full bg-[#7A2F27] px-8 py-3 text-[#F7E9D2] transition-all duration-300 hover:bg-[#8F392F] hover:scale-105">
      
                <span className="flex items-center gap-2">
                  Explore Konkan
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
      
              </button>
            </Link>
      
            <button
              onClick={() => window.history.back()}
              className="rounded-full border border-white/20 bg-black/20 px-8 py-3 text-[#F7E9D2]/80 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:text-[#F7E9D2]"
            >
              Go Back
            </button>
      
          </motion.div>
      
        </motion.div>
      
      </section>

    </main>
  );
}
