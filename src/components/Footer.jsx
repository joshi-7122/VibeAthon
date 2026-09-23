import { ArrowUpRight } from 'lucide-react'
import { HACKATHON_DATA } from '../data/hackathon'

export function Footer() {
  return (
    <footer id="contact" className="stark-shell stark-footer">
      <span>
        {HACKATHON_DATA.name} © 2026 / STARK R&D NETWORK
      </span>
      <a href="#top" className="group">
        RETURN TO SYSTEM <ArrowUpRight className="inline-block w-4 h-4 ml-1 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </footer>
  )
}
