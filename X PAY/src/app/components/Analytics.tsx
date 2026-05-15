import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, TrendingDown, Target, ChevronRight } from 'lucide-react';
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export function Analytics() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  const spendingData = [
    { name: 'Mon', amount: 4200 },
    { name: 'Tue', amount: 3800 },
    { name: 'Wed', amount: 5200 },
    { name: 'Thu', amount: 4100 },
    { name: 'Fri', amount: 6300 },
    { name: 'Sat', amount: 7800 },
    { name: 'Sun', amount: 5600 },
  ];

  const categoryData = [
    { name: 'Food & Dining', value: 12500, color: '#00E5FF' },
    { name: 'Transport', value: 5600, color: '#7000FF' },
    { name: 'Shopping', value: 8900, color: '#5B8FF9' },
    { name: 'Entertainment', value: 4200, color: '#9F7AEA' },
    { name: 'Bills', value: 7800, color: '#00FFAA' },
  ];

  const insights = [
    {
      icon: TrendingDown,
      title: 'Great Progress!',
      description: 'You spent 15% less than last month',
      color: 'text-green-400',
      bg: 'from-green-500/20 to-green-700/20',
    },
    {
      icon: TrendingUp,
      title: 'Shopping Alert',
      description: 'Shopping expenses increased by 23%',
      color: 'text-cyan-400',
      bg: 'from-cyan-500/20 to-cyan-700/20',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 p-6 space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
        </div>

        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-2 border border-white/10 flex gap-2">
          {(['week', 'month', 'year'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setPeriod(type)}
              className={`flex-1 py-2 rounded-xl font-medium transition-all ${
                period === type
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-800 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-cyan-500/10 shadow-lg shadow-cyan-500/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-400 text-sm">Total Spending</p>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">₹42,150</h2>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-green-400">
                <TrendingDown className="w-5 h-5" />
                <span className="font-semibold">-15%</span>
              </div>
              <p className="text-xs text-gray-400">vs last month</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={spendingData}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  background: 'rgba(8, 10, 15, 0.9)',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#fff',
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#00E5FF"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorAmount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="font-semibold text-white mb-4">Spending by Category</h3>

          <div className="flex items-center justify-between gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="flex-1 space-y-3">
              {categoryData.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: category.color }}
                    />
                    <span className="text-sm text-gray-300">{category.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    ₹{category.value.toLocaleString()}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.button
          onClick={() => navigate('/budget')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full backdrop-blur-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white mb-1">Budget Manager</h3>
                <p className="text-sm text-cyan-200">Track and manage your spending limits</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.button>

        <div className="space-y-3">
          <h3 className="font-semibold text-white">AI Insights</h3>
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-2xl backdrop-blur-xl bg-gradient-to-r ${insight.bg} border border-white/10`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/10">
                  <insight.icon className={`w-5 h-5 ${insight.color}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{insight.title}</h4>
                  <p className="text-sm text-gray-300">{insight.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
