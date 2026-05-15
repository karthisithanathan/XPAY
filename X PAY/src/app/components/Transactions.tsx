import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Filter, Download } from 'lucide-react';

export function Transactions() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');

  const transactions = [
    {
      id: 1,
      date: 'Today',
      items: [
        { name: 'Starbucks', category: 'Food & Dining', amount: 450, type: 'debit', time: '10:30 AM', icon: '☕' },
        { name: 'Uber', category: 'Transport', amount: 280, type: 'debit', time: '09:15 AM', icon: '🚗' },
      ],
    },
    {
      id: 2,
      date: 'Yesterday',
      items: [
        { name: 'Salary Credit', category: 'Income', amount: 85000, type: 'credit', time: '12:00 PM', icon: '💰' },
        { name: 'Netflix', category: 'Entertainment', amount: 649, type: 'debit', time: '08:00 PM', icon: '🎬' },
        { name: 'Amazon', category: 'Shopping', amount: 2499, type: 'debit', time: '03:30 PM', icon: '🛒' },
      ],
    },
    {
      id: 3,
      date: '3 Days Ago',
      items: [
        { name: 'Cashback', category: 'Rewards', amount: 150, type: 'credit', time: '11:00 AM', icon: '🎁' },
        { name: 'Zomato', category: 'Food & Dining', amount: 580, type: 'debit', time: '08:45 PM', icon: '🍔' },
      ],
    },
  ];

  const filteredTransactions = transactions.map((group) => ({
    ...group,
    items: group.items.filter((item) => filter === 'all' || item.type === filter),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="min-h-screen bg-background pb-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 p-6 space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white flex-1">Transactions</h1>
          <button className="p-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10">
            <Download className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-2 border border-white/10 flex gap-2">
          {(['all', 'credit', 'debit'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`flex-1 py-2 rounded-xl font-medium transition-all ${
                filter === type
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-800 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredTransactions.map((group, groupIndex) => (
            <div key={group.id} className="space-y-3">
              <h3 className="text-sm text-gray-400 font-medium">{group.date}</h3>
              {group.items.map((tx, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: groupIndex * 0.1 + index * 0.05 }}
                  className="p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/20 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600/30 to-violet-600/30 flex items-center justify-center text-2xl">
                        {tx.icon}
                      </div>
                      <div>
                        <p className="font-medium text-white">{tx.name}</p>
                        <p className="text-xs text-gray-400">{tx.category} • {tx.time}</p>
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
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No {filter} transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
