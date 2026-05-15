import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ChevronRight, Brain, Shield, Globe, Zap } from 'lucide-react';

export function Onboarding() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Brain,
      title: 'AI Banking',
      description: 'Smart insights powered by AI that help you save more and spend wisely',
      gradient: 'from-cyan-500 to-violet-600',
    },
    {
      icon: Shield,
      title: 'Quantum Security',
      description: 'Military-grade encryption with biometric authentication for ultimate protection',
      gradient: 'from-violet-600 to-cyan-500',
    },
    {
      icon: Globe,
      title: 'Instant Global Pay',
      description: 'Send money anywhere in the world instantly with zero fees',
      gradient: 'from-cyan-400 to-violet-500',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Payments complete in milliseconds. Experience the future of banking',
      gradient: 'from-violet-500 to-cyan-400',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/language');
    }
  };

  const handleSkip = () => {
    navigate('/language');
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 flex-1 flex flex-col p-6">
        <div className="flex justify-between items-center mb-12">
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all ${
                  index === currentSlide ? 'w-8 bg-cyan-500' : 'w-4 bg-white/20'
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Skip
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} rounded-3xl blur-3xl opacity-50`} />
            <div className={`relative p-12 rounded-3xl bg-gradient-to-br ${slide.gradient}`}>
              <slide.icon className="w-24 h-24 text-white" />
            </div>
          </motion.div>

          <motion.div
            key={`text-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center space-y-4 max-w-sm"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              {slide.title}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              {slide.description}
            </p>
          </motion.div>
        </div>

        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-600 to-cyan-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          <span>{currentSlide === slides.length - 1 ? 'Get Started' : 'Continue'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
