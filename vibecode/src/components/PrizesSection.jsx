import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, ShieldCheck, Zap } from 'lucide-react';

const armors = [
  {
    id: 'mark42',
    name: 'Mark XLII',
    color: '#FFD700',
    icon: Trophy,
    reward: '$5,000 Grand Prize',
    specs: {
      cpu: '4.8GHz Neural Compute',
      ram: '128TB ARC Memory',
      power: 'Arc Reactor Gen 3',
      status: 'PREHENSILE ONLINE'
    }
  },
  {
    id: 'hulkbuster',
    name: 'Hulkbuster',
    color: '#C0C0C0',
    icon: Award,
    reward: '$2,500 Runner Up',
    specs: {
      cpu: '12.4GHz Brute Force Array',
      ram: '512TB Gamma Buffer',
      power: 'Dual Arc Reactor',
      status: 'VERONICA LINKED'
    }
  },
  {
    id: 'mark50',
    name: 'Mark L',
    color: '#CD7F32',
    icon: ShieldCheck,
    reward: '$1,000 Third Place',
    specs: {
      cpu: '8.2GHz Nano-Compute Core',
      ram: '256TB Bleeding Edge',
      power: 'Arc Reactor Gen 5',
      status: 'NANOTECH ACTIVE'
    }
  },
  {
    id: 'mark5',
    name: 'Mark V',
    color: '#00ADEF',
    icon: Zap,
    reward: 'Stark Industries Special Grant',
    specs: {
      cpu: '2.1GHz Emergency Core',
      ram: '32TB Suitcase Deploy',
      power: 'Micro Arc Reactor',
      status: 'RAPID DEPLOY READY'
    }
  }
];

// SVG Pattern for Carbon Fiber
const carbonFiberPattern = `data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2' stroke='rgba(0,173,239,0.04)' stroke-width='1'/%3E%3C/svg%3E`;

const ArmorCard = ({ armor }) => {
  const [diagnostic, setDiagnostic] = useState(false);
  const Icon = armor.icon;

  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-900 border border-gray-800 p-6 flex flex-col h-full group">
      {/* Background glow based on armor color */}
      <div 
        className="absolute -inset-4 opacity-10 group-hover:opacity-20 transition-opacity blur-2xl z-0 pointer-events-none" 
        style={{ backgroundColor: armor.color }} 
      />

      <div className="relative z-10 flex justify-between items-start mb-6">
        <Icon size={32} style={{ color: armor.color }} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
        <button 
          onClick={() => setDiagnostic(!diagnostic)}
          className="text-xs font-mono px-2 py-1 rounded border border-gray-700 text-gray-400 hover:text-[#00ADEF] hover:border-[#00ADEF] transition-colors"
        >
          {diagnostic ? 'NORMAL MODE' : 'DIAGNOSTIC MODE'}
        </button>
      </div>

      <div className="relative z-10 flex-grow min-h-[180px]">
        <AnimatePresence mode="wait">
          {!diagnostic ? (
            <motion.div
              key="normal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full"
            >
              <h3 className="text-2xl font-black text-white tracking-widest mb-1">{armor.name}</h3>
              <p className="text-gray-400 mb-4">{armor.reward}</p>
            </motion.div>
          ) : (
            <motion.div
              key="diagnostic"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full border-2 border-dashed border-[#00ADEF]/50 bg-[#00ADEF]/10 rounded-lg p-4 text-[#00ADEF] font-mono text-xs shadow-[inset_0_0_15px_rgba(0,173,239,0.15)]"
            >
              <div className="flex flex-col gap-2 h-full justify-center">
                <div className="flex items-center gap-2">
                  <span className="opacity-70">&gt; CPU:</span> 
                  <span className="font-bold">{armor.specs.cpu}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="opacity-70">&gt; RAM:</span> 
                  <span className="font-bold">{armor.specs.ram}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="opacity-70">&gt; POWER:</span> 
                  <span className="font-bold">{armor.specs.power}</span>
                </div>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-dashed border-[#00ADEF]/30">
                  <span className="opacity-70">&gt; STATUS:</span> 
                  <span className="font-bold animate-pulse">{armor.specs.status}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const PrizesSection = () => {
  return (
    <section className="relative py-24 bg-black overflow-hidden" id="prizes">
      <div 
        className="absolute inset-0 z-0" 
        style={{ backgroundImage: `url("${carbonFiberPattern}")` }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-[#00ADEF] font-mono text-sm mb-2 tracking-wider">// BOUNTIES & STARK GRANTS</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-widest uppercase">Hall of Armor</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {armors.map((armor) => (
            <ArmorCard key={armor.id} armor={armor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { PrizesSection };
