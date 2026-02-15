import { useState } from 'react';
import { Mail, Lock, Loader2, Eye, EyeOff, User, ArrowRight, Apple } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

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

      setSuccess('Account created! Please sign in.');
      setIsSignUp(false);
      setPassword('');
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

  // Landing Page View
  if (!showAuthForm) {
    return (
      <div className="min-h-screen bg-[#0A1F13] flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="p-6 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Apple className="w-7 h-7 text-[#22C55E]" />
              <span className="text-xl font-bold text-white">NutriStudent</span>
            </div>
          </header>

          {/* Hero Image */}
          <div className="flex-1 flex items-center justify-center px-6 py-8">
            <div className="relative w-full max-w-sm aspect-square">
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
          <div className="px-6 pb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Eat Smart.
            </h1>
            <h1 className="text-4xl md:text-5xl font-bold text-[#22C55E] mb-6">
              Study Hard.
            </h1>
            <p className="text-[#9CA3AF] text-lg mb-10 max-w-md mx-auto">
              Personalized nutrition for the student lifestyle. Save money, save time, stay healthy.
            </p>

            {/* CTA Buttons */}
            <div className="space-y-4 max-w-sm mx-auto">
              <button
                onClick={() => {
                  setShowAuthForm(true);
                  setIsSignUp(true);
                }}
                className="w-full py-4 px-8 bg-[#22C55E] text-[#052E16] font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-[#4ADE80] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Build Your Plan
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => {
                  setShowAuthForm(true);
                  setIsSignUp(false);
                }}
                className="w-full py-4 px-8 bg-transparent border-2 border-[#2D5A3D] text-white font-medium rounded-full hover:bg-[#1A3625] hover:border-[#22C55E] transition-all"
              >
                I already have an account
              </button>
            </div>

            {/* Social Proof */}
            <div className="mt-10 flex flex-col items-center gap-3">
              <div className="flex items-center">
                <div className="flex -space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-[#0A1F13]"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-[#0A1F13]"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-[#0A1F13]"
                  />
                </div>
                <div className="ml-2 px-3 py-1 bg-[#1A3625] rounded-full">
                  <span className="text-[#22C55E] font-semibold text-sm">+10k</span>
                </div>
              </div>
              <p className="text-[#6B7280] text-sm">Trusted by students worldwide</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Auth Form View
  return (
    <div className="min-h-screen bg-[#0A1F13] flex flex-col">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
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
      <div className="flex-1 flex items-center justify-center p-6">
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
