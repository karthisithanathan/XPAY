import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, useMotionValue, useTransform } from 'motion/react';
import {
  Home as HomeIcon,
  CreditCard,
  TrendingUp,
  User,
  Send,
  QrCode,
  Receipt,
  Gift,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownLeft,
  Zap,
  Sparkles,
  Bot,
  Bell,
} from 'lucide-react';

export function Home() {
  const navigate = useNavigate();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [animatedBalance, setAnimatedBalance] = useState(0);
  const targetBalance = 124850.5;
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetBalance / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setAnimatedBalance(Math.min(increment * currentStep, targetBalance));
      } else {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const quickActions = [
    { icon: Send, label: 'Send', color: 'from-cyan-500 to-cyan-700', path: '/send', glow: 'cyan' },
    { icon: QrCode, label: 'Scan', color: 'from-violet-600 to-violet-800', path: '/scan', glow: 'violet' },
    { icon: Receipt, label: 'Bills', color: 'from-cyan-600 to-violet-600', path: '/transactions', glow: 'cyan' },
    { icon: Gift, label: 'Rewards', color: 'from-violet-500 to-violet-700', path: '/rewards', glow: 'violet' },
  ];

  const recentTransactions = [
    { id: 1, name: 'Amazon', type: 'debit', amount: 2499, icon: '🛒', time: '2h ago' },
    { id: 2, name: 'Salary Credit', type: 'credit', amount: 85000, icon: '💰', time: 'Yesterday' },
    { id: 3, name: 'Netflix', type: 'debit', amount: 649, icon: '🎬', time: '2d ago' },
    { id: 4, name: 'Cashback', type: 'credit', amount: 150, icon: '🎁', time: '3d ago' },
  ];

  const aiInsights = [
    { icon: Bot, text: 'AI Insight: You saved 15% more this month!', color: 'text-green-400', bg: 'from-green-500/10 to-green-700/10' },
    { icon: Sparkles, text: '₹500 cashback unlocked! Check Rewards', color: 'text-cyan-400', bg: 'from-cyan-500/10 to-violet-700/10' },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 p-6 pb-32 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400">Good Evening</p>
            <h1 className="text-2xl font-bold text-foreground">Rahul Sharma</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Bell className="w-6 h-6 text-foreground" />
              <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-500 border-2 border-background" />
            </button>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 via-violet-600 to-cyan-500 flex items-center justify-center text-foreground font-bold relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 blur-md opacity-50" />
              <span className="relative z-10">RS</span>
            </div>
          </div>
        </div>

        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-6 backdrop-blur-xl bg-gradient-to-br from-[#1A0B2E]/60 via-cyan-500/20 to-violet-600/40 border border-cyan-500/20 shadow-2xl shadow-cyan-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-600/10 to-cyan-500/10 animate-pulse" />
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-violet-600/30 rounded-full blur-3xl" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-cyan-500/30 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-cyan-200">Total Balance</p>
              <button
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                {balanceVisible ? (
                  <Eye className="w-5 h-5 text-foreground" />
                ) : (
                  <EyeOff className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>

            <motion.h2
              key={balanceVisible ? 'visible' : 'hidden'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-foreground tracking-tight"
            >
              {balanceVisible ? `₹${animatedBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '₹ ••••••'}
            </motion.h2>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                  <ArrowDownLeft className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-cyan-200">Income</p>
                  <p className="text-sm font-semibold text-foreground">₹85,000</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
                  <ArrowUpRight className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-cyan-200">Expenses</p>
                  <p className="text-sm font-semibold text-foreground">₹42,150</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <div className={`absolute inset-0 rounded-2xl bg-${action.glow}-500/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity`} />
                <action.icon className="w-6 h-6 text-foreground relative z-10" />
              </div>
              <span className="text-xs text-gray-300">{action.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="space-y-3">
          {aiInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`p-4 rounded-2xl backdrop-blur-xl bg-gradient-to-r ${insight.bg} border border-white/10 flex items-center gap-3`}
            >
              <div className={`p-2 rounded-xl bg-white/10 ${insight.color}`}>
                <insight.icon className="w-5 h-5" />
              </div>
              <p className="text-sm text-foreground flex-1">{insight.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Recent Transactions</h3>
            <button
              onClick={() => navigate('/transactions')}
              className="text-sm text-cyan-400 hover:text-cyan-300"
            >
              View All
            </button>
          </div>

          {recentTransactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 hover:border-cyan-500/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/30 to-violet-600/30 flex items-center justify-center text-2xl">
                  {tx.icon}
                </div>
                <div>
                  <p className="font-medium text-foreground">{tx.name}</p>
                  <p className="text-xs text-gray-400">{tx.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    tx.type === 'credit' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-cyan-500/10 z-50">
        <div className="flex items-center justify-around p-4">
          <button className="flex flex-col items-center gap-1 relative group">
            <div className="absolute -inset-2 bg-cyan-500/20 rounded-xl blur-md opacity-100" />
            <HomeIcon className="w-6 h-6 text-cyan-400 relative z-10" />
            <span className="text-xs text-cyan-400 relative z-10">Home</span>
          </button>
          <button
            onClick={() => navigate('/cards')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-foreground transition-colors"
          >
            <CreditCard className="w-6 h-6" />
            <span className="text-xs">Cards</span>
          </button>
          <button
            onClick={() => navigate('/analytics')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-foreground transition-colors"
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs">Analytics</span>
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-foreground transition-colors"
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
