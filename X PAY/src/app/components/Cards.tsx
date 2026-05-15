import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CreditCard, Eye, EyeOff, Lock, Unlock, Plus, Settings } from 'lucide-react';

export function Cards() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [cardLocked, setCardLocked] = useState(false);

  const cards = [
    {
      id: 1,
      name: 'X PAY Platinum',
      type: 'Virtual',
      number: '4532 **** **** 8765',
      fullNumber: '4532 1234 5678 8765',
      expiry: '12/28',
      cvv: '123',
      limit: 100000,
      spent: 42150,
      gradient: 'from-cyan-600 via-violet-700 to-cyan-900',
    },
    {
      id: 2,
      name: 'X PAY Gold',
      type: 'Physical',
      number: '5412 **** **** 3456',
      fullNumber: '5412 7890 1234 3456',
      expiry: '09/27',
      cvv: '456',
      limit: 50000,
      spent: 18900,
      gradient: 'from-violet-500 via-violet-600 to-cyan-700',
    },
  ];

  const card = cards[selectedCard];

  return (
    <div className="min-h-screen bg-background pb-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 p-6 space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white flex-1">My Cards</h1>
          <button className="p-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10">
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="relative h-64">
          {cards.map((c, index) => (
            <motion.div
              key={c.id}
              animate={{
                scale: selectedCard === index ? 1 : 0.95,
                y: selectedCard === index ? 0 : (index - selectedCard) * 20,
                opacity: selectedCard === index ? 1 : 0.6,
                zIndex: selectedCard === index ? 10 : cards.length - index,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={() => setSelectedCard(index)}
              className="absolute inset-0 cursor-pointer"
            >
              <div
                className={`h-full rounded-3xl bg-gradient-to-br ${c.gradient} p-6 shadow-2xl shadow-purple-500/30 border border-white/20 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
                <div className="h-full flex flex-col justify-between relative z-10">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white/80 text-sm">{c.type} Card</p>
                      <h3 className="text-white font-semibold">{c.name}</h3>
                    </div>
                    <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-white text-2xl tracking-wider font-mono">
                        {showDetails ? c.fullNumber : c.number}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/60 text-xs">Valid Till</p>
                        <p className="text-white font-mono">{c.expiry}</p>
                      </div>
                      {showDetails && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <p className="text-white/60 text-xs">CVV</p>
                          <p className="text-white font-mono">{c.cvv}</p>
                        </motion.div>
                      )}
                      <div className="text-right">
                        <p className="text-white/60 text-xs">Balance</p>
                        <p className="text-white font-semibold">
                          ₹{(c.limit - c.spent).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-2 justify-center">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedCard(index)}
              className={`h-2 rounded-full transition-all ${
                selectedCard === index ? 'w-8 bg-cyan-500' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 flex flex-col items-center gap-2 hover:bg-white/10 transition-colors"
          >
            {showDetails ? (
              <EyeOff className="w-6 h-6 text-cyan-400" />
            ) : (
              <Eye className="w-6 h-6 text-cyan-400" />
            )}
            <span className="text-xs text-white">{showDetails ? 'Hide' : 'Show'}</span>
          </button>

          <button
            onClick={() => setCardLocked(!cardLocked)}
            className="p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 flex flex-col items-center gap-2 hover:bg-white/10 transition-colors"
          >
            {cardLocked ? (
              <Lock className="w-6 h-6 text-red-400" />
            ) : (
              <Unlock className="w-6 h-6 text-green-400" />
            )}
            <span className="text-xs text-white">{cardLocked ? 'Locked' : 'Lock'}</span>
          </button>

          <button className="p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 flex flex-col items-center gap-2 hover:bg-white/10 transition-colors">
            <Settings className="w-6 h-6 text-cyan-400" />
            <span className="text-xs text-white">Settings</span>
          </button>
        </div>

        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
          <h3 className="font-semibold text-white">Card Limits</h3>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Spent this month</p>
              <p className="text-sm font-semibold text-white">
                ₹{card.spent.toLocaleString()} / ₹{card.limit.toLocaleString()}
              </p>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(card.spent / card.limit) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-3 rounded-xl bg-white/5">
              <p className="text-xs text-gray-400">Available</p>
              <p className="font-semibold text-green-400">
                ₹{(card.limit - card.spent).toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white/5">
              <p className="text-xs text-gray-400">Total Limit</p>
              <p className="font-semibold text-white">₹{card.limit.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
