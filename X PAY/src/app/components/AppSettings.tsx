import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Settings,
  Download,
  Trash2,
  HardDrive,
  Wifi,
  Database,
  RefreshCw,
  Info,
  ChevronRight,
} from 'lucide-react';

export function AppSettings() {
  const navigate = useNavigate();
  const [cacheSize] = useState('124 MB');
  const [dataUsage] = useState('1.2 GB');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearCache = () => {
    setShowClearConfirm(false);
    alert('Cache cleared successfully!');
  };

  const handleCheckUpdate = () => {
    alert('You are using the latest version!');
  };

  const settingsSections = [
    {
      title: 'Storage',
      items: [
        {
          icon: HardDrive,
          label: 'Cache Size',
          value: cacheSize,
          action: () => setShowClearConfirm(true),
          actionLabel: 'Clear',
          color: 'from-cyan-500 to-cyan-700',
        },
        {
          icon: Database,
          label: 'Data Usage',
          value: dataUsage,
          action: null,
          actionLabel: null,
          color: 'from-violet-500 to-violet-700',
        },
      ],
    },
    {
      title: 'Network',
      items: [
        {
          icon: Wifi,
          label: 'Auto-sync',
          value: 'Enabled',
          action: null,
          actionLabel: null,
          color: 'from-cyan-600 to-violet-600',
        },
      ],
    },
    {
      title: 'App Info',
      items: [
        {
          icon: Info,
          label: 'Version',
          value: '2.5.1',
          action: handleCheckUpdate,
          actionLabel: 'Check',
          color: 'from-violet-600 to-cyan-600',
        },
        {
          icon: Download,
          label: 'Last Updated',
          value: 'May 1, 2026',
          action: null,
          actionLabel: null,
          color: 'from-cyan-500 to-violet-500',
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
          <h1 className="text-2xl font-bold text-foreground">App Settings</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 rounded-2xl p-6 border border-cyan-500/20 text-center"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="p-4 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-xl">X PAY</h3>
              <p className="text-sm text-cyan-200">Version 2.5.1</p>
              <p className="text-xs text-cyan-200 mt-1">Future of Smart Banking</p>
            </div>
          </div>
        </motion.div>

        {settingsSections.map((section, sectionIndex) => (
          <div key={section.title} className="space-y-3">
            <h3 className="text-sm text-gray-400 font-medium">{section.title}</h3>
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              {section.items.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: sectionIndex * 0.1 + index * 0.05 }}
                  className="p-4 flex items-center justify-between border-b border-white/5 last:border-b-0"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${item.color}`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-gray-400">{item.value}</p>
                    </div>
                  </div>

                  {item.action && (
                    <button
                      onClick={item.action}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                    >
                      {item.actionLabel}
                    </button>
                  )}

                  {!item.action && <ChevronRight className="w-5 h-5 text-gray-400" />}
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        <div className="space-y-3">
          <h3 className="text-sm text-gray-400 font-medium">Advanced</h3>
          <button
            onClick={() => setShowClearConfirm(true)}
            className="w-full backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700">
                  <RefreshCw className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">Reset App</p>
                  <p className="text-xs text-gray-400">Clear all data and settings</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        </div>

        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10">
          <h3 className="font-semibold text-foreground mb-3">About</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>
              <span className="text-gray-400">Build Number:</span> 2.5.1.20260507
            </p>
            <p>
              <span className="text-gray-400">Bundle ID:</span> com.xpay.app
            </p>
            <p>
              <span className="text-gray-400">Developer:</span> X PAY Technologies
            </p>
            <p className="text-xs text-gray-500 mt-4">
              © 2026 X PAY. All rights reserved. Bank-grade security with quantum encryption.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 py-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-foreground font-medium hover:bg-white/10 transition-all">
            Terms of Service
          </button>
          <button className="flex-1 py-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-foreground font-medium hover:bg-white/10 transition-all">
            Privacy Policy
          </button>
        </div>
      </div>

      {showClearConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={() => setShowClearConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/10 max-w-sm w-full"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-orange-500 to-orange-700">
                <Trash2 className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">Clear Cache?</h3>
                <p className="text-sm text-gray-400">
                  This will free up {cacheSize} of storage space. This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-3 w-full mt-4">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-foreground font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearCache}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 text-white font-medium"
                >
                  Clear
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
