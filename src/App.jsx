import { useMemo, useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  FaCss3Alt,
  FaGitAlt,
  FaHtml5,
  FaDownload,
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaLocationDot,
  FaPhone,
  FaMobileScreenButton,
} from 'react-icons/fa6'
import { FaReact } from 'react-icons/fa'
import {
  SiJavascript,
  SiMongodb,
  SiRedux,
  SiTypescript,
  SiTailwindcss,
  SiAntdesign,
  SiMui,
  SiPostman,
} from 'react-icons/si'
import { content } from './content'
import profileUrl from './assets/profile.png'
import heroLinesUrl from './assets/hero-lines.svg'
import './index.css'

const ICONS = {
  react: FaReact,
  htmlcss: HtmlCssIcon,
  javascript: SiJavascript,
  typescript: SiTypescript,
  redux: SiRedux,
  git: FaGitAlt,
  mongodb: SiMongodb,
  tailwindcss: SiTailwindcss,
  antdesign: SiAntdesign,
  mui: SiMui,
  api: SiPostman,
  responsive: FaMobileScreenButton,
}

function HtmlCssIcon(props) {
  return (
    <span className="htmlCssIcon" aria-hidden="true" {...props}>
      <FaHtml5 className="htmlCssIcon__html" />
      <FaCss3Alt className="htmlCssIcon__css" />
    </span>
  )
}

function SectionHeading({ title }) {
  return (
    <div className="sectionHeading">
      <h2>{title}</h2>
      <div className="sectionHeading__line" />
    </div>
  )
}

function TagPills({ tags }) {
  return (
    <div className="tagPills">
      {tags.map((t) => (
        <span className="tagPills__item" key={t}>
          {t}
        </span>
      ))}
    </div>
  )
}

