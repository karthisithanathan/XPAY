import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  MessageCircle,
  Mail,
  Phone,
  BookOpen,
  FileText,
  ChevronRight,
  ChevronDown,
  Send,
  Bot,
  AlertCircle,
  CheckCircle,
  Clock,
  ExternalLink,
} from 'lucide-react';

export function Support() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      message: 'Hello! I am X PAY AI Assistant. How can I help you today?',
      time: '09:45 AM',
    },
  ]);

  const faqs = [
    {
      question: 'How do I reset my PIN?',
      answer:
        'Go to Profile > Security > Change PIN. You will need to verify your identity using biometric authentication or OTP.',
    },
    {
      question: 'What are the transaction limits?',
      answer:
        'Daily limit: ₹1,00,000 for UPI transfers. ₹2,00,000 for bank transfers. Monthly limit: ₹10,00,000. You can request limit increase from Settings.',
    },
    {
      question: 'How do I add money to my wallet?',
      answer:
        'Go to Home > Add Money. You can add money via UPI, Net Banking, Debit/Credit Cards, or Bank Transfer. Instant credit for UPI and cards.',
    },
    {
      question: 'Is my money safe?',
      answer:
        'Yes! X PAY uses bank-grade encryption, quantum security protocols, and is RBI approved. Your money is insured up to ₹5,00,000 by DICGC.',
    },
    {
      question: 'How do I contact customer support?',
      answer:
        'You can contact us via Live Chat (24/7), Email: support@xpay.com, Phone: 1800-123-4567 (Toll-free), or visit our Help Center.',
    },
    {
      question: 'How do cashback rewards work?',
      answer:
        'Earn up to 5% cashback on every transaction. Cashback is credited instantly to your wallet. Check Rewards section for ongoing offers and challenges.',
    },
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      subtitle: 'Chat with our AI assistant',
      status: 'Available 24/7',
      color: 'from-cyan-500 to-cyan-700',
      action: () => setShowChat(true),
    },
    {
      icon: Mail,
      title: 'Email Support',
      subtitle: 'support@xpay.com',
      status: 'Response in 2-4 hours',
      color: 'from-violet-500 to-violet-700',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      subtitle: '1800-123-4567 (Toll-free)',
      status: 'Mon-Sat, 9AM-9PM',
      color: 'from-cyan-600 to-violet-600',
    },
  ];

  const quickLinks = [
    { icon: BookOpen, label: 'User Guide', url: '#' },
    { icon: FileText, label: 'Terms & Conditions', url: '#' },
    { icon: AlertCircle, label: 'Report a Problem', url: '#' },
    { icon: FileText, label: 'Privacy Policy', url: '#' },
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newMessage = {
      id: chatMessages.length + 1,
      sender: 'user' as const,
      message: chatMessage,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages([...chatMessages, newMessage]);
    setChatMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: chatMessages.length + 2,
        sender: 'bot' as const,
        message:
          'Thank you for your message! A support agent will assist you shortly. In the meantime, you can check our FAQ section for quick answers.',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, botResponse]);
    }, 1000);
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
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Help & Support</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 rounded-2xl p-6 border border-cyan-500/20"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">All Systems Operational</h3>
              <p className="text-sm text-cyan-200">Last updated: 2 min ago</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-cyan-200">
            <Clock className="w-4 h-4" />
            <span>Average response time: 2-3 minutes</span>
          </div>
        </motion.div>

        <div className="space-y-3">
          <h3 className="font-semibold text-white">Contact Us</h3>
          {contactOptions.map((option, index) => (
            <motion.button
              key={option.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={option.action}
              className="w-full backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 hover:border-cyan-500/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${option.color}`}>
                    <option.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-white">{option.title}</p>
                    <p className="text-xs text-gray-400">{option.subtitle}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <p className="text-xs text-green-400">{option.status}</p>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </motion.button>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-white">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <p className="font-medium text-white text-left">{faq.question}</p>
                  <motion.div
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4 text-sm text-gray-300 border-t border-white/10"
                  >
                    <p className="pt-3">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-white">Quick Links</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((link, index) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 hover:border-cyan-500/20 transition-all"
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <link.icon className="w-6 h-6 text-cyan-400" />
                  <p className="text-xs text-white">{link.label}</p>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {showChat && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          className="fixed inset-0 bg-background z-50 flex flex-col"
        >
          <div className="p-6 bg-gradient-to-r from-cyan-600/30 to-violet-600/30 backdrop-blur-xl border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">X PAY Support</h2>
                  <div className="flex items-center gap-2 text-xs text-green-400">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {chatMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-xl border-t border-white/10">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50"
              />
              <button
                onClick={handleSendMessage}
                className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                <Send className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
