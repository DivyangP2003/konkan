import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Your quotes array remains exactly the same
const quotes = [
  { text: 'जिथे सह्याद्री समुद्राला भेटतो, तिथे स्वर्ग उतरतो.', attribution: '' },
  { text: 'Where the Sahyadris lean down to meet the sea, heaven quietly comes ashore.', attribution: '' },
  { text: 'आमचो कोकण म्हणजे देवाभूमी, हांगा दगडांतय देव रवता.', attribution: '' },
  { text: 'कोकणात पावसाक शिव्या घालतत, पण पावसा बगर कोकण न्हय.', attribution: '' },
  { text: 'The monsoon scolds this coast all June — by July, the coast forgives it in green.', attribution: '' },
  { text: 'माड, फणस आनी उलाशी हांगाच्या मातयेचें खरें दैणें.', attribution: '' },
  { text: 'A cashew tree asks the Konkan soil for nothing but stone and sun, and still gives back sweetness.', attribution: '' },
  { text: 'दर्या कधी रिकाम्या हाताने परत पाठवत नाही, फक्त वाट बघायला शिकवतो.', attribution: '' },
  { text: 'जो कोकण बघता, तो परत परत हांगाच येता.', attribution: '' },
  { text: 'The Arabian Sea does not shout here — it simply keeps arriving, every single evening.', attribution: '' },
  { text: 'लाल मातयेत उगवता तें सोनं, आनी सोनं कधी विकत घेवचें ना पडटा.', attribution: '' },
  { text: 'गावात पावसाचो नाद, समुद्राचो गाणं, हेच खरा कोकण.', attribution: '' },
  { text: 'आंब्याच्या राणीक रत्नागिरीशिवाय दुसरो दरबार नाय.', attribution: '' },
  { text: "Every kokum tree along this coast seems to remember somebody's grandmother.", attribution: '' },
  { text: 'कोकणातलो पाऊस म्हणजे रागवलेली आई, रागावता पण उपाशी ठेवना.', attribution: '' },
  { text: 'जित्या माडाची सावली, मेल्या माणसाची जमीन इकत नाय.', attribution: '' },
  { text: 'A house here may be small, but the plate at dinner never is.', attribution: '' },
  { text: 'हांगाची हवा गोड, म्हणून माणसांची भाषाय गोड जाल्या.', attribution: '' },
  { text: 'नारळ फुटल्याबिगर त्याच्यातलें गोड पाणी कोणाक दिसना.', attribution: '' },
  { text: 'The red laterite here looks tired, and still nothing this stubborn ever stops flowering.', attribution: '' },
  { text: 'सड्यावयल्या वाऱ्यान इतिहास सांगलो, कोणी ऐकलो, कोणी विसरलो.', attribution: '' },
  { text: 'कोकणी माणूस गरीब आसात, पण मन दर्यावाणी मोठें आसता.', attribution: '' },
  { text: 'चूल पेटली की शेजारी जेवतोच, हो कोकणचो नियम.', attribution: '' },
  { text: 'A guest who arrives with the tide here never leaves with an empty plate.', attribution: '' },
  { text: 'गणपती बाप्पाक कोकण सोडून कुठंच घर गोड लागना.', attribution: '' },
  { text: 'खाजण्यातलो मासा आनी कोकणी माणूस, दोघांकय मीठ पाणी जिवात असता.', attribution: '' },
  { text: 'जांभ्या दगडातसुद्धा हिरवळ उगवता, हाच कोकणचो हट्टी स्वभाव.', attribution: '' },
  { text: 'हापूस पिकतो तवर वाट बघा, घाई करून गोडवा येना.', attribution: '' },
  { text: 'The road here is never straight, but the people mostly are.', attribution: '' },
  { text: 'समुद्राच्या लाटांगत कोकणी मन, आपटता पण फुटना.', attribution: '' },
];

export function ParallaxDivider() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  const pairCount = Math.ceil(quotes.length / 2);

  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);

    checkScreen();
    window.addEventListener('resize', checkScreen);

    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) =>
        isMobile
          ? (prev + 1) % quotes.length
          : (prev + 1) % pairCount
      );
    }, 6000);

    return () => clearInterval(timer);
  }, [isMobile, pairCount]);

  const leftQuote = isMobile
    ? quotes[index]
    : quotes[(index * 2) % quotes.length];

  const rightQuote = !isMobile
    ? quotes[(index * 2 + 1) % quotes.length]
    : null;

  const QuoteCard = ({ quote, cardKey }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="p-8 md:p-12 border border-primary/20 bg-background/20 backdrop-blur-sm min-h-[260px] md:min-h-[300px] flex flex-col items-center justify-center"
    >
      <AnimatePresence mode="wait">
        <motion.h2
          key={cardKey}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.8 }}
          className="text-xl md:text-3xl lg:text-4xl font-serif text-[#f4ecd8] leading-snug text-center"
        >
          "{quote.text}"
        </motion.h2>
      </AnimatePresence>
    </motion.div>
  );

  return (
    <section
      ref={ref}
      id="culture"
      className="relative overflow-hidden py-24 md:py-32"
    >
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
        <div
          className={`grid gap-6 ${
            isMobile ? 'grid-cols-1' : 'grid-cols-2'
          }`}
        >
          <QuoteCard quote={leftQuote} cardKey={`left-${index}`} />

          {!isMobile && rightQuote && (
            <QuoteCard quote={rightQuote} cardKey={`right-${index}`} />
          )}
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-12">
          {Array.from({
            length: isMobile ? quotes.length : pairCount,
          }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show quote ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: i === index ? 16 : 5,
                height: 3,
                borderRadius: 2,
                border: 'none',
                cursor: 'pointer',
                backgroundColor:
                  i === index
                    ? 'var(--primary, #3a9e6e)'
                    : 'rgba(244,236,216,0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
