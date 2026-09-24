import { Bot, Shield, Cpu, Zap, BrainCircuit } from 'lucide-react'

export const HACKATHON_DATA = {
  name: 'VIBEATHON',
  subtitle: 'ONLINE',
  tagline: 'Think It. Prompt It. Build It.',
  manifesto: ['Think It. Prompt It. Build It.', '8 HOURS. NO STRINGS ON ME.'],
  kicker: 'TRANSMISSION 001 // PROTOCOL OVERRIDE',
  titleGlitch: 'CODE',
  titleRest: 'BEYOND BOUNDARIES.',
  stats: [
    { value: '04-10-2026', label: 'DATE', rawDisplay: '04-10-2026' },
    { value: 5, label: 'CORE A.I. & DECENTRALIZED TRACKS', rawDisplay: '5' },
    { value: 8, label: 'HOURS TO COMPILE', rawDisplay: '8' },
    { value: '10 AM Onwards', label: 'TIME', rawDisplay: '10 AM Onwards' },
  ],
  tracks: [
    {
      number: '01',
      name: 'WAR MACHINE',
      image: '/tracks/suit-1.jpg',
      category: 'AI / ML',
      detail: 'Build intelligent systems that learn, reason, and act. LLMs, computer vision, autonomous agents — all welcome.',
      icon: Bot,
    },
    {
      number: '02',
      name: 'MARK II',
      image: '/tracks/suit-2.jpg',
      category: 'WEB3',
      detail: 'Decentralized apps, smart contracts, on-chain protocols. Reimagine trust, ownership, and open networks.',
      icon: Shield,
    },
    {
      number: '03',
      name: 'MARK L',
      image: '/tracks/suit-3.jpg',
      category: 'OPEN INNOVATION',
      detail: 'No constraints. Build anything that solves a real problem — products, tools, experiences, experiments.',
      icon: Cpu,
    },
    {
      number: '04',
      name: 'MARK I',
      image: '/tracks/suit-4.jpg',
      category: 'BLOCKCHAIN',
      detail: 'Ledger tech, DeFi, tokenomics, and trustless infrastructure. Prove that decentralization works.',
      icon: Zap,
    },
    {
      number: '05',
      name: 'MARK XLII',
      image: '/tracks/suit-5.jpg',
      category: 'CYBERSECURITY',
      detail: 'Hack the system before someone else does. Build tools for threat detection, secure auth, encryption, and zero-trust architectures.',
      icon: BrainCircuit,
    }
  ],
  phases: [
    {
      number: 'PHASE 01',
      title: 'SYSTEM DIAGNOSTICS',
      detail: 'Recon & Architecture Setup (Hours 0-2)',
    },
    {
      number: 'PHASE 02',
      title: 'ASSEMBLE ARMOR',
      detail: 'Core Prototyping & AI Ingestion (Hours 2-6)',
    },
    {
      number: 'PHASE 03',
      title: 'GLOBAL DEPLOYMENT',
      detail: 'Final Compile & Pitch Upload (Hours 6-8)',
    },
  ],
  navLinks: [
    { label: 'Home', href: '#top' },
    { label: 'About', href: '#about' },
    { label: 'Tracks', href: '#tracks' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Contact', href: '#contact' },
  ],
  registrationUrl: '#tracks',
}
