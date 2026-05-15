import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { ArrowLeft, Search, ChevronRight, Check } from 'lucide-react';

export function SendMoney() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const x = useMotionValue(0);
  const background = useTransform(x, [0, 200], ['rgba(0, 229, 255, 0.5)', 'rgba(34, 197, 94, 0.8)']);

  const contacts = [
    { id: 1, name: 'Priya', avatar: '👩', phone: '9876543210' },
    { id: 2, name: 'Amit', avatar: '👨', phone: '9876543211' },
    { id: 3, name: 'Sneha', avatar: '👩', phone: '9876543212' },
    { id: 4, name: 'Rohan', avatar: '👨', phone: '9876543213' },
  ];

  const handleSwipeComplete = () => {
    if (amount && selectedContact) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center space-y-4 z-10"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-green-500/50 blur-xl rounded-full" />
            <Check className="w-12 h-12 text-white relative z-10" />
          </div>
          <h2 className="text-2xl font-bold text-white">Payment Successful!</h2>
          <p className="text-gray-400">₹{amount} sent successfully</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
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
          <h1 className="text-2xl font-bold text-white">Send Money</h1>
        </div>

        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts"
              className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm text-gray-400">Recent Contacts</h3>
          {contacts.map((contact, index) => (
            <motion.button
              key={contact.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedContact(contact.id)}
              className={`w-full p-4 rounded-2xl backdrop-blur-xl border transition-all ${
                selectedContact === contact.id
                  ? 'bg-cyan-600/30 border-cyan-500'
                  : 'bg-white/5 border-white/10'
              } flex items-center justify-between`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600/30 to-violet-600/30 flex items-center justify-center text-2xl">
                  {contact.avatar}
                </div>
                <div className="text-left">
                  <p className="font-medium text-white">{contact.name}</p>
                  <p className="text-xs text-gray-400">{contact.phone}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </motion.button>
          ))}
        </div>

        {selectedContact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
              <label className="block text-sm text-gray-400 mb-2">Amount</label>
              <div className="flex items-center">
                <span className="text-4xl font-bold text-white">₹</span>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                  placeholder="0"
                  className="flex-1 text-4xl font-bold bg-transparent text-white outline-none ml-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[500, 1000, 2000, 5000, 10000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset.toString())}
                  className="py-3 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                >
                  ₹{preset}
                </button>
              ))}
            </div>

            {amount && (
              <div className="relative h-16 rounded-2xl backdrop-blur-xl bg-white/5 border border-cyan-500/20 overflow-hidden shadow-lg shadow-cyan-500/20">
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 200 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset }) => {
                    if (offset.x > 180) {
                      handleSwipeComplete();
                    }
                  }}
                  style={{ x, background }}
                  className="absolute left-0 top-0 h-full w-16 rounded-2xl flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg shadow-cyan-500/50"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                  <ChevronRight className="w-6 h-6 text-white -ml-3" />
                </motion.div>
                <div className="h-full flex items-center justify-center">
                  <p className="text-white font-medium">Swipe to Pay</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
