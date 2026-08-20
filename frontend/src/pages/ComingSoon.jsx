import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

const ComingSoon = ({ title = 'Pilot Stage Requisition', category = 'Ecosystem Discovery' }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F8FA] text-[#1A1A2E] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 my-12">
        <div className="talentx-card max-w-lg w-full p-8 sm:p-10 bg-white border border-black/[0.08] text-center shadow-md space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5E0ED7]/10 border border-[#5E0ED7]/20 text-[#5E0ED7] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{category}</span>
          </div>

          <h1 className="text-3xl font-extrabold text-[#1A1A2E] tracking-tight">
            {title}
          </h1>

          <p className="text-sm text-[#4B4B56] leading-relaxed">
            This module is being verified in our private prototype pilot. You can explore the live prototype dashboards or review the proof passport system.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-[#1A1A2E] bg-[#F1F1F5] hover:bg-[#E9E9F0] rounded-full transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return Home
            </button>

            <button
              onClick={() => navigate('/auth/login')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs font-semibold text-white bg-[#1A1A2E] hover:bg-[#5E0ED7] rounded-full transition-all shadow-sm"
            >
              Access Prototype Portal
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoon;
export { ComingSoon };
