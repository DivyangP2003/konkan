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
      <section className="relative z-20 flex h-full items-center">

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.9,
          }}
          className="ml-10 max-w-xl md:ml-24 lg:ml-32"
        >

          <div className="mb-6 flex items-center gap-3">

            <div className="h-px w-16 bg-[#D7C3A2]/40" />

            <Compass
              size={18}
              className="text-[#D7C3A2]/70"
            />

            <div className="h-px w-16 bg-[#D7C3A2]/40" />

          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .2 }}
            className="font-serif text-[130px] leading-none tracking-tight text-[#F7E9D2]"
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .35 }}
            className="mt-2 font-serif text-5xl text-[#F7E9D2]"
          >
            Lost in Konkan?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .45 }}
            className="mt-6 max-w-lg text-lg leading-8 text-[#F7E9D2]/75"
          >
            Every memorable journey takes a wrong turn.
            <br />
            The path you followed seems to have disappeared
            into the moonlit forests of Konkan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .55 }}
            className="mt-10 flex flex-wrap gap-5"
          >

            <Link href="/">
              <button className="group flex items-center gap-2 rounded-full bg-[#7B2E25] px-7 py-3 text-[#F7E9D2] transition-all duration-300 hover:bg-[#8D382D]">

                Explore Konkan

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />

              </button>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="rounded-full border border-white/20 bg-black/20 px-7 py-3 text-[#F7E9D2]/80 backdrop-blur-md transition hover:border-white/40 hover:bg-black/35 hover:text-[#F7E9D2]"
            >
              Go Back
            </button>

          </motion.div>

          <div className="mt-14 flex items-center gap-3">

            <div className="h-px w-24 bg-[#D7C3A2]/25" />

            <div className="text-[#D7C3A2]/60">
              ✦
            </div>

            <div className="h-px w-24 bg-[#D7C3A2]/25" />

          </div>

        </motion.div>

      </section>

    </main>
  );
}
