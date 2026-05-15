import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Bell, Gift, AlertCircle, TrendingUp, CreditCard, X } from 'lucide-react';

export function Notifications() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: 'payment',
      icon: CreditCard,
      title: 'Payment Successful',
      message: 'You sent ₹2,499 to Amazon',
      time: '2 min ago',
      unread: true,
      color: 'from-cyan-500 to-cyan-700',
    },
    {
      id: 2,
      type: 'reward',
      icon: Gift,
      title: 'Cashback Earned!',
      message: '₹150 cashback credited to your wallet',
      time: '1 hour ago',
      unread: true,
      color: 'from-green-500 to-green-700',
    },
    {
      id: 3,
      type: 'alert',
      icon: AlertCircle,
      title: 'Budget Alert',
      message: 'You have used 89% of your shopping budget',
      time: '3 hours ago',
      unread: true,
      color: 'from-orange-500 to-orange-700',
    },
    {
      id: 4,
      type: 'insight',
      icon: TrendingUp,
      title: 'AI Insight',
      message: 'You saved 15% more this month!',
      time: 'Yesterday',
      unread: false,
      color: 'from-violet-500 to-violet-700',
    },
    {
      id: 5,
      type: 'payment',
      icon: CreditCard,
      title: 'Money Received',
      message: 'Salary credited: ₹85,000',
      time: 'Yesterday',
      unread: false,
      color: 'from-cyan-500 to-cyan-700',
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
            onClick={() => navigate('/home')}
            className="p-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white flex-1">Notifications</h1>
          <button className="text-sm text-cyan-400 hover:text-cyan-300">
            Mark all read
          </button>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-medium">
            All
          </button>
          <button className="px-4 py-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-gray-400 text-sm hover:text-white">
            Payments
          </button>
          <button className="px-4 py-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-gray-400 text-sm hover:text-white">
            Rewards
          </button>
        </div>

        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`backdrop-blur-xl rounded-2xl p-4 border flex items-start gap-3 ${
                notification.unread
                  ? 'bg-white/10 border-cyan-500/20'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className={`p-2 rounded-xl bg-gradient-to-br ${notification.color} shrink-0`}>
                <notification.icon className="w-5 h-5 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-white">{notification.title}</p>
                  {notification.unread && (
                    <div className="w-2 h-2 rounded-full bg-cyan-500 shrink-0 mt-1" />
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
              </div>

              <button className="p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </motion.div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
