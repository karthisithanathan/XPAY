import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Bell,
  Moon,
  Sun,
  Shield,
  Eye,
  Fingerprint,
  Lock,
  Mail,
  MessageSquare,
  Vibrate,
  Volume2,
  DollarSign,
  Globe,
  Download,
  Trash2,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function AccountPreferences() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [preferences, setPreferences] = useState({
    // Notifications
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    transactionAlerts: true,
    marketingEmails: false,
    soundEnabled: true,
    vibrationEnabled: true,

    // Privacy & Security
    biometricLogin: true,
    faceId: true,
    twoFactorAuth: true,
    hideBalance: false,

    // Display
    compactView: false,
    animationsEnabled: true,

    // Other
    autoBackup: true,
    offlineMode: false,
  });

  const togglePreference = (key: keyof typeof preferences | 'darkMode') => {
    if (key === 'darkMode') {
      toggleTheme();
    } else {
      setPreferences((prev) => ({
        ...prev,
        [key]: !prev[key as keyof typeof preferences],
      }));
    }
  };

  const sections = [
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        {
          key: 'pushNotifications' as const,
          label: 'Push Notifications',
          description: 'Receive app notifications',
          icon: Bell,
        },
        {
          key: 'emailNotifications' as const,
          label: 'Email Notifications',
          description: 'Receive updates via email',
          icon: Mail,
        },
        {
          key: 'smsNotifications' as const,
          label: 'SMS Notifications',
          description: 'Receive SMS alerts',
          icon: MessageSquare,
        },
        {
          key: 'transactionAlerts' as const,
          label: 'Transaction Alerts',
          description: 'Instant payment notifications',
          icon: DollarSign,
        },
        {
          key: 'soundEnabled' as const,
          label: 'Sound',
          description: 'Notification sounds',
          icon: Volume2,
        },
        {
          key: 'vibrationEnabled' as const,
          label: 'Vibration',
          description: 'Vibrate on notifications',
          icon: Vibrate,
        },
      ],
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        {
          key: 'biometricLogin' as const,
          label: 'Biometric Login',
          description: 'Use fingerprint or face ID',
          icon: Fingerprint,
        },
        {
          key: 'twoFactorAuth' as const,
          label: 'Two-Factor Authentication',
          description: 'Extra security layer',
          icon: Lock,
        },
        {
          key: 'hideBalance' as const,
          label: 'Hide Balance',
          description: 'Hide balance by default',
          icon: Eye,
        },
      ],
    },
    {
      title: 'Display',
      icon: Moon,
      items: [
        {
          key: 'darkMode' as const,
          label: 'Dark Mode',
          description: 'Use dark theme',
          icon: Moon,
        },
        {
          key: 'compactView' as const,
          label: 'Compact View',
          description: 'Show more items per screen',
          icon: Globe,
        },
        {
          key: 'animationsEnabled' as const,
          label: 'Animations',
          description: 'Enable UI animations',
          icon: Globe,
        },
      ],
    },
    {
      title: 'Data & Storage',
      icon: Download,
      items: [
        {
          key: 'autoBackup' as const,
          label: 'Auto Backup',
          description: 'Automatic data backup',
          icon: Download,
        },
        {
          key: 'offlineMode' as const,
          label: 'Offline Mode',
          description: 'Access data offline',
          icon: Globe,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 p-6 space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/profile')}
            className="p-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">Account Preferences</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 rounded-2xl p-4 border border-cyan-500/20"
        >
          <p className="text-sm text-cyan-200">
            Customize your X PAY experience. Changes are saved automatically.
          </p>
        </motion.div>

        {sections.map((section, sectionIndex) => (
          <div key={section.title} className="space-y-3">
            <div className="flex items-center gap-2">
              <section.icon className="w-5 h-5 text-cyan-400" />
              <h3 className="font-semibold text-foreground">{section.title}</h3>
            </div>

            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              {section.items.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: sectionIndex * 0.1 + index * 0.05 }}
                  className="p-4 flex items-center justify-between border-b border-white/5 last:border-b-0"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20">
                      {item.key === 'darkMode' ? (
                        theme === 'dark' ? (
                          <Moon className="w-5 h-5 text-cyan-400" />
                        ) : (
                          <Sun className="w-5 h-5 text-cyan-400" />
                        )
                      ) : (
                        <item.icon className="w-5 h-5 text-cyan-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-gray-400">{item.description}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => togglePreference(item.key)}
                    className={`relative w-14 h-8 rounded-full transition-colors ${
                      item.key === 'darkMode'
                        ? theme === 'dark'
                          ? 'bg-gradient-to-r from-cyan-500 to-violet-600'
                          : 'bg-white/10'
                        : preferences[item.key as keyof typeof preferences]
                        ? 'bg-gradient-to-r from-cyan-500 to-violet-600'
                        : 'bg-white/10'
                    }`}
                  >
                    <motion.div
                      animate={{
                        x: item.key === 'darkMode'
                          ? theme === 'dark' ? 24 : 2
                          : preferences[item.key as keyof typeof preferences] ? 24 : 2,
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute top-1 w-6 h-6 rounded-full bg-white"
                    />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Danger Zone</h3>
          <div className="backdrop-blur-xl bg-red-500/10 rounded-2xl border border-red-500/20 overflow-hidden">
            <button className="w-full p-4 flex items-center gap-3 hover:bg-red-500/20 transition-colors">
              <Trash2 className="w-5 h-5 text-red-400" />
              <div className="flex-1 text-left">
                <p className="font-medium text-red-400">Delete All Data</p>
                <p className="text-xs text-red-300">Permanently remove all your data</p>
              </div>
            </button>
          </div>
        </div>

        <button
          onClick={() => navigate('/profile')}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 text-foreground font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
