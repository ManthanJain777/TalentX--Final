import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, UserCheck, Briefcase, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import GlassCard from '../components/common/GlassCard';
import { AuroraBackground } from '../components/ui/AuroraBackground';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const registerSchema = z.object({
  role: z.enum(['candidate', 'employer']),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  companyName: z.string().optional(),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms and privacy policy' }),
  }),
}).superRefine((data, ctx) => {
  if (data.role === 'candidate') {
    if (!data.firstName || data.firstName.trim() === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'First name is required', path: ['firstName'] });
    }
    if (!data.lastName || data.lastName.trim() === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Last name is required', path: ['lastName'] });
    }
  } else {
    if (!data.companyName || data.companyName.trim() === '') {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Company name is required', path: ['companyName'] });
    }
  }
});

const Register = () => {
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'candidate',
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      password: '',
      agreeTerms: true,
    },
  });

  const role = watch('role');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userData = data.role === 'employer' 
        ? { email: data.email, password: data.password, companyName: data.companyName } 
        : { email: data.email, password: data.password, firstName: data.firstName, lastName: data.lastName };
      
      await authRegister(userData, data.role);
      navigate('/auth/login');
    } catch (error) {
      // Handled in AuthContext toast
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
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gold/15 rounded-full blur-[140px] pointer-events-none z-0"
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
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
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
                  onClick={() => setValue('role', 'candidate', { shouldValidate: true })}
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
                  onClick={() => setValue('role', 'employer', { shouldValidate: true })}
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
                  placeholder="Jane"
                  icon={User}
                  error={errors.firstName?.message}
                  {...register('firstName')}
                />
                <Input
                  label="Last Name"
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  icon={User}
                  error={errors.lastName?.message}
                  {...register('lastName')}
                />
              </div>
            ) : (
              <Input
                label="Company Name"
                id="companyName"
                type="text"
                placeholder="TechCorp Innovations"
                icon={Briefcase}
                error={errors.companyName?.message}
                {...register('companyName')}
              />
            )}

            <Input
              label="Email Address"
              id="email"
              type="email"
              placeholder="you@domain.com"
              icon={Mail}
              error={errors.email?.message}
              {...register('email')}
            />

            <div>
              <Input
                label="Create Password"
                id="password"
                type="password"
                placeholder="Minimum 8 characters"
                icon={Lock}
                error={errors.password?.message}
                {...register('password')}
              />
              {!errors.password && (
                <p className="text-[10px] text-ink-soft mt-1.5 ml-1">
                  Must contain at least 8 chars, 1 uppercase, 1 lowercase, 1 number, and 1 special character.
                </p>
              )}
            </div>

            {/* Terms checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-ink-soft">
                <input
                  type="checkbox"
                  {...register('agreeTerms')}
                  className="rounded border-cover/20 text-cover focus:ring-gold mt-0.5"
                />
                <span>
                  I agree to the <span className="text-cover font-bold">TALENTX Protocol Terms</span>, Milestone Escrow rules, and Privacy Protection guidelines.
                </span>
              </label>
              {errors.agreeTerms && <p className="text-[10px] text-risk mt-1 ml-6">{errors.agreeTerms.message}</p>}
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

    </AuroraBackground>
  );
};

export default Register;
export { Register };
