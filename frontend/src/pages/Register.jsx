import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, UserCheck, Briefcase, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import GlassCard from '../components/common/GlassCard';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('candidate');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = role === 'employer' 
        ? { email, password, companyName } 
        : { email, password, firstName, lastName };
      
      await register(userData, role);
      navigate('/auth/login');
    } catch (error) {
      // Handled in AuthContext toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-page text-ink flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <motion.div
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gold/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full max-w-lg relative z-10"
      >
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 6 }}
              className="w-11 h-11 rounded-2xl bg-cover border border-gold/40 flex items-center justify-center text-gold shadow-md"
            >
              <ShieldCheck className="w-6 h-6" />
            </motion.div>
            <span className="font-extrabold text-2xl tracking-wider font-sans text-cover">
              TALENT<span className="text-gold">X</span>
            </span>
          </Link>
          <h2 className="font-display text-3xl font-bold text-cover tracking-tight">
            Create your Verified Account
          </h2>
          <p className="text-xs text-ink-soft mt-1.5">
            Build your proof-first Talent Passport or discover top engineering capability
          </p>
        </div>

        {/* Register Glass Card */}
        <GlassCard className="p-6 sm:p-8 border-cover/15 shadow-xl bg-white/90 backdrop-blur-xl rounded-3xl">
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Role Selection Toggle */}
            <div>
              <label className="block text-xs font-bold text-cover mb-2 font-sans">
                I am registering as:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setRole('candidate')}
                  className={`p-3 rounded-2xl border flex items-center gap-3 transition-colors cursor-pointer text-left ${
                    role === 'candidate'
                      ? 'bg-cover text-white border-cover shadow-md'
                      : 'bg-white text-ink-soft border-cover/15 hover:border-cover/30'
                  }`}
                >
                  <UserCheck className={`w-5 h-5 shrink-0 ${role === 'candidate' ? 'text-gold' : 'text-ink-soft'}`} />
                  <div>
                    <div className="font-bold text-xs">Talent / Candidate</div>
                    <div className="text-[10px] opacity-75">Build Talent Passport</div>
                  </div>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setRole('employer')}
                  className={`p-3 rounded-2xl border flex items-center gap-3 transition-colors cursor-pointer text-left ${
                    role === 'employer'
                      ? 'bg-cover text-white border-cover shadow-md'
                      : 'bg-white text-ink-soft border-cover/15 hover:border-cover/30'
                  }`}
                >
                  <Briefcase className={`w-5 h-5 shrink-0 ${role === 'employer' ? 'text-gold' : 'text-ink-soft'}`} />
                  <div>
                    <div className="font-bold text-xs">Employer / Team</div>
                    <div className="text-[10px] opacity-75">Discover &amp; Hire</div>
                  </div>
                </motion.button>
              </div>
            </div>

            {role === 'candidate' ? (
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="First Name"
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jane"
                  icon={User}
                  required
                />
                <Input
                  label="Last Name"
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  icon={User}
                  required
                />
              </div>
            ) : (
              <Input
                label="Company Name"
                id="companyName"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="TechCorp Innovations"
                icon={Briefcase}
                required
              />
            )}

            <Input
              label="Email Address"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              icon={Mail}
              required
            />

            <div>
              <Input
                label="Create Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                icon={Lock}
                required
              />
              <p className="text-[10px] text-ink-soft mt-1.5 ml-1">
                Must contain at least 8 chars, 1 uppercase, 1 lowercase, 1 number, and 1 special character.
              </p>
            </div>

            {/* Terms checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-ink-soft">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded border-cover/20 text-cover focus:ring-gold mt-0.5"
                  required
                />
                <span>
                  I agree to the <span className="text-cover font-bold">TALENTX Protocol Terms</span>, Milestone Escrow rules, and Privacy Protection guidelines.
                </span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full mt-3 !py-3 font-bold"
              loading={loading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Create {role === 'candidate' ? 'Candidate Passport' : 'Employer Account'}
            </Button>

          </form>

          <div className="mt-6 pt-4 border-t border-cover/10 text-center text-xs text-ink-soft">
            Already have an account?{' '}
            <Link
              to="/auth/login"
              className="text-gold-dark font-bold hover:text-cover transition-colors"
            >
              Sign in here
            </Link>
          </div>

        </GlassCard>

      </motion.div>

    </div>
  );
};

export default Register;
export { Register };
