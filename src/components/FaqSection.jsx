import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HACKATHON_DATA } from '../data/hackathon'
import './FaqSection.css'

function FaqItem({ faq, index, open, onToggle }) {
  const baseId = useId()
  const panelId = `${baseId}-answer`
  const buttonId = `${baseId}-question`
  const number = String(index + 1).padStart(2, '0')

  return (
    <motion.li
      className={`faq-item${open ? ' is-open' : ''}`}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="faq-item__panel">
        <span className="faq-item__rail" aria-hidden="true" />
        <span className="faq-item__sweep" aria-hidden="true" />

        <h3 className="faq-item__heading">
          <button
            id={buttonId}
            type="button"
            className="faq-item__question"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={onToggle}
          >
            <span className="faq-item__num">Q-{number}</span>
            <span className="faq-item__text">{faq.question}</span>
            {/* Mini arc reactor toggle: + turns into × when open */}
            <span className="faq-item__toggle" aria-hidden="true">
              <span className="faq-item__toggle-ring" />
              <span className="faq-item__toggle-cross" />
            </span>
          </button>
        </h3>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="faq-item__answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="faq-item__answer-inner">
                <span className="faq-item__jarvis">JARVIS //</span>
                <p>{faq.answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  )
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null)
  const { faqs, contact } = HACKATHON_DATA

  return (
    <section id="faq" className="stark-shell stark-section faq-section relative">
      <span className="faq-section__grid" aria-hidden="true" />

      <div className="relative z-10">
        <div className="section-heading faq-heading">
          <div>
            <p className="section-label">// JARVIS KNOWLEDGE BASE</p>
            <h2>
              MISSION<br />
              <span>FAQs.</span>
            </h2>
          </div>
          <p className="section-note">
            Everything you need before suit-up.<br />
            Still stuck? Ping mission control at{' '}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </div>

        <ul className="faq-list">
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.question}
              faq={faq}
              index={index}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
