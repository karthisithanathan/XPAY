import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Shield,
  Lock,
  Fingerprint,
  Smartphone,
  Key,
  ChevronRight,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export function Security() {
  const navigate = useNavigate();
  const [showChangePIN, setShowChangePIN] = useState(false);
  const [currentPIN, setCurrentPIN] = useState('');
  const [newPIN, setNewPIN] = useState('');
  const [confirmPIN, setConfirmPIN] = useState('');
  const [showPIN, setShowPIN] = useState(false);

  const [securitySettings, setSecuritySettings] = useState({
    biometric: true,
    twoFactor: true,
    loginAlerts: true,
    transactionPIN: true,
  });

  const securityFeatures = [
    {
      icon: Fingerprint,
      title: 'Biometric Authentication',
      description: 'Use fingerprint or face ID to login',
      enabled: securitySettings.biometric,
      key: 'biometric' as const,
      color: 'from-cyan-500 to-cyan-700',
    },
    {
      icon: Smartphone,
      title: 'Two-Factor Authentication',
      description: 'Extra security with OTP verification',
      enabled: securitySettings.twoFactor,
      key: 'twoFactor' as const,
      color: 'from-violet-500 to-violet-700',
    },
    {
      icon: AlertCircle,
      title: 'Login Alerts',
      description: 'Get notified of new login attempts',
      enabled: securitySettings.loginAlerts,
      key: 'loginAlerts' as const,
      color: 'from-cyan-600 to-violet-600',
    },
    {
      icon: Lock,
      title: 'Transaction PIN',
      description: 'Require PIN for all transactions',
      enabled: securitySettings.transactionPIN,
      key: 'transactionPIN' as const,
      color: 'from-violet-600 to-cyan-600',
    },
  ];

  const toggleSetting = (key: keyof typeof securitySettings) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleChangePIN = () => {
    if (newPIN !== confirmPIN) {
      alert('PINs do not match!');
      return;
    }
    if (newPIN.length !== 4) {
      alert('PIN must be 4 digits!');
      return;
    }
    // Simulate PIN change
    setShowChangePIN(false);
    setCurrentPIN('');
    setNewPIN('');
    setConfirmPIN('');
    alert('PIN changed successfully!');
  };

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
          <h1 className="text-2xl font-bold text-foreground">Security</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-green-700/20 rounded-2xl p-6 border border-green-500/20"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-green-700">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Security Score: Excellent</h3>
              <p className="text-sm text-green-200">All security features are enabled</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">PIN Management</h3>
          <button
            onClick={() => setShowChangePIN(!showChangePIN)}
            className="w-full backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600">
                  <Key className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">Change PIN</p>
                  <p className="text-xs text-gray-400">Update your 4-digit security PIN</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>

          {showChangePIN && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4"
            >
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Current PIN</label>
                <div className="relative">
                  <input
                    type={showPIN ? 'text' : 'password'}
                    value={currentPIN}
                    onChange={(e) => setCurrentPIN(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    maxLength={4}
                    placeholder="Enter current PIN"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-foreground focus:outline-none focus:border-cyan-500/50"
                  />
                  <button
                    onClick={() => setShowPIN(!showPIN)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPIN ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">New PIN</label>
                <input
                  type={showPIN ? 'text' : 'password'}
                  value={newPIN}
                  onChange={(e) => setNewPIN(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                  placeholder="Enter new PIN"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-foreground focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Confirm New PIN</label>
                <input
                  type={showPIN ? 'text' : 'password'}
                  value={confirmPIN}
                  onChange={(e) => setConfirmPIN(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                  placeholder="Confirm new PIN"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-foreground focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <button
                onClick={handleChangePIN}
                disabled={!currentPIN || !newPIN || !confirmPIN}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Update PIN
              </button>
            </motion.div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Security Features</h3>
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 flex items-center justify-between border-b border-white/5 last:border-b-0"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${feature.color}`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{feature.title}</p>
                    <p className="text-xs text-gray-400">{feature.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleSetting(feature.key)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    feature.enabled
                      ? 'bg-gradient-to-r from-cyan-500 to-violet-600'
                      : 'bg-white/10'
                  }`}
                >
                  <motion.div
                    animate={{
                      x: feature.enabled ? 24 : 2,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-6 h-6 rounded-full bg-white"
                  />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10">
          <h3 className="font-semibold text-foreground mb-3">Security Recommendations</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Strong PIN Enabled</p>
                <p className="text-xs text-gray-400">Your account is protected with a 4-digit PIN</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">2FA Active</p>
                <p className="text-xs text-gray-400">Two-factor authentication adds extra security</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Biometric Enabled</p>
                <p className="text-xs text-gray-400">Fast and secure access with fingerprint/face ID</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