function SkillCard({ level, title, note, iconKey }) {
  const Icon = ICONS[iconKey]
  return (
    <motion.div
      className={`skillCard skillCard--${iconKey}`}
      whileHover={{ y: -8, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
    >
      <div className="skillCard__level">{level}</div>
      <div className="skillCard__icon">{Icon ? <Icon /> : null}</div>
      <div className="skillCard__title">{title}</div>
      <div className="skillCard__divider" />
      <div className="skillCard__note">{note || ' '}</div>
    </motion.div>
  )
}

function ProjectThumb({ index }) {
  return (
    <div className={`projectThumb projectThumb--${index}`} aria-hidden="true">
      <div className="projectThumb__bar" />
      <div className="projectThumb__content">
        <div className="projectThumb__left" />
        <div className="projectThumb__right" />
      </div>
    </div>
  )
}

function copy(text) {
  if (!text) return
  if (navigator?.clipboard?.writeText) {
    navigator.clipboard.writeText(text)
    return
  }
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
}

export default function App() {
  const [active, setActive] = useState('about')
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  const { scrollYProgress } = useScroll()

  const heroLinesY = useTransform(scrollYProgress, [0, 0.4], [0, 180])
  const heroPhotoY = useTransform(scrollYProgress, [0, 0.4], [0, -80])

  const navItems = useMemo(() => content.nav, [])

  useEffect(() => {
    if (isGalleryOpen) {
      const scrollY = window.scrollY
      document.body.setAttribute('data-scroll-pos', scrollY)
      document.documentElement.style.overflow = 'hidden'
    } else {
      const savedPos = document.body.getAttribute('data-scroll-pos')
      document.documentElement.style.overflow = ''
      if (savedPos !== null) {
        window.scrollTo({
          top: parseInt(savedPos),
          behavior: 'instant',
        })
      }
    }
  }, [isGalleryOpen])

  function onNavClick(id) {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
  }

  return (
    <div className="page">
      <header className="topNav">
        <nav className="topNav__inner">
          {navItems.map((item) => (
            <button
              className={`topNav__item ${active === item.id ? 'isActive' : ''}`}
              key={item.id}
              type="button"
              onClick={() => onNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="snap-section" id="about">
        <section className="hero" id="hero">
          <motion.img
            className="hero__lines"
            style={{ y: heroLinesY }}
            alt=""
            src={heroLinesUrl}
          />
          <div className="container hero__inner">
            <motion.div
              className="hero__left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
            >
              <div className="hero__title">
                <span className="hero__titleIntro">{content.hero.intro}</span>{' '}
                <span className="hero__titleName">{content.hero.name}</span>
              </div>
              <div className="hero__role">{content.hero.role}</div>
              <p className="hero__summary">{content.hero.summary}</p>
              <button className="btn btn--gold" type="button">
                <FaDownload />
                {content.hero.cta}
              </button>
              <div className="hero__social">
                <a className="socialBtn" href="#" aria-label="GitHub">
                  <FaGithub />
                </a>
                <a className="socialBtn" href="#" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
                <a className="socialBtn" href="#" aria-label="Email">
                  <FaEnvelope />
                </a>
              </div>
            </motion.div>

            <div className="hero__right">
              <motion.div
                className="hero__photoFrame"
                style={{ y: heroPhotoY }}
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: false, margin: '-100px' }}
                transition={{ duration: 1, type: 'spring', stiffness: 100 }}
              >
                <img className="hero__photo" alt="" src={profileUrl} />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section container" id="about">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading title="About" />
            <p className="sectionText">{content.about}</p>
          </motion.div>
        </section>
      </div>

      <main className="main">
        <section className="section container snap-section" id="skills">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading title="My Skills" />
            <div className="skillsGrid">
              {content.skills.map((s, idx) => (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <SkillCard iconKey={s.key} level={s.level} note={s.note} title={s.title} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="section container snap-section" id="experience">
          <SectionHeading title="Experience" />
          <div className="experienceList">
            {content.experience.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: '-100px' }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="experienceWrap"
              >
                <div className="experienceDate">{exp.range}</div>
                <div className="experienceCard">
                  <div className="experienceCard__top">
                    <div className="experienceCard__role">{exp.role}</div>
                    <div className="experienceCard__right">
                      <div className="experienceCard__logo" aria-hidden="true">
                        <span>{exp.company.charAt(0)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="experienceCard__company">{exp.company}</div>
                  <ul className="experienceCard__list">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>

                  {exp.keyProjects && (
                    <>
                      <div className="experienceCard__subTitle">Key projects:</div>
                      <ul className="experienceCard__list experienceCard__list--small">
                        {exp.keyProjects.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  <TagPills tags={exp.tags} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="section container snap-section" id="projects">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeading title="Featured Projects" />
            <div className="projectsGrid">
              {content.projects.map((p, idx) => (
                <motion.div
                  className="projectCard"
                  key={`${p.title}-${idx}`}
                  whileHover={{ y: -10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <ProjectThumb index={idx + 1} />
                  <div className="projectCard__body">
                    <div className="projectCard__title">{p.title}</div>
                    <div className="projectCard__desc">{p.desc}</div>
                    <TagPills tags={p.tags} />
                    <div className="projectCard__actions">
                      {p.live && (
                        <a
                          className="btn btn--gold btn--sm"
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {p.cta1}
                        </a>
                      )}
                      <a
                        className="btn btn--dark btn--sm"
                        href={p.repo || '#'}
                        target="_blank"
                        rel="noreferrer"
                        style={!p.repo ? { display: 'none' } : {}}
                      >
                        {p.cta2}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                className="projectCard projectCard--other"
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => setIsGalleryOpen(true)}
              >
                <div className="projectCard__title" style={{ fontSize: '20px', marginBottom: '8px' }}>Other Projects</div>
                <div className="projectCard__desc" style={{ minHeight: 'auto' }}>Explore a collection of my other freelance websites.</div>
                <div className="projectCard__actions" style={{ justifyContent: 'center', marginTop: '14px' }}>
                  <button className="btn btn--gold btn--sm">View Gallery</button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section className="section container snap-section" id="contact">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
            >
              <SectionHeading title="Contact Me" />
              <div className="contactGrid">
                <div className="contactForm">
                  <input placeholder={content.contact.form.name} />
                  <input placeholder={content.contact.form.email} />
                  <textarea placeholder={content.contact.form.message} rows={5} />
                  <button className="btn btn--gold" type="button">
                    {content.contact.form.send}
                  </button>
                </div>

                <div className="contactInfoGrid">
                  <motion.div
                    className="infoCard"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6, backgroundColor: 'rgba(26, 68, 80, 0.45)' }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: 0 }}
                  >
                    <div className="infoCard__head">
                      <div className="infoCard__title">
                        <FaEnvelope />
                        Email
                      </div>
                    </div>
                    <div className="infoCard__value">{content.contact.info.email}</div>
                    <button
                      className="infoCard__btn"
                      type="button"
                      onClick={() => copy(content.contact.info.email)}
                    >
                      {content.contact.actions.copy}
                    </button>
                  </motion.div>

                  <motion.div
                    className="infoCard"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6, backgroundColor: 'rgba(26, 68, 80, 0.45)' }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="infoCard__head">
                      <div className="infoCard__title">
                        <FaPhone />
                        Phone
                      </div>
                    </div>
                    <div className="infoCard__value">{content.contact.info.phone}</div>
                    <button
                      className="infoCard__btn"
                      type="button"
                      onClick={() => copy(content.contact.info.phone)}
                    >
                      {content.contact.actions.copy}
                    </button>
                  </motion.div>

                  <motion.div
                    className="infoCard"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6, backgroundColor: 'rgba(26, 68, 80, 0.45)' }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="infoCard__head">
                      <div className="infoCard__title">
                        <FaLocationDot />
                        Location
                      </div>
                    </div>
                    <div className="infoCard__value">{content.contact.info.location}</div>
                  </motion.div>

                  <motion.div
                    className="infoCard"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6, backgroundColor: 'rgba(26, 68, 80, 0.45)' }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="infoCard__head">
                      <div className="infoCard__title">
                        <FaGithub />
                        Social
                      </div>
                    </div>
                    <div className="infoCard__social">
                      <a href="#" aria-label="GitHub">
                        <FaGithub />
                      </a>
                      <a href="#" aria-label="LinkedIn">
                        <FaLinkedinIn />
                      </a>
                      <a href="#" aria-label="Email">
                        <FaEnvelope />
                      </a>
                    </div>
                    <button className="infoCard__btn" type="button">
                      {content.contact.actions.link}
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>{content.footer}</p>
        </div>
      </footer>

      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            className="modalOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsGalleryOpen(false)}
          >
            <motion.div
              className="modalContent"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="modalCloseBtn"
                onClick={() => setIsGalleryOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
              <div className="sectionHeading" style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '24px' }}>Other Projects</h2>
                <div className="sectionHeading__line" />
              </div>
              <div className="modalGrid">
                {content.otherProjects.map((proj) => (
                  <a
                    key={proj.name}
                    href={proj.url}
                    target="_blank"
                    rel="noreferrer"
                    className="modalItem"
                  >
                    <span className="modalItem__name">{proj.name}</span>
                    <TagPills tags={proj.tags || []} />
                    <span className="modalItem__url">{proj.url.replace('https://', '').replace('/', '')}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
