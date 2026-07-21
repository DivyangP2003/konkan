import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// ── Voices of the coast ──────────────────────────────────────────────────
// Original lines written in the spirit of Konkani/Malvani/Marathi coastal
// folk sayings — celebrating the land, the sea, the monsoon and the people
// of Konkan. Kept in the original language on purpose so the rhythm stays
// intact. No attribution needed; these are written fresh, not quoted from
// any real source.
const quotes = [
  { text: 'जिथे सह्याद्री समुद्राला भेटतो, तिथे स्वर्ग उतरतो.', attribution: '' },
  { text: 'Where the Sahyadris lean down to meet the sea, heaven quietly comes ashore.', attribution: '' },
  { text: 'आमचो कोकण म्हणजे देवाभूमी, हांगा दगडांतय देव रवता.', attribution: '' },
  { text: 'Dor ghara mukhar ek maad, dor kalzant ek dorya.', attribution: '' },
  { text: 'कोकणात पावसाक शिव्या घालतत, पण पावसा बगर कोकण न्हय.', attribution: '' },
  { text: 'The monsoon scolds this coast all June — by July, the coast forgives it in green.', attribution: '' },
  { text: 'माड, फणस आनी उलाशी हांगाच्या मातयेचें खरें दैणें.', attribution: '' },
  { text: 'A cashew tree asks the Konkan soil for nothing but stone and sun, and still gives back sweetness.', attribution: '' },
  { text: 'दर्या कधी रिकाम्या हाताने परत पाठवत नाही, फक्त वाट बघायला शिकवतो.', attribution: '' },
  { text: 'Konkani manis dukh lipoita, pun tache dolyantlo uzo kednanch lipona.', attribution: '' },
  { text: 'जो कोकण बघता, तो परत परत हांगाच येता.', attribution: '' },
  { text: 'The Arabian Sea does not shout here — it simply keeps arriving, every single evening.', attribution: '' },
  { text: 'लाल मातयेत उगवता तें सोनं, आनी सोनं कधी विकत घेवचें ना पडटा.', attribution: '' },
  { text: 'गावात पावसाचो नाद, समुद्राचो गाणं, हेच खरा कोकण.', attribution: '' },
  { text: 'आंब्याच्या राणीक रत्नागिरीशिवाय दुसरो दरबार नाय.', attribution: '' },
  { text: 'Every kokum tree along this coast seems to remember somebody\'s grandmother.', attribution: '' },
  { text: 'कोकणातलो पाऊस म्हणजे रागवलेली आई, रागावता पण उपाशी ठेवना.', attribution: '' },
  { text: 'Amchi bhas thoddi khadkhadit, pun kalliz matnem mêllim.', attribution: '' },
  { text: 'जित्या माडाची सावली, मेल्या माणसाची जमीन इकत नाय.', attribution: '' },
  { text: 'A house here may be small, but the plate at dinner never is.', attribution: '' },
  { text: 'हांगाची हवा गोड, म्हणून माणसांची भाषाय गोड जाल्या.', attribution: '' },
  { text: 'नारळ फुटल्याबिगर त्याच्यातलें गोड पाणी कोणाक दिसना.', attribution: '' },
  { text: 'The red laterite here looks tired, and still nothing this stubborn ever stops flowering.', attribution: '' },
  { text: 'सड्यावयल्या वाऱ्यान इतिहास सांगलो, कोणी ऐकलो, कोणी विसरलो.', attribution: '' },
  { text: 'Voros bhorlem tori dorya voir ievpi taranga zaven naka.', attribution: '' },
  { text: 'कोकणी माणूस गरीब आसात, पण मन दर्यावाणी मोठें आसता.', attribution: '' },
  { text: 'चूल पेटली की शेजारी जेवतोच, हो कोकणचो नियम.', attribution: '' },
  { text: 'A guest who arrives with the tide here never leaves with an empty plate.', attribution: '' },
  { text: 'गणपती बाप्पाक कोकण सोडून कुठंच घर गोड लागना.', attribution: '' },
  { text: 'खाजण्यातलो मासा आनी कोकणी माणूस, दोघांकय मीठ पाणी जिवात असता.', attribution: '' },
  { text: 'जांभ्या दगडातसुद्धा हिरवळ उगवता, हाच कोकणचो हट्टी स्वभाव.', attribution: '' },
  { text: 'Kortoleo, tendleo ani sonneak — ekuch bhaji, tin ganvancheo naanv.', attribution: '' },
  { text: 'हापूस पिकतो तवर वाट बघा, घाई करून गोडवा येना.', attribution: '' },
  { text: 'The road here is never straight, but the people mostly are.', attribution: '' },
  { text: 'समुद्राच्या लाटांगत कोकणी मन, आपटता पण फुटना.', attribution: '' },
];

export function ParallaxDivider() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const pairCount = Math.ceil(quotes.length / 2);
  const [pairIndex, setPairIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPairIndex(i => (i + 1) % pairCount);
    }, 6000);
    return () => clearInterval(timer);
  }, [pairCount]);

  const leftQuote = quotes[(pairIndex * 2) % quotes.length];
  const rightQuote = quotes[(pairIndex * 2 + 1) % quotes.length];

  const QuoteCard = ({ quote, cardKey }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="p-8 md:p-12 border border-primary/20 bg-background/20 backdrop-blur-sm min-h-[260px] md:min-h-[280px] flex flex-col items-center justify-center"
    >
      <AnimatePresence mode="wait">
        <motion.h2
          key={cardKey}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-xl md:text-3xl lg:text-4xl font-serif text-[#f4ecd8] leading-snug text-center"
        >
          "{quote.text}"
        </motion.h2>
      </AnimatePresence>

      {quote.attribution && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="w-8 h-[1px] bg-primary" />
          <AnimatePresence mode="wait">
            <motion.p
              key={`attr-${cardKey}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-primary font-sans tracking-[0.2em] uppercase text-xs font-bold"
            >
              {quote.attribution}
            </motion.p>
          </AnimatePresence>
          <div className="w-8 h-[1px] bg-primary" />
        </div>
      )}
    </motion.div>
  );

  return (
    <section ref={ref} id="culture" className="relative min-h-[70vh] md:min-h-[90vh] overflow-hidden flex items-center justify-center py-16">
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0 scale-[1.2]"
      >
        <img
          src="/src/assets/waterfall-forest.jpg"
          alt="Konkan Forest"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background opacity-80" />
      </motion.div>

      <div className="relative z-10 px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <QuoteCard quote={leftQuote} cardKey={`left-${pairIndex}`} />
          <QuoteCard quote={rightQuote} cardKey={`right-${pairIndex}`} />
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {Array.from({ length: pairCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPairIndex(i)}
              aria-label={`Show quote pair ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: i === pairIndex ? 16 : 5,
                height: 3,
                borderRadius: 1.5,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: i === pairIndex ? 'var(--primary, #3a9e6e)' : 'rgba(244,236,216,0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
