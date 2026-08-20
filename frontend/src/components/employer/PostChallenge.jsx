import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import ChallengeForm from '../challenges/ChallengeForm';

const PostChallenge = () => {
  const [published, setPublished] = useState(false);
  const navigate = useNavigate();

  const handlePublish = () => {
    setPublished(true);
  };

  if (published) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-2 p-12 text-center flex flex-col items-center border-verified/30">
          <div className="w-20 h-20 rounded-full bg-verified/10 text-verified flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(29,138,95,0.3)]">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-display font-bold text-ink mb-4">Challenge Published</h1>
          <p className="text-lg text-ink-soft mb-8 max-w-md mx-auto">
            Your challenge is now live. We're matching it with top verified talent. You'll be notified when submissions arrive.
          </p>
          <div className="flex gap-4">
            <button onClick={() => navigate('/employer/challenges')} className="px-6 py-3 rounded-xl border border-ink/10 text-ink font-medium hover:bg-white/50 transition-colors">
              Manage Challenges
            </button>
            <button onClick={() => setPublished(false)} className="px-6 py-3 rounded-xl bg-gold text-white font-medium hover:bg-gold-soft transition-colors shadow-lg shadow-gold/20">
              Post Another
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/employer/challenges" className="p-2 hover:bg-white/50 rounded-full transition-colors text-ink-soft">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="text-sm font-mono text-ink-faint">Back to Dashboard</span>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-ink">Post a Challenge</h1>
        <p className="text-ink-soft mt-2">Find verified talent fast through paid micro-tasks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ChallengeForm />
          
          <div className="flex gap-4 justify-end">
            <button className="px-6 py-2.5 rounded-xl border border-ink/10 text-ink font-medium hover:bg-white/50 transition-colors">
              Save as Draft
            </button>
            <button 
              onClick={handlePublish}
              className="px-8 py-2.5 rounded-xl bg-gold text-white font-medium hover:bg-gold-soft transition-colors shadow-lg shadow-gold/20"
            >
              Publish Challenge
            </button>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Live Preview could go here */}
          <div className="glass-2 p-6 bg-gold/5 border-gold/20">
            <h3 className="font-display font-semibold text-lg text-gold mb-2">How it works</h3>
            <ul className="space-y-4 text-sm text-ink-soft mt-4">
              <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0 text-xs font-bold">1</span> Define a small task ($100-$500)</li>
              <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0 text-xs font-bold">2</span> TALENTX invites 3 top matches</li>
              <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0 text-xs font-bold">3</span> Candidates submit in 48 hours</li>
              <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0 text-xs font-bold">4</span> You pick the winner</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostChallenge;
