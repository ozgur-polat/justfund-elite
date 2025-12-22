
import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    title: "The Consumer Era",
    description: "You've spent years buying their products. iPhones, coffee, cloud services. You've been a spectator to growth.",
    icon: "shopping_bag",
    image: "https://picsum.photos/seed/consumer/800/1200",
    color: "bg-zinc-950"
  },
  {
    title: "The Shift",
    description: "Today, you stop being just a customer. You start owning the companies that define our world.",
    icon: "swap_horiz",
    image: "https://picsum.photos/seed/shift/800/1200",
    color: "bg-primary"
  },
  {
    title: "Elite Intelligence",
    description: "Access the same data institutional traders use, wrapped in an interface designed for the 1%.",
    icon: "diamond",
    image: "https://picsum.photos/seed/elite/800/1200",
    color: "bg-zinc-900"
  }
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const current = steps[step];

  return (
    <div className="relative flex flex-col h-full bg-zinc-950 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={current.image} 
          className="w-full h-full object-cover opacity-40 transition-opacity duration-700" 
          alt="Onboarding"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/40 to-zinc-950"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-8 pb-16 justify-end">
        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-300 ${i === step ? 'w-12 bg-white' : 'w-4 bg-white/20'}`} 
            />
          ))}
        </div>

        <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md mb-6 border border-white/10">
          <span className="material-symbols-outlined text-3xl">{current.icon}</span>
        </div>

        <h1 className="text-4xl font-black tracking-tight mb-4 leading-none">
          {current.title}
        </h1>
        
        <p className="text-lg text-white/70 font-medium mb-12 leading-relaxed max-w-sm">
          {current.description}
        </p>

        <button 
          onClick={next}
          className="w-full h-16 bg-white text-zinc-950 rounded-2xl font-black text-lg transition active:scale-95 shadow-2xl flex items-center justify-center gap-3"
        >
          {step === steps.length - 1 ? "Enter Workspace" : "Continue"}
          <span className="material-symbols-outlined font-bold">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
