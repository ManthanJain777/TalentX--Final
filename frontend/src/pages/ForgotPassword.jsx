import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Mail, CheckCircle2 } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import GlassCard from '../components/common/GlassCard';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-page text-ink flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      {/* Ambient Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <div className="w-10 h-10 rounded-xl bg-cover border border-gold/40 flex items-center justify-center text-gold shadow-md group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-2xl tracking-wider font-sans text-cover">
              TALENTX
            </span>
          </Link>
          <h2 className="font-display text-2xl font-bold text-cover tracking-tight">
            Reset Passport Key
          </h2>
          <p className="text-xs text-ink-soft mt-1">
            Enter your registered email to receive cryptographic password recovery instructions
          </p>
        </div>

        {/* Form Card */}
        <GlassCard className="p-6 sm:p-8 border-cover/15 shadow-xl bg-white/85">
          
          {submitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-verified/15 text-verified border border-verified/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-cover">
                Recovery Link Dispatched
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                We have sent an authentication recovery link to <span className="font-mono font-bold text-ink">{email}</span>. Check your inbox and follow the steps.
              </p>
              <Link to="/auth/login" className="btn-primary w-full inline-flex text-xs py-2.5">
                Return to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Registered Email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                icon={Mail}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full mt-2"
                loading={loading}
                icon={ArrowRight}
                iconPosition="right"
              >
                Send Reset Instructions
              </Button>

              <div className="pt-2 text-center text-xs">
                <Link
                  to="/auth/login"
                  className="text-gold-dark font-bold hover:text-cover transition-colors"
                >
                  &larr; Back to Sign In
                </Link>
              </div>
            </form>
          )}

        </GlassCard>

      </div>

    </div>
  );
};

export default ForgotPassword;
export { ForgotPassword };
