import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, ShieldCheck, Gift } from 'lucide-react';
import './PrizesSection.css';

const armors = [
  {
    id: 'mark42',
    name: 'Mark XLII',
    color: '#FFD700',
    icon: Trophy,
    rank: '1st Prize',
    amount: 'To Be Announced',
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
    rank: '2nd Prize',
    amount: 'To Be Announced',
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
    rank: '3rd Prize',
    amount: 'To Be Announced',
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
    icon: Gift,
    rank: 'Bonus Rewards',
    amount: 'Exciting Goodies',
    specs: {
      cpu: '2.1GHz Emergency Core',
      ram: '32TB Suitcase Deploy',
      power: 'Micro Arc Reactor',
      status: 'RAPID DEPLOY READY'
    }
  }
];


const ArmorCard = ({ armor, index }) => {
  const [diagnostic, setDiagnostic] = useState(false);
  const Icon = armor.icon;

  // Track the pointer so the HUD spotlight follows it across the plate
  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div className="prize-armor" style={{ '--accent': armor.color }} onPointerMove={handlePointerMove}>
      <div className="prize-armor__frame">
        <span className="prize-armor__edge" aria-hidden="true" />
        <span className="prize-armor__corner prize-armor__corner--tl" aria-hidden="true" />
        <span className="prize-armor__corner prize-armor__corner--br" aria-hidden="true" />
        <div className="prize-armor__plate">
          {/* Armor plating details */}
          <span className="prize-armor__panel-lines" aria-hidden="true" />
          <span className="prize-armor__spotlight" aria-hidden="true" />
          <span className="prize-armor__sweep" aria-hidden="true" />
          <span className="prize-armor__bracket prize-armor__bracket--tl" aria-hidden="true" />
          <span className="prize-armor__bracket prize-armor__bracket--br" aria-hidden="true" />

          <div className="relative z-10 flex justify-between items-start mb-6">
            {/* Arc reactor housing */}
            <div className="prize-reactor" aria-hidden="true">
              <span className="prize-reactor__ring" />
              <span className="prize-reactor__core">
                <Icon size={22} />
              </span>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="prize-armor__tag">UNIT 0{index + 1}</span>
              <button
                onClick={() => setDiagnostic(!diagnostic)}
                className="prize-armor__toggle"
              >
                {diagnostic ? '◂ NORMAL' : 'DIAGNOSTIC ▸'}
              </button>
            </div>
          </div>

          <div className="relative z-10 flex-grow min-h-[170px]">
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
                  <p className="prize-armor__rank">{armor.rank}</p>
                  <h3 className="prize-armor__amount">{armor.amount}</h3>
                  <div className="prize-armor__visor" aria-hidden="true" />
                  <p className="prize-armor__class">{armor.name} // Armor Class</p>
                </motion.div>
              ) : (
                <motion.div
                  key="diagnostic"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="prize-armor__diagnostic"
                >
                  <div className="flex flex-col gap-2 h-full justify-center">
                    <div className="flex items-center gap-2">
                      <span className="opacity-60">&gt; CPU:</span>
                      <span className="font-bold">{armor.specs.cpu}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="opacity-60">&gt; RAM:</span>
                      <span className="font-bold">{armor.specs.ram}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="opacity-60">&gt; POWER:</span>
                      <span className="font-bold">{armor.specs.power}</span>
                    </div>
                    <div className="prize-armor__status flex items-center gap-2 mt-2 pt-2">
                      <span className="opacity-60">&gt; STATUS:</span>
                      <span className="font-bold animate-pulse">{armor.specs.status}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrizesSection = () => {
  return (
    <section id="prizes" className="stark-shell stark-section relative">
      <div className="section-heading">
        <div>
          <p className="section-label">// PRIZE POOL & STARK GRANTS</p>
          <h2>
            BOUNTIES &amp;<br />
            <span>REWARDS.</span>
          </h2>
        </div>
        <p className="section-note">
          Rewards for the builders who suit up.<br />
          Full prize details announced soon.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {armors.map((armor, index) => (
          <ArmorCard key={armor.id} armor={armor} index={index} />
        ))}
      </div>
    </section>
  );
};

export { PrizesSection };
