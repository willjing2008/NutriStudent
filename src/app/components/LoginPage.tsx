import React, { useEffect, useState, useRef } from 'react';
import { Mail, Lock, Loader2, Eye, EyeOff, User, ArrowRight, Apple, Check } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { authedPost } from '../utils/apiClient';
import { SchoolSelectionStep } from './SchoolSelectionStep';
import { SubscriptionPage } from './SubscriptionPage';
import { useSubscription } from '../hooks/useSubscription';
import { Gender } from '../utils/nutritionTargets';

interface LoginPageProps {
  onLoginSuccess: (user: any, accessToken: string) => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [signedUpUserId, setSignedUpUserId] = useState<string | null>(null);
  const [showGenderStep, setShowGenderStep] = useState(false);
  const [selectedGender, setSelectedGender] = useState<Gender>(null);
  const [showSignupPaywall, setShowSignupPaywall] = useState(false);

  const { isPro, identify: rcIdentify } = useSubscription();
  const autoLoginTriggeredRef = useRef(false);

  useEffect(() => {
    if (showAuthForm) return;

    const prevOverflow = document.body.style.overflow;
    const prevOverscrollY = document.body.style.overscrollBehaviorY;
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehaviorY = 'none';

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.overscrollBehaviorY = prevOverscrollY;
    };
  }, [showAuthForm]);

  // Auto-login when isPro flips to true during signup paywall
  useEffect(() => {
    if (!showSignupPaywall || !signedUpUserId || !isPro || autoLoginTriggeredRef.current) return;
    autoLoginTriggeredRef.current = true;

    (async () => {
      try {
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError || !data.session) {
          console.error('Auto-login failed:', loginError);
          setError('Subscription successful! Please sign in manually.');
          setShowSignupPaywall(false);
          setSignedUpUserId(null);
          setIsSignUp(false);
          return;
        }

        onLoginSuccess(data.user, data.session.access_token);
      } catch (err) {
        console.error('Auto-login error:', err);
        setError('Subscription successful! Please sign in manually.');
        setShowSignupPaywall(false);
        setSignedUpUserId(null);
        setIsSignUp(false);
      }
    })();
  }, [isPro, showSignupPaywall, signedUpUserId, email, password, onLoginSuccess]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dbaf6019/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email, password, name }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      setSignedUpUserId(data.user.id);
    } catch (err: any) {
      console.error('Sign up error:', err);
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        throw loginError;
      }

      if (!data.session) {
        throw new Error('No session returned');
      }

      onLoginSuccess(data.user, data.session.access_token);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Signup Paywall (after gender selection)
  if (showSignupPaywall && signedUpUserId) {
    return (
      <SubscriptionPage mandatory />
    );
  }

  // Gender Selection (after school selection)
  if (showGenderStep && signedUpUserId) {
    return (
      <GenderSelectionStep
        userId={signedUpUserId}
        selectedGender={selectedGender}
        onSelectGender={setSelectedGender}
        onComplete={async () => {
          // Identify the new user with RevenueCat before showing paywall
          try {
            await rcIdentify(signedUpUserId);
          } catch (err) {
            console.error('RevenueCat identify failed:', err);
          }
          setShowSignupPaywall(true);
        }}
      />
    );
  }

  // School Selection (after signup)
  if (signedUpUserId) {
    return (
      <SchoolSelectionStep
        userId={signedUpUserId}
        onComplete={() => {
          setShowGenderStep(true);
        }}
      />
    );
  }

  // Landing Page View
  if (!showAuthForm) {
    return (
      <div
        className="bg-[#0A1F13] flex flex-col overflow-hidden overscroll-none"
        style={{
          height: 'calc(100dvh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px))',
          maxHeight: 'calc(100dvh - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px))',
        }}
      >
        {/* Hero Section */}
        <div className="flex-1 min-h-0 flex flex-col justify-start">
          {/* Hero Image */}
          <div className="min-h-0 flex items-center justify-center px-6 pt-2 pb-0.5">
            <div
              className="relative"
              style={{
                width: 'min(74vw, 44vh, 22rem)',
                height: 'min(74vw, 44vh, 22rem)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop&auto=format"
                alt="Healthy bowl"
                className="w-full h-full object-cover rounded-full shadow-2xl"
                style={{ boxShadow: '0 25px 80px rgba(34, 197, 94, 0.2)' }}
              />
              {/* Decorative glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#0A1F13] via-transparent to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pt-1 pb-5 text-center shrink-0">
            <h1 className="text-[clamp(2.25rem,8.4vw,3.35rem)] leading-tight font-bold text-white mb-1">
              Eat Smart.
            </h1>
            <h1 className="text-[clamp(2.25rem,8.4vw,3.35rem)] leading-tight font-bold text-[#22C55E] mb-4">
              Study Hard.
            </h1>
            <p className="text-[#9CA3AF] text-[clamp(1rem,4.1vw,1.2rem)] mb-6 max-w-md mx-auto">
              Personalized nutrition for the student lifestyle.
            </p>

            {/* CTA Buttons */}
            <div className="space-y-3.5 max-w-sm mx-auto">
              <button
                onClick={() => {
                  setShowAuthForm(true);
                  setIsSignUp(true);
                }}
                className="w-full py-3.5 px-8 bg-[#22C55E] text-[#052E16] font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-[#4ADE80] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Build Your Plan
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => {
                  setShowAuthForm(true);
                  setIsSignUp(false);
                }}
                className="w-full py-3.5 px-8 bg-transparent border-2 border-[#2D5A3D] text-white font-medium rounded-full hover:bg-[#1A3625] hover:border-[#22C55E] transition-all"
              >
                I already have an account
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Auth Form View
  return (
    <div
      className="min-h-screen bg-[#0A1F13] flex flex-col"
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {/* Header */}
      <header className="px-6 pt-5 pb-3 flex items-center justify-between">
        <button
          onClick={() => setShowAuthForm(false)}
          className="text-[#9CA3AF] hover:text-white transition-colors flex items-center gap-2"
        >
          <span className="text-xl">←</span>
          Back
        </button>
        <div className="flex items-center gap-2">
          <Apple className="w-6 h-6 text-[#22C55E]" />
          <span className="text-lg font-bold text-white">NutriStudent</span>
        </div>
        <div className="w-16" /> {/* Spacer for centering */}
      </header>

      {/* Form Container */}
      <div className="flex-1 flex items-center justify-center px-6 py-8 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-[#9CA3AF]">
              {isSignUp 
                ? 'Start your personalized nutrition journey' 
                : 'Sign in to continue your nutrition plan'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-[#142A1D] rounded-full p-1 mb-8">
            <button
              onClick={() => {
                setIsSignUp(false);
                setError(null);
                setSuccess(null);
              }}
              className={`flex-1 py-3 px-6 rounded-full font-medium transition-all ${
                !isSignUp
                  ? 'bg-[#22C55E] text-[#052E16]'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsSignUp(true);
                setError(null);
                setSuccess(null);
              }}
              className={`flex-1 py-3 px-6 rounded-full font-medium transition-all ${
                isSignUp
                  ? 'bg-[#22C55E] text-[#052E16]'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-5">
            {/* Success Message */}
            {success && (
              <div className="p-4 bg-[#052E16] border border-[#22C55E] rounded-xl text-[#22C55E] text-sm flex items-center gap-2">
                <span className="text-lg">✓</span>
                {success}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2">
                <span className="text-lg">⚠</span>
                {error}
              </div>
            )}

            {/* Name Field (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-12 pr-4 py-4 bg-[#142A1D] border border-[#2D5A3D] rounded-xl text-white placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.ac.uk"
                  className="w-full pl-12 pr-4 py-4 bg-[#142A1D] border border-[#2D5A3D] rounded-xl text-white placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isSignUp ? 'Create a strong password' : 'Enter your password'}
                  className="w-full pl-12 pr-12 py-4 bg-[#142A1D] border border-[#2D5A3D] rounded-xl text-white placeholder-[#6B7280] focus:outline-none focus:border-[#22C55E] transition-colors"
                  required
                  minLength={isSignUp ? 6 : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#6B7280] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {isSignUp && (
                <p className="text-xs text-[#6B7280] mt-2">
                  Minimum 6 characters
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-8 bg-[#22C55E] text-[#052E16] font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-[#4ADE80] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {isSignUp ? 'Creating Account...' : 'Signing In...'}
                </>
              ) : (
                <>
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-[#6B7280] text-sm">
              {isSignUp ? (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => {
                      setIsSignUp(false);
                      setError(null);
                      setSuccess(null);
                    }}
                    className="text-[#22C55E] font-medium hover:underline"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={() => {
                      setIsSignUp(true);
                      setError(null);
                      setSuccess(null);
                    }}
                    className="text-[#22C55E] font-medium hover:underline"
                  >
                    Create one
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const GENDER_OPTIONS: { id: Gender; name: string }[] = [
  { id: 'male', name: 'Male' },
  { id: 'female', name: 'Female' },
  { id: 'decline', name: 'Decline to Answer' },
];

function GenderSelectionStep({
  userId,
  selectedGender,
  onSelectGender,
  onComplete,
}: {
  userId: string;
  selectedGender: Gender;
  onSelectGender: (g: Gender) => void;
  onComplete: () => void;
}) {
  const [saving, setSaving] = useState(false);

  const handleContinue = async () => {
    setSaving(true);
    try {
      // Save gender to user_metadata if selected
      if (selectedGender) {
        await authedPost('auth/update-profile', { userId, gender: selectedGender });
      }
      onComplete();
    } catch (err) {
      console.error('Failed to save gender:', err);
      onComplete(); // Continue even if save fails
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1F13] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#22C55E]/20 flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-[#22C55E]" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Select Your Gender
        </h1>
        <p className="text-[#9CA3AF] text-sm">
          This helps us set your daily nutrition targets.
        </p>
      </div>

      {/* Options */}
      <div className="flex-1 px-6">
        <div className="max-w-md mx-auto space-y-3">
          {GENDER_OPTIONS.map((option) => {
            const isSelected = selectedGender === option.id;
            return (
              <button
                key={option.id}
                onClick={() => onSelectGender(option.id)}
                className={`w-full p-4 rounded-xl transition-all flex items-center ${
                  isSelected
                    ? 'bg-[#22C55E]/20 border-2 border-[#22C55E]'
                    : 'bg-[#142A1D] border border-[#2D5A3D] hover:border-[#22C55E]'
                }`}
              >
                <div className="flex-1 text-left">
                  <div className={`font-semibold ${isSelected ? 'text-[#22C55E]' : 'text-white'}`}>
                    {option.name}
                  </div>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#22C55E] flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#052E16]" />
                  </div>
                )}
              </button>
            );
          })}

          <p className="text-[#6B7280] text-xs text-center pt-2">
            This is optional. You can change this later in your profile.
          </p>
        </div>
      </div>

      {/* Continue Button */}
      <div className="px-6 pb-10 pt-6">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleContinue}
            disabled={saving}
            className="w-full py-4 px-8 bg-[#22C55E] text-[#052E16] font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-[#4ADE80] transition-all disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
