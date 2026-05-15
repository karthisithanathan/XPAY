import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Smartphone } from 'lucide-react';
import { OTPInput } from './OTPInput';

export function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      setStep('otp');
    }
  };

  const handleOtpComplete = (value: string) => {
    setOtp(value);
    if (value.length === 4) {
      setTimeout(() => navigate('/home'), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A0B2E]/10 via-transparent to-cyan-500/5" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-cyan-500/20 shadow-2xl shadow-cyan-500/20">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-2xl blur-xl opacity-50" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-white mb-2">
            {step === 'phone' ? 'Welcome Back' : 'Enter OTP'}
          </h2>
          <p className="text-center text-gray-400 mb-8">
            {step === 'phone'
              ? 'Enter your phone number to continue'
              : `We sent a code to +91 ${phone}`}
          </p>

          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Phone Number</label>
                <div className="flex items-center gap-3 backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-white/10">
                  <span className="text-gray-400">+91</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="9876543210"
                    className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={phone.length !== 10}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-600 to-cyan-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/50 transition-all relative overflow-hidden group"
              >
                <span className="relative z-10">Continue</span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-cyan-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <OTPInput length={4} onChange={handleOtpComplete} />

              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Change Number
              </button>

              <button className="w-full text-gray-400 hover:text-white transition-colors">
                Resend OTP
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
