import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, TrendingUp, AlertCircle, Target } from 'lucide-react';

export function Budget() {
  const navigate = useNavigate();
  const [showAddBudget, setShowAddBudget] = useState(false);

  const budgets = [
    {
      id: 1,
      category: 'Food & Dining',
      limit: 15000,
      spent: 12500,
      icon: '🍔',
      color: 'from-cyan-500 to-cyan-700',
    },
    {
      id: 2,
      category: 'Shopping',
      limit: 10000,
      spent: 8900,
      icon: '🛍️',
      color: 'from-violet-500 to-violet-700',
    },
    {
      id: 3,
      category: 'Transport',
      limit: 8000,
      spent: 5600,
      icon: '🚗',
      color: 'from-cyan-600 to-violet-600',
    },
    {
      id: 4,
      category: 'Entertainment',
      limit: 5000,
      spent: 4200,
      icon: '🎬',
      color: 'from-violet-600 to-cyan-600',
    },
  ];

  const totalLimit = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);

  return (
    <div className="min-h-screen bg-background pb-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 p-6 space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/analytics')}
            className="p-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white flex-1">Budget Manager</h1>
          <button
            onClick={() => setShowAddBudget(true)}
            className="p-2 rounded-xl backdrop-blur-xl bg-gradient-to-br from-cyan-500 to-violet-600"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 rounded-2xl p-6 border border-cyan-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-cyan-200 text-sm">Total Monthly Budget</p>
                <h2 className="text-2xl font-bold text-white">₹{totalLimit.toLocaleString()}</h2>
              </div>
            </div>
            <div className="text-right">
              <p className="text-cyan-200 text-sm">Spent</p>
              <p className="text-2xl font-bold text-white">₹{totalSpent.toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white">Overall Progress</span>
              <span className="text-white">{Math.round((totalSpent / totalLimit) * 100)}%</span>
            </div>
            <div className="h-3 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(totalSpent / totalLimit) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full rounded-full ${
                  totalSpent / totalLimit > 0.8
                    ? 'bg-gradient-to-r from-red-500 to-orange-500'
                    : 'bg-gradient-to-r from-cyan-500 to-violet-600'
                }`}
              />
            </div>
          </div>

          {totalSpent / totalLimit > 0.8 && (
            <div className="mt-4 p-3 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-orange-400" />
              <p className="text-sm text-orange-200">
                You've used {Math.round((totalSpent / totalLimit) * 100)}% of your monthly budget!
              </p>
            </div>
          )}
        </motion.div>

        <div className="space-y-4">
          <h3 className="font-semibold text-white">Category Budgets</h3>
          {budgets.map((budget, index) => {
            const percentage = (budget.spent / budget.limit) * 100;
            const isNearLimit = percentage > 80;

            return (
              <motion.div
                key={budget.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${budget.color} flex items-center justify-center text-2xl`}>
                      {budget.icon}
                    </div>
                    <div>
                      <p className="font-medium text-white">{budget.category}</p>
                      <p className="text-xs text-gray-400">
                        ₹{budget.spent.toLocaleString()} / ₹{budget.limit.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {isNearLimit && (
                    <div className="flex items-center gap-1 text-orange-400">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-xs">{Math.round(percentage)}%</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: index * 0.1 }}
                      className={`h-full rounded-full ${
                        isNearLimit
                          ? 'bg-gradient-to-r from-orange-500 to-red-500'
                          : `bg-gradient-to-r ${budget.color}`
                      }`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Remaining: ₹{(budget.limit - budget.spent).toLocaleString()}</span>
                    <span className={isNearLimit ? 'text-orange-400' : 'text-gray-400'}>
                      {Math.round(percentage)}%
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10">
          <h3 className="font-semibold text-white mb-4">AI Budget Suggestions</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-sm text-gray-300">
                Reduce food spending by ₹2,000 to meet your savings goal this month
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/20">
                <AlertCircle className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-sm text-gray-300">
                Your shopping budget is 89% used. Consider waiting until next month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
