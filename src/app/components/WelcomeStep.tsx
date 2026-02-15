import { ChefHat, BookOpen, Briefcase, Dumbbell, ArrowRight, Apple, Sparkles, X } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
  onBack?: () => void;
}

export function WelcomeStep({ onNext, onBack }: WelcomeStepProps) {
  return (
    <div className="min-h-screen bg-[#0A1F13] flex flex-col items-center justify-center px-6 py-12 relative">
      {/* Close/Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#142A1D] border border-[#2D5A3D] text-[#9CA3AF] hover:text-white hover:border-[#22C55E] transition-all"
          aria-label="Go back"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Apple className="w-8 h-8 text-[#22C55E]" />
          <span className="text-2xl font-bold text-white">NutriStudent</span>
        </div>

        {/* Hero Icon */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-3xl flex items-center justify-center shadow-lg shadow-[#22C55E]/20">
            <ChefHat className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#22C55E] rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="w-4 h-4 text-[#052E16]" />
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-3">
          Student Nutrition
        </h1>
        <h2 className="text-4xl font-bold text-[#22C55E] mb-6">
          Assistant
        </h2>
        
        {/* Description */}
        <p className="text-[#9CA3AF] text-lg mb-10 leading-relaxed">
          Smart nutrition planning designed for students, recommending healthy and delicious meal plans based on your lifestyle and budget
        </p>
        
        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#142A1D] rounded-full border border-[#2D5A3D]">
            <BookOpen className="w-5 h-5 text-[#22C55E]" />
            <span className="text-white text-sm font-medium">Study Focus</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#142A1D] rounded-full border border-[#2D5A3D]">
            <Briefcase className="w-5 h-5 text-[#22C55E]" />
            <span className="text-white text-sm font-medium">Work Energy</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#142A1D] rounded-full border border-[#2D5A3D]">
            <Dumbbell className="w-5 h-5 text-[#22C55E]" />
            <span className="text-white text-sm font-medium">Fitness Goals</span>
          </div>
        </div>
        
        {/* CTA Button */}
        <button
          onClick={onNext}
          className="w-full py-4 px-8 bg-[#22C55E] text-[#052E16] font-semibold rounded-full flex items-center justify-center gap-3 hover:bg-[#4ADE80] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#22C55E]/20"
        >
          Start Planning My Nutrition
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Secondary text */}
        <p className="text-[#6B7280] text-sm mt-6">
          Takes less than 2 minutes to set up
        </p>
      </div>
    </div>
  );
}
