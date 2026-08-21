import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import GlassCard from '../components/common/GlassCard';
import { AuroraBackground } from '../components/ui/AuroraBackground';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('candidate');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const activeUser = await login(data.email, data.password);
      navigate(`/${(activeUser?.role || role).toLowerCase()}/dashboard`);
    } catch (error) {
      // Handled via toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuroraBackground className="p-4 relative overflow-hidden">
      
      <motion.div
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 15, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gold/15 rounded-full blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full max-w-md relative z-10"
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
            Sign in to your Portal
          </h2>
          <p className="text-xs text-ink-soft mt-1.5">
            Access your verified evidence, invitations, and governed projects
          </p>
        </div>

        {/* Login Glass Card */}
        <GlassCard className="p-6 sm:p-8 border-cover/15 shadow-xl bg-white/90 backdrop-blur-xl rounded-3xl">
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Role Select with Animated Pill */}
            <div>
              <label className="block text-xs font-bold text-cover mb-2 font-sans">
                Portal Role
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-cover/5 border border-cover/10 relative">
                {[
                  { key: 'candidate', label: 'CANDIDATE', email: 'anika@talentx.com', pass: 'anika123' },
                  { key: 'employer', label: 'EMPLOYER', email: 'cranes@gmail.com', pass: 'cranes123' },
                  { key: 'admin', label: 'ADMIN', email: 'admin@talentx.com', pass: 'admin123' }
                ].map((r) => {
                  const isSelected = role === r.key;
                  return (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => {
                        setRole(r.key);
                      }}
                      className={`relative py-2 text-xs font-bold font-mono rounded-lg transition-colors cursor-pointer z-10 ${
                        isSelected ? 'text-white' : 'text-ink-soft hover:text-cover'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="loginRolePill"
                          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                          className="absolute inset-0 bg-cover rounded-lg shadow-sm z-[-1]"
                        />
                      )}
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <Input
              label="Email Address"
              id="email"
              type="email"
              placeholder="user@talentx.com"
              icon={Mail}
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••••••"
              icon={Lock}
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-cover/20 text-cover focus:ring-gold"
                />
                <span className="text-ink-soft">Remember device</span>
              </label>
              <Link
                to="/auth/forgot-password"
                className="text-gold-dark hover:text-cover font-bold transition-colors"
              >
                Forgot password?
              </Link>
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
              Sign In to {role.charAt(0).toUpperCase() + role.slice(1)} Portal
            </Button>

          </form>

          {/* Footer inside card */}
          <div className="mt-6 pt-4 border-t border-cover/10 text-center text-xs text-ink-soft">
            Don't have a Talent Passport yet?{' '}
            <Link
              to="/auth/register"
              className="text-gold-dark font-bold hover:text-cover transition-colors"
            >
              Register here
            </Link>
          </div>

        </GlassCard>

      </motion.div>

    </AuroraBackground>
  );
};

export default Login;
export { Login };
