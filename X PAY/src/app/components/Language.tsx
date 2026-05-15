import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { Search, Globe, Check, ChevronRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Language() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, currency, setLanguage, setCurrency } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [selectedCurrency, setSelectedCurrency] = useState(currency);

  const suggestedLanguages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  ];

  const allLanguages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'ar', name: 'Arabic', native: 'العربية' },
    { code: 'es', name: 'Spanish', native: 'Español' },
    { code: 'fr', name: 'French', native: 'Français' },
    { code: 'de', name: 'German', native: 'Deutsch' },
    { code: 'ja', name: 'Japanese', native: '日本語' },
    { code: 'ko', name: 'Korean', native: '한국어' },
    { code: 'zh', name: 'Chinese', native: '中文' },
  ];

  const currencies = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  ];

  const filteredLanguages = allLanguages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.native.includes(searchQuery)
  );

  const fromSettings = location.state?.fromSettings;

  const handleContinue = () => {
    setLanguage(selectedLanguage);
    setCurrency(selectedCurrency);

    if (fromSettings) {
      navigate('/profile');
    } else {
      navigate('/permissions');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 p-6 space-y-6">
        <div className="flex items-center gap-4 mb-8">
          {fromSettings && (
            <button
              onClick={() => navigate('/profile')}
              className="p-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
          )}
          <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Choose Language</h1>
            <p className="text-gray-400">Select your preferred language</p>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search languages..."
              className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm text-gray-400 font-medium">Suggested</h3>
          <div className="grid grid-cols-2 gap-3">
            {suggestedLanguages.map((lang, index) => (
              <motion.button
                key={lang.code}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedLanguage(lang.name)}
                className={`p-4 rounded-2xl backdrop-blur-xl border transition-all ${
                  selectedLanguage === lang.name
                    ? 'bg-cyan-500/20 border-cyan-500'
                    : 'bg-white/5 border-white/10'
                } flex items-center justify-between`}
              >
                <div className="text-left">
                  <p className="font-medium text-white">{lang.name}</p>
                  <p className="text-sm text-gray-400">{lang.native}</p>
                </div>
                {selectedLanguage === lang.name && (
                  <Check className="w-5 h-5 text-cyan-400" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm text-gray-400 font-medium">All Languages</h3>
          <div className="max-h-64 overflow-y-auto space-y-2">
            {filteredLanguages.map((lang, index) => (
              <motion.button
                key={lang.code}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedLanguage(lang.name)}
                className={`w-full p-3 rounded-xl backdrop-blur-xl border transition-all ${
                  selectedLanguage === lang.name
                    ? 'bg-cyan-500/20 border-cyan-500'
                    : 'bg-white/5 border-white/10'
                } flex items-center justify-between`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-white font-medium">{lang.name}</span>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-400">{lang.native}</span>
                </div>
                {selectedLanguage === lang.name && (
                  <Check className="w-5 h-5 text-cyan-400" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm text-gray-400 font-medium">Currency Format</h3>
          <div className="grid grid-cols-3 gap-3">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => setSelectedCurrency(currency.code)}
                className={`p-3 rounded-xl backdrop-blur-xl border transition-all ${
                  selectedCurrency === currency.code
                    ? 'bg-violet-600/20 border-violet-500'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="text-2xl mb-1">{currency.symbol}</div>
                <div className="text-xs text-white">{currency.code}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleContinue}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-600 to-cyan-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          <span>{fromSettings ? 'Save Changes' : 'Continue'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
