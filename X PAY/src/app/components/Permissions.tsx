import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Camera, Bell, Users, MapPin, Mic, Fingerprint, ChevronRight, Shield } from 'lucide-react';

export function Permissions() {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({
    camera: false,
    notification: false,
    contacts: false,
    location: false,
    microphone: false,
    biometric: false,
  });

  const permissionsList = [
    {
      id: 'camera',
      icon: Camera,
      title: 'Camera',
      description: 'For QR codes and face verification',
      color: 'from-cyan-500 to-cyan-700',
      required: true,
    },
    {
      id: 'notification',
      icon: Bell,
      title: 'Notifications',
      description: 'Real-time spending alerts',
      color: 'from-violet-500 to-violet-700',
      required: true,
    },
    {
      id: 'contacts',
      icon: Users,
      title: 'Contacts',
      description: 'Easy P2P transfers',
      color: 'from-cyan-600 to-violet-600',
      required: false,
    },
    {
      id: 'location',
      icon: MapPin,
      title: 'Location',
      description: 'Fraud prevention system',
      color: 'from-violet-600 to-cyan-600',
      required: false,
    },
    {
      id: 'microphone',
      icon: Mic,
      title: 'Microphone',
      description: 'Voice payments',
      color: 'from-cyan-500 to-violet-500',
      required: false,
    },
    {
      id: 'biometric',
      icon: Fingerprint,
      title: 'Biometric',
      description: 'Face ID & Fingerprint',
      color: 'from-violet-500 to-cyan-500',
      required: true,
    },
  ];

  const togglePermission = (id: string) => {
    setPermissions((prev) => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev],
    }));
  };

  const requiredGranted = permissionsList
    .filter((p) => p.required)
    .every((p) => permissions[p.id as keyof typeof permissions]);

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background pb-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 p-6 space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Permissions</h1>
            <p className="text-gray-400">We need access to keep you secure</p>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4">
          <p className="text-sm text-cyan-200">
            <span className="font-semibold">🔒 Your Privacy Matters:</span> We only use these permissions to provide you with a secure banking experience. Your data never leaves your device.
          </p>
        </div>

        <div className="space-y-3">
          {permissionsList.map((permission, index) => (
            <motion.div
              key={permission.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${permission.color}`}>
                    <permission.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white">{permission.title}</p>
                      {permission.required && (
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-xs text-cyan-400">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{permission.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => togglePermission(permission.id)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    permissions[permission.id as keyof typeof permissions]
                      ? 'bg-gradient-to-r from-cyan-500 to-violet-600'
                      : 'bg-white/10'
                  }`}
                >
                  <motion.div
                    animate={{
                      x: permissions[permission.id as keyof typeof permissions] ? 24 : 2,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-6 h-6 rounded-full bg-white"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!requiredGranted}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-600 to-cyan-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Continue</span>
          <ChevronRight className="w-5 h-5" />
        </button>

        <p className="text-center text-xs text-gray-500">
          You can change these permissions anytime in Settings
        </p>
      </div>
    </div>
  );
}
