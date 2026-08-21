import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, ArrowLeft } from 'lucide-react';
import { SpotlightCard } from '../components/react-bits/SpotlightCard';
import { ShinyText } from '../components/react-bits/ShinyText';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#F7F3E8] flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <SpotlightCard className="p-12 text-center flex flex-col items-center border border-cover/10 shadow-2xl bg-white/50 backdrop-blur-xl rounded-[2rem]">
          
          <div className="relative mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 rounded-full border-2 border-dashed border-gold/30 flex items-center justify-center bg-gold/5"
            >
              <Compass className="w-10 h-10 text-gold" />
            </motion.div>
          </div>

          <h1 className="text-7xl font-display font-black text-ink mb-4 tracking-tighter">
            404
          </h1>
          
          <h2 className="text-xl font-display font-bold mb-4">
            <ShinyText text="Lost in the Network" speed={2.5} shineColor="#C7A868" className="!text-cover" />
          </h2>
          
          <p className="text-ink-soft text-sm font-sans mb-10 max-w-xs mx-auto leading-relaxed">
            The opportunity or profile you're looking for has been moved, removed, or never existed on the TALENTX ledger.
          </p>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-ink text-white font-semibold text-sm hover:bg-ink-soft transition-all duration-300 shadow-xl shadow-ink/10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Return to Dashboard
          </Link>

        </SpotlightCard>
      </motion.div>

      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cover/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default NotFound;
