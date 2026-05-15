import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Gift, Star, Trophy, Zap, ChevronRight, Sparkles } from 'lucide-react';

export function Rewards() {
  const navigate = useNavigate();

  const cashbackProgress = {
    current: 3420,
    target: 5000,
    percentage: (3420 / 5000) * 100,
  };

  const rewards = [
    {
      id: 1,
      title: 'Amazon Voucher',
      points: 1000,
      icon: '🛍️',
      color: 'from-cyan-500 to-cyan-700',
    },
    {
      id: 2,
      title: 'Netflix Premium',
      points: 1500,
      icon: '🎬',
      color: 'from-red-500 to-red-700',
    },
    {
      id: 3,
      title: 'Starbucks Gift Card',
      points: 500,
      icon: '☕',
      color: 'from-green-500 to-green-700',
    },
    {
      id: 4,
      title: 'Uber Credits',
      points: 800,
      icon: '🚗',
      color: 'from-blue-500 to-blue-700',
    },
  ];

  const cashbackHistory = [
    { id: 1, name: 'Amazon Purchase', amount: 150, date: 'Today', icon: '🛒' },
    { id: 2, name: 'Bill Payment', amount: 50, date: 'Yesterday', icon: '💰' },
    { id: 3, name: 'Food Order', amount: 75, date: '2 days ago', icon: '🍔' },
    { id: 4, name: 'Shopping', amount: 200, date: '3 days ago', icon: '👕' },
  ];

  const achievements = [
    { icon: Trophy, label: 'Big Spender', unlocked: true },
    { icon: Star, label: 'Early Bird', unlocked: true },
    { icon: Zap, label: 'Speed Saver', unlocked: false },
    { icon: Sparkles, label: 'VIP Club', unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-background pb-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 p-6 space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Rewards</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-6 backdrop-blur-xl bg-gradient-to-br from-cyan-600/40 via-violet-500/30 to-violet-600/40 border border-cyan-500/20 shadow-2xl shadow-cyan-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-600/10 to-cyan-600/10 animate-pulse" />
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-violet-500/30 rounded-full blur-3xl" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-cyan-500/30 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative p-3 rounded-2xl bg-gradient-to-br from-yellow-500 to-cyan-600">
                  <div className="absolute inset-0 bg-yellow-500/50 blur-xl rounded-2xl" />
                  <Gift className="w-6 h-6 text-white relative z-10" />
                </div>
                <div>
                  <p className="text-cyan-200 text-sm">XP Points</p>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent">{cashbackProgress.current}</h2>
                </div>
              </div>
              <div className="text-right">
                <p className="text-cyan-200 text-sm">Cashback</p>
                <p className="text-2xl font-bold text-green-400">₹500</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-cyan-200">Next Milestone</p>
                <p className="text-sm font-semibold text-white">
                  ₹{cashbackProgress.current} / ₹{cashbackProgress.target}
                </p>
              </div>
              <div className="h-3 rounded-full bg-white/20 overflow-hidden border border-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${cashbackProgress.percentage}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-yellow-400 via-violet-500 to-pink-500 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-yellow-300 to-cyan-400 rounded-full shadow-lg shadow-cyan-500/50" />
                </motion.div>
              </div>
              <p className="text-xs text-cyan-200 mt-2">
                ₹{cashbackProgress.target - cashbackProgress.current} more to unlock ₹500 bonus!
              </p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-3">
          <h3 className="font-semibold text-white">Achievements</h3>
          <div className="grid grid-cols-4 gap-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-2xl backdrop-blur-xl border ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-cyan-600/30 to-violet-500/30 border-cyan-500'
                    : 'bg-white/5 border-white/10'
                } flex flex-col items-center gap-2`}
              >
                <achievement.icon
                  className={`w-6 h-6 ${achievement.unlocked ? 'text-yellow-400' : 'text-gray-500'}`}
                />
                <span className="text-xs text-white text-center">{achievement.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-white">Redeem Points</h3>
          <div className="grid grid-cols-2 gap-3">
            {rewards.map((reward, index) => (
              <motion.button
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-2xl backdrop-blur-xl bg-gradient-to-br ${reward.color} border border-white/20 text-left hover:scale-105 transition-transform`}
              >
                <div className="text-4xl mb-2">{reward.icon}</div>
                <p className="font-semibold text-white text-sm">{reward.title}</p>
                <p className="text-xs text-white/80 mt-1">{reward.points} points</p>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-white">Cashback History</h3>
          {cashbackHistory.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/30 to-green-700/30 flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium text-white">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
              </div>
              <p className="font-semibold text-green-400">+₹{item.amount}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
