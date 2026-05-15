import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  Moon,
  Globe,
  Smartphone,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Profile() {
  const navigate = useNavigate();
  const { language, currency } = useLanguage();

  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Personal Info', subtitle: 'Name, Email, Phone', path: '/personal-info' },
        { icon: Smartphone, label: 'Linked Devices', subtitle: '3 devices', path: '/linked-devices' },
        { icon: Globe, label: 'Language', subtitle: `${language} • ${currency}`, path: '/language' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Account Preferences', subtitle: 'Notifications, Privacy', path: '/preferences' },
        { icon: Shield, label: 'Security', subtitle: 'Biometric, PIN, 2FA', path: '/security' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help & Support', subtitle: 'FAQs, Contact, Chat', path: '/support' },
        { icon: Settings, label: 'App Settings', subtitle: 'Version 2.5.1', path: '/app-settings' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 p-6 pb-20 space-y-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/home')}
              className="p-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10"
            >
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>
            <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 text-center"
            >
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-xs text-gray-400 mt-1">Cards</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 text-center"
            >
              <p className="text-2xl font-bold text-foreground">127</p>
              <p className="text-xs text-gray-400 mt-1">Transactions</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 text-center"
            >
              <p className="text-2xl font-bold text-foreground">₹3.4k</p>
              <p className="text-xs text-gray-400 mt-1">Cashback</p>
            </motion.div>
          </div>

          {menuSections.map((section, sectionIndex) => (
            <div key={section.title} className="space-y-3">
              <h3 className="text-sm text-gray-400 font-medium">{section.title}</h3>
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                {section.items.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: sectionIndex * 0.1 + index * 0.05 }}
                    onClick={() => {
                      if (item.path) {
                        if (item.path === '/language') {
                          navigate(item.path, { state: { fromSettings: true } });
                        } else {
                          navigate(item.path);
                        }
                      }
                    }}
                    disabled={!item.path}
                    className={`w-full p-4 flex items-center justify-between transition-colors border-b border-white/5 last:border-b-0 ${
                      item.path ? 'hover:bg-white/5 cursor-pointer' : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-600/30 to-violet-500/30">
                        <item.icon className="w-5 h-5 text-foreground" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-gray-400">{item.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </motion.button>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={() => navigate('/')}
            className="w-full p-4 rounded-2xl backdrop-blur-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center gap-3 text-red-400 hover:bg-red-500/30 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Logout</span>
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-500">X PAY v2.5.1</p>
            <p className="text-xs text-gray-500 mt-1">Future of Smart Banking</p>
          </div>
        </div>
    </div>
  );
}
