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
    { value: '04/10/2026', label: 'LAUNCH DATE', rawDisplay: '04/10/2026' },
    { value: 5, label: 'CORE A.I. & DECENTRALIZED TRACKS', rawDisplay: '5' },
    { value: 8, label: 'HOURS TO COMPILE', rawDisplay: '8' },
    { value: '9 AM ONWARDS', label: 'TIME', rawDisplay: '9 AM ONWARDS' },
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
  // "Our Marks" organizer cards (public/crew/). To show a real photo on the
  // back of a card, add e.g. photo: '/crew/photos/aryan-joshi.jpg'. For a
  // transparent cut-out (PNG/WebP), also add photoCutout: true to get the
  // glowing silhouette outline (glow: '#hex' sets its colour, otherwise the
  // card colour is used). Optional title replaces the name on the
  // front of the card (the name still shows on the back).
  crew: [
    { name: 'Kritika Jha', title: 'IEEE GUSB Vice Chair', suit: 'Mark-XLIX', image: '/crew/kritika-jha-oc.webp', role: 'Organizing Committee', photo: '/crew/photos/kritika-jha.webp', photoCutout: true, color: '#4A7DFF' },
    { name: 'Aryan Joshi', title: 'ORGANIZERS', suit: 'Mark-XXVII', image: '/crew/aryan-joshi-oc.webp', role: 'Organizing Committee', photo: '/crew/photos/aryan-joshi.webp', photoCutout: true, color: '#FF7A1A' },
    { name: 'Tarun Khuswaha', title: 'IEEE GUSB Tech Lead', suit: 'Mark-XXX', image: '/crew/tarun-khuswaha-oc.webp', role: 'Organizing Committee', photo: '/crew/photos/tarun-khuswaha.webp', photoCutout: true, color: '#2BA8FF' },
    { name: 'Mohammad Rahil', title: 'IEEE GUSB Secretary', suit: 'Mark-XVII', image: '/crew/mohammad-rahil-oc.webp', role: 'Organizing Committee', photo: '/crew/photos/mohammad-rahil.webp', photoCutout: true, glow: '#FFC83D', color: '#FFC72C' },
    { name: 'Arnav Maitrey', title: 'ORGANIZERS', suit: 'Mark-XXVI', image: '/crew/arnav-maitrey-oc.webp', role: 'Organizing Committee', photo: '/crew/photos/arnav-maitrey.webp', photoCutout: true, color: '#7BD13A' },
    { name: 'Atharav Singh', title: 'IEEE GUSB Treasurer', suit: 'Mark-XLII', image: '/crew/atharav-singh-oc.webp', role: 'Organizing Committee', photo: '/crew/photos/atharav-singh.webp', photoCutout: true, glow: '#FFC83D', color: '#E8B04A' },
    { name: 'Ansh Vashisth', title: 'IEEE GUSB Chairperson', suit: 'Mark-XLI', image: '/crew/ansh-vashisth-oc.webp', role: 'Organizing Committee', photo: '/crew/photos/ansh-vashisth.webp', photoCutout: true, glow: '#FFC83D', color: '#C0985A' },
  ],
  // Footer contact block (Contact nav link scrolls here)
  contact: {
    email: 'ieeegusb@galgotiasuniversity.edu.in',
    phone: '+91 82670 93543',
    address: 'Galgotias University, Plot No. 2, Yamuna Expressway, Greater Noida, Uttar Pradesh 203201',
    mapQuery: 'Galgotias University, Greater Noida',
    organizers: 'IEEE GUSB × IEEE CIS',
  },
  // Every page section, in page order. The header nav and the footer quick
  // links are both built from this list; `header: false` keeps a section out
  // of the (space-limited) header nav.
  sections: [
    { id: 'top', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'tracks', label: 'Tracks' },
    { id: 'prizes', label: 'Prizes', header: false },
    { id: 'timeline', label: 'Timeline' },
    { id: 'marks', label: 'Marks' },
    { id: 'faq', label: 'FAQs', header: false },
    { id: 'contact', label: 'Contact' },
  ],
  // Event window (fixed IST offset so every visitor counts to the same moment)
  launchDate: '2026-10-04T10:00:00+05:30',
  durationHours: 8,
  registrationUrl: 'https://unstop.com/hackathons/vibeathon-galgotias-university-gu-greater-noida-1761022',
}

HACKATHON_DATA.navLinks = HACKATHON_DATA.sections
  .filter((section) => section.header !== false)
  .map((section) => ({ label: section.label, href: `#${section.id}` }))

// FAQs (answers marked "announced soon" are placeholders until details are final)
HACKATHON_DATA.faqs = [
  {
    question: 'Who can participate?',
    answer:
      'Student builders who want to ship something real in a single day. Full eligibility rules will be shared along with registration.',
  },
  {
    question: 'What is the team size?',
    answer: 'Teams of 2 to 3 members. Suit up with one or two teammates.',
  },
  {
    question: 'Is there a registration fee?',
    answer: 'Fee details will be announced with registration. Keep an eye on this page for the update.',
  },
  {
    question: 'What tracks can I build for?',
    answer: `${HACKATHON_DATA.tracks.length} tracks: ${HACKATHON_DATA.tracks
      .map((track) => track.category)
      .join(', ')}. Pick the one that fits your idea.`,
  },
]
