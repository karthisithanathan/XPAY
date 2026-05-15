import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Smartphone, Monitor, Tablet, MapPin, Clock, MoreVertical, LogOut } from 'lucide-react';

export function LinkedDevices() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState<number | null>(null);

  const devices = [
    {
      id: 1,
      name: 'iPhone 14 Pro',
      type: 'mobile',
      icon: Smartphone,
      location: 'Mumbai, India',
      lastActive: '2 minutes ago',
      current: true,
      color: 'from-cyan-500 to-cyan-700',
    },
    {
      id: 2,
      name: 'MacBook Pro',
      type: 'desktop',
      icon: Monitor,
      location: 'Mumbai, India',
      lastActive: '1 hour ago',
      current: false,
      color: 'from-violet-500 to-violet-700',
    },
    {
      id: 3,
      name: 'iPad Air',
      type: 'tablet',
      icon: Tablet,
      location: 'Mumbai, India',
      lastActive: 'Yesterday',
      current: false,
      color: 'from-cyan-600 to-violet-600',
    },
  ];

  const handleRemoveDevice = (deviceId: number) => {
    console.log('Remove device:', deviceId);
    setShowMenu(null);
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
          <h1 className="text-2xl font-bold text-foreground">Linked Devices</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 rounded-2xl p-4 border border-cyan-500/20"
        >
          <p className="text-sm text-cyan-200">
            Manage devices connected to your X PAY account. Remove any devices you don't recognize.
          </p>
        </motion.div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">{devices.length} Devices Connected</h3>
            <button className="text-sm text-cyan-400 hover:text-cyan-300">
              Remove All
            </button>
          </div>

          {devices.map((device, index) => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10 relative"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${device.color}`}>
                    <device.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-foreground">{device.name}</p>
                      {device.current && (
                        <span className="px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/30 text-xs text-green-400">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <MapPin className="w-3 h-3" />
                        <span>{device.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>Last active: {device.lastActive}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowMenu(showMenu === device.id ? null : device.id)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>

                  {showMenu === device.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-0 top-full mt-2 backdrop-blur-xl bg-white/10 rounded-xl border border-white/10 shadow-lg overflow-hidden z-10 min-w-[160px]"
                    >
                      {!device.current && (
                        <button
                          onClick={() => handleRemoveDevice(device.id)}
                          className="w-full px-4 py-3 flex items-center gap-2 hover:bg-red-500/20 transition-colors text-red-400"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm">Remove Device</span>
                        </button>
                      )}
                      {device.current && (
                        <div className="px-4 py-3 text-xs text-gray-400">
                          Can't remove current device
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10">
          <h3 className="font-semibold text-foreground mb-3">Device Security Tips</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>Always log out from public or shared devices</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>Remove devices you don't recognize immediately</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>Enable biometric authentication for added security</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <span>Keep your app updated to the latest version</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
