import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Flashlight, Image, QrCode, ScanLine } from 'lucide-react';

export function QRScan() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(true);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-600/20 rounded-3xl blur-3xl animate-pulse" />
        <div className="absolute top-1/3 left-1/3 w-60 h-60 bg-violet-600/20 rounded-3xl blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="p-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/home')}
            className="p-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">Scan QR Code</h1>
          <button className="p-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20">
            <Flashlight className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="relative w-full max-w-sm aspect-square">
            <div className="absolute inset-0 backdrop-blur-sm bg-white/5 rounded-3xl border-2 border-dashed border-white/20" />

            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-cyan-500 rounded-tl-3xl shadow-lg shadow-cyan-500/50" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-cyan-500 rounded-tr-3xl shadow-lg shadow-cyan-500/50" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-cyan-500 rounded-bl-3xl shadow-lg shadow-cyan-500/50" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-cyan-500 rounded-br-3xl shadow-lg shadow-cyan-500/50" />

            {scanning && (
              <motion.div
                animate={{ y: [0, 240, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-violet-400 to-transparent shadow-lg shadow-cyan-500/50"
                style={{ top: '20%' }}
              />
            )}

            <div className="absolute inset-0 flex items-center justify-center">
              <QrCode className="w-32 h-32 text-white/20" />
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10">
            <p className="text-center text-gray-300">
              Position the QR code within the frame
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-white hover:bg-white/10 transition-colors">
              <Image className="w-5 h-5" />
              <span>Gallery</span>
            </button>
            <button
              onClick={() => navigate('/home')}
              className="p-4 rounded-2xl backdrop-blur-xl bg-gradient-to-r from-cyan-600 to-cyan-800 flex items-center justify-center gap-2 text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              <ScanLine className="w-5 h-5" />
              <span>My QR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
