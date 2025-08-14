import React, { useEffect, useMemo, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import {motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  GraduationCap,
  Phone,
  ExternalLink,
  Download,
  Moon,
  Sun,
  Menu,
  X,
  Calendar,
  MapPin,
  ArrowUpRight,
  ArrowUp,
  BookOpen,
  Award,
  Code,
  Server,
  Cpu,
  Database,
  Sparkles,
} from "lucide-react";

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved ? saved === 'dark' : !!prefersDark;
  document.documentElement.classList.toggle('dark', isDark);
}


const PROFILE = {
  "name": "Khalil Limouri",
  "tagline": "Engineering CS Degree · Mastère in IoT & Cybersecurity",
  "about": "Full Stack intern in Captain Contrat subsidiary legaltech of Implid. Last year engineering student with IoT Mastère at École des Mines de Saint-Étienne.",
  "location": "Courbevoie, France",
  "email": "khalil.limouri@gmail.com",
  "phone": "+33 6 18 51 41 06",
  "resumeUrl": "https://statics.free-work.com/users/documents/document-geD3zDwMGyOQXkbF.pdf",
  "avatarUrl": "https://avatars.githubusercontent.com/Emperor21X",
  "social": {
    "github": "https://github.com/khalil-limouri",
    "linkedin": "https://www.linkedin.com/in/khalillimouri/",
    "researchgate": "https://www.researchgate.net/profile/Khalil-Limouri",
    "scholar": "https://scholar.google.com/citations?user=PvIsLBcAAAAJ&hl=en",
    "website": ""
  }
};

const SKILLS = [
  { name: "C/C++",       level: 80, icon: <Code className="w-4 h-4" /> },
  { name: "Python",      level: 75, icon: <Cpu className="w-4 h-4" /> },
  { name: "PostgreSQL",  level: 70, icon: <Database className="w-4 h-4" /> },
  { name: "Ruby on Rails",level: 75, icon: <Server className="w-4 h-4" /> },
  { name: "React",       level: 70, icon: <Code className="w-4 h-4" /> },
  { name: "VHDL",        level: 80, icon: <Cpu className="w-4 h-4" /> },
  { name: "Git/GitHub",  level: 85, icon: <Github className="w-4 h-4" /> },
  { name: "Editors",     level: 90, icon: <Code className="w-4 h-4" /> },
];

const CATEGORIES = ["All", "AI/ML", "Systems", "Research"];

const PROJECTS = [
  {
    "title": "Verification of a RISC-V control flow integrity",
    "description": "Study of compilation options influencing static analysis of the binary for control flow integrity verification.",
    "tech": [
      "VHDL",
      "Assembly",
      "C++",
      "C",
      "Makefile"
    ],
    "category": "Systems",
    "links": {
      "demo": "",
      "code": "https://github.com/khalil-limouri/PE-RISCV"
    },
    "highlight": "project delivered in 4 weeks time"
  },
  {
    "title": "Attack on embedded CNN in the Nucleo kit",
    "description": "Deployment of several side-channel attacks on a CNN implementation for the Nucleo development kit, using API Tensorflow & SKLearn.",
    "tech": [
      "Python",
      "API Tensorflow",
      "SKLearn"
    ],
    "category": "AI/ML",
    "links": {
      "demo": "",
      "code": "https://github.com/khalil-limouri/Embedded-CNN"
    }
  },
  {
    "title": "Co-design of an AES decryptor in VHDL for the Zedboard™ kit",
    "description": "Bitstream handling for field programmable gate arrays. Use of synthesis and implementation tools in post-description.",
    "tech": [
      "C",
      "Verilog",
      "SystemVerilog",
      "VHDL"
    ],
    "category": "Research",
    "links": {
      "demo": "",
      "code": "https://github.com/khalil-limouri/AES-decryption"
    },
    "highlight": "project part of PhD thesis"
  }
];

const EXPERIENCE = [
  {
    "role": "Full Stack Engineering intern",
    "org": "Captain Contrat (Subsidiary of Implid)",
    "start": "Mars 2025",
    "end": "September 2025",
    "location": "Paris",
    "bullets": [
      "Enhancing skills in the technologies and languages used by the team (Udemy courses)",
      "Development of User Stories and functionalities for internal and client applications.      -",
      "Participation in US creation and design meetings with various teams (product, design, etc.)"
    ]
  },
  {
    "role": "IoT Expert apprentice",
    "org": "Alizent International (Subsidiary of Air Liquid)",
    "start": "October 2023",
    "end": "October 2024",
    "location": "Paris La Défense",
    "bullets": [
      "Presentation of technical study on device energy consumption to expert clients",
      "Apprentice project manager for the deployment of an MDM tool for telemetry devices"
    ]
  }
];

const EDUCATION = [
  {
    "degree": "Mastère in IoT and Cybersecurity",
    "school": "École des Mines de Saint-Étienne",
    "years": "2023 - 2024",
    "details": [
      "Connected Objects, Gateways, Networks, Securing the IoT chain"
    ]
  },
  {
    "degree": "Master Degree in Microelectronics and Computer Science",
    "school": "École des Mines de Saint-Étienne",
    "years": "2020 - 2025",
    "details": [
      "Computer Science, Web development, Supply Chain, Microelectronics"
    ]
  },
  {
    "degree": "Preparatory Classes",
    "school": "Omar Ibn Al-Khattab High School",
    "years": "2018 - 2020",
    "details": [
      "MPSI, MP (Math & Physics)"
    ]
  }
];

const PUBLICATIONS = [];

const AWARDS = [
  { "name": "Local Olympiad of Mathematics and Physics — Participant", "year": 2018 },
  { "name": "SIDO 2023 Showroom (AI, IoT) — Alizent’s representative ", "year": 2023 }
];

const cx = (...classes) => classes.filter(Boolean).join(" ");

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

function useDarkMode() {
  const getInitial = () => {
    if (typeof window === 'undefined') return false;
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    } catch {
      return false;
    }
  };

  const [dark, setDark] = useState(getInitial);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return { dark, setDark };
}

function Section({ id, title, children, className }) {
  return (
    <section id={id} className={cx("scroll-mt-24 py-12 md:py-16", className)}>
      <motion.h2
        {...fadeUp}
        className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 md:mb-8"
      >
        {title}
      </motion.h2>
      {children}
    </section>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm font-medium bg-white/60 dark:bg-white/5 backdrop-blur border-black/10 dark:border-white/10">
      {children}
    </span>
  );
}

function Progress({ value }) {
  return (
    <div className="w-full h-2 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
      <div
        className="h-full bg-gray-900 dark:bg-gray-100"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

function Header({ onNav, dark, setDark }) {
  const [open, setOpen] = useState(false);
  const links = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "publications", label: "Publications" },
    { id: "contact", label: "Contact" },
  ];

  const NavLinks = () => (
    <ul className="flex flex-col md:flex-row gap-4 md:gap-6">
      {links.map((l) => (
        <li key={l.id}>
          <button
            onClick={() => {
              onNav(l.id);
              setOpen(false);
            }}
            className="text-sm md:text-[15px] font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            {l.label}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/60 dark:bg-black/30 border-b border-black/10 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <button
            className="flex items-center gap-2"
            onClick={() => onNav("top")}
            aria-label="Go to top"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-black/10 dark:border-white/10">
              <img src={PROFILE.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <span className="font-semibold tracking-tight">{PROFILE.name}</span>
          </button>

          <nav className="hidden md:block">
            <NavLinks />
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={PROFILE.resumeUrl}
              className="hidden sm:inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium hover:shadow-sm bg-white/70 dark:bg-white/5 border-black/10 dark:border-white/10"
            >
              <Download className="w-4 h-4" /> Resume
            </a>
            <button
              className="inline-flex items-center justify-center rounded-xl border w-10 h-10 bg-white/70 dark:bg-white/5 border-black/10 dark:border-white/10"
              aria-label="Toggle theme"
              onClick={() => setDark(!dark)}
              title="Toggle light/dark"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              className="md:hidden inline-flex items-center justify-center rounded-xl border w-10 h-10 bg-white/70 dark:bg-white/5 border-black/10 dark:border-white/10"
              aria-label="Toggle navigation"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden pb-4"
            >
              <NavLinks />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function Hero({ onNav }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center py-14 md:py-20">
          <motion.div {...fadeUp} className="space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-medium px-2.5 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 w-fit">
              <Sparkles className="w-3.5 h-3.5" /> Open to work • 10/2025
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              {PROFILE.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
              {PROFILE.tagline}
            </p>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-prose">
              {PROFILE.about}
              </p>
              
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium hover:shadow-sm bg-white/80 dark:bg-white/5 border-black/10 dark:border-white/10"
              >
                <Mail className="w-4 h-4" /> Email me
              </a>
              <button
                onClick={() => onNav("projects")}
                className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium hover:shadow-sm bg-gray-900 text-white dark:bg-white dark:text-black border-black/10 dark:border-white/10"
              >
                <ArrowUpRight className="w-4 h-4" /> View projects
              </button>
            </div>
            <div className="flex items-center gap-4 pt-4 text-gray-600 dark:text-gray-400">
              <span className="inline-flex items-center gap-1 text-sm">
                <MapPin className="w-3.5 h-3.5" /> {PROFILE.location}
              </span>
              <span className="inline-flex items-center gap-1 text-sm">
                <Calendar className="w-3.5 h-3.5" /> {new Date().getFullYear()}
              </span>
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden border bg-white/60 dark:bg-white/5 border-black/10 dark:border-white/10">
              <img
                src={PROFILE.avatarUrl}
                alt="portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid md:grid-cols-2 gap-6">
        {SKILLS.map((s) => (
          <motion.div key={s.name} {...fadeUp} className="rounded-2xl border p-4 md:p-5 bg-white/70 dark:bg-white/5 border-black/10 dark:border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium">
                {s.icon}
                <span>{s.name}</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{s.level}%</span>
            </div>
            <div className="mt-3">
              <Progress value={s.level} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {["C/C++","Python","PostgreSQL","Ruby on Rails","React","VHDL","Git/GitHub","Editors"].map((t) => (
          <Pill key={t}>{t}</Pill>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <Section id="projects" title="Projects">
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cx(
              "px-3 py-1.5 rounded-full text-sm border",
              filter === c
                ? "bg-gray-900 text-white dark:bg-white dark:text-black border-black/10 dark:border-white/10"
                : "bg-white/70 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-black/10 dark:border-white/10"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((p) => (
          <motion.article
            key={p.title}
            {...fadeUp}
            className="rounded-2xl border p-5 bg-white/70 dark:bg-white/5 border-black/10 dark:border-white/10"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{p.description}</p>
              </div>
              {p.highlight && (
                <span className="text-[11px] px-2 py-1 rounded-full border bg-amber-50 dark:bg-amber-500/10 border-amber-300/40 text-amber-700 dark:text-amber-300 whitespace-nowrap">
                  <Award className="inline w-3.5 h-3.5 mr-1" /> {p.highlight}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {p.tech.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>

            <div className="flex gap-3 mt-4">
              {p.links?.demo && (
                <a
                  href={p.links.demo}
                  className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                >
                  <ExternalLink className="w-4 h-4" /> Live demo
                </a>
              )}
              {p.links?.code && (
                <a
                  href={p.links.code}
                  className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                >
                  <Github className="w-4 h-4" /> Source
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="grid gap-6">
        {EXPERIENCE.map((e) => (
          <motion.div
            key={e.role + e.org}
            {...fadeUp}
            className="rounded-2xl border p-5 bg-white/70 dark:bg-white/5 border-black/10 dark:border-white/10"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-base font-semibold tracking-tight">
                <BriefcaseIcon /> {e.role} · {e.org}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {e.start} – {e.end} · {e.location}
              </div>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
              {e.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-briefcase"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
      <path d="M2 13h20"></path>
    </svg>
  );
}

function Education() {
  return (
    <Section id="education" title="Education">
      <div className="grid md:grid-cols-2 gap-6">
        {EDUCATION.map((ed) => (
          <motion.div
            key={ed.degree}
            {...fadeUp}
            className="rounded-2xl border p-5 bg-white/70 dark:bg-white/5 border-black/10 dark:border-white/10"
          >
            <div className="flex items-center gap-2 text-base font-semibold tracking-tight">
              <GraduationCap className="w-5 h-5" /> {ed.degree}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{ed.school} · {ed.years}</div>
            <ul className="mt-3 list-disc list-inside space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
              {ed.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Publications() {
  if (!PUBLICATIONS.length) return null;
  return (
    <Section id="publications" title="Publications">
      <div className="grid gap-6">
        {PUBLICATIONS.map((p) => (
          <motion.article
            key={p.title}
            {...fadeUp}
            className="rounded-2xl border p-5 bg-white/70 dark:bg-white/5 border-black/10 dark:border-white/10"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold tracking-tight">{p.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{p.venue} · {p.year}</p>
              </div>
              <a href={p.link} className="text-sm inline-flex items-center gap-1 hover:underline">
                <BookOpen className="w-4 h-4" /> Read
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`Contact from ${name || "Portfolio"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    return `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  }, [name, email, message]);

  return (
    <Section id="contact" title="Contact">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <motion.div {...fadeUp} className="rounded-2xl border p-5 bg-white/70 dark:bg-white/5 border-black/10 dark:border-white/10">
          <h3 className="font-semibold tracking-tight">Let's connect</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            For roles, collaborations, or questions, drop a note.
          </p>
          <div className="mt-4 space-y-3 text-sm flex flex-col">
            <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 hover:underline">
              <Mail className="w-4 h-4" /> {PROFILE.email}
            </a>
            <div className="inline-flex items-center gap-2">
              <Phone className="w-4 h-4" /> {PROFILE.phone}
            </div>
            <div className="flex gap-3 pt-2">
              <a href={PROFILE.social.github} className="inline-flex items-center gap-1 hover:underline">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href={PROFILE.social.linkedin} className="inline-flex items-center gap-1 hover:underline">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>
        </motion.div>

        <motion.form
          {...fadeUp}
          onSubmit={(e) => e.preventDefault()}
          className="rounded-2xl border p-5 bg-white/70 dark:bg-white/5 border-black/10 dark:border-white/10"
        >
          <div className="grid gap-3">
            <label className="text-sm font-medium">
              Name
              <input
                className="mt-1 w-full rounded-xl border px-3 py-2 bg-transparent outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 border-black/10 dark:border-white/10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                required
              />
            </label>
            <label className="text-sm font-medium">
              Email
              <input
                type="email"
                className="mt-1 w-full rounded-xl border px-3 py-2 bg-transparent outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 border-black/10 dark:border-white/10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                required
              />
            </label>
            <label className="text-sm font-medium">
              Message
              <textarea
                className="mt-1 w-full min-h-[120px] rounded-xl border px-3 py-2 bg-transparent outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 border-black/10 dark:border-white/10"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi, I loved your project..."
                required
              />
            </label>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <a
              href={mailto}
              className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium hover:shadow-sm bg-gray-900 text-white dark:bg-white dark:text-black border-black/10 dark:border-white/10"
            >
              Send email
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium hover:shadow-sm bg-white/80 dark:bg-white/5 border-black/10 dark:border-white/10"
            >
              Or open mail app
            </a>
          </div>
        </motion.form>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="py-10 text-center text-sm text-gray-600 dark:text-gray-400">
      <div className="flex justify-center gap-4 mb-2">
        <a href={PROFILE.social.github} className="inline-flex items-center gap-1 hover:underline">
          <Github className="w-4 h-4" /> GitHub
        </a>
        <a href={PROFILE.social.linkedin} className="inline-flex items-center gap-1 hover:underline">
          <Linkedin className="w-4 h-4" /> LinkedIn
        </a>
      </div>
      <p>
        © {new Date().getFullYear()} {PROFILE.name}. Built with React.
      </p>
    </footer>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 rounded-full border w-11 h-11 flex items-center justify-center bg-white/80 dark:bg-white/5 backdrop-blur border-black/10 dark:border-white/10 shadow"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function PortfolioApp() {
  const topRef = useRef(null);
  const theme = useDarkMode();

  const navTo = (id) => {
    if (id === "top") {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={theme.dark ? "dark" : ""}>
    <div ref={topRef} className="min-h-screen text-gray-900 dark:text-gray-100 bg-white dark:bg-black">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-white dark:focus:bg-black focus:text-black dark:focus:text-white focus:px-3 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>

      <Header onNav={navTo} dark={theme.dark} setDark={theme.setDark} />
      <main id="content" className="max-w-6xl mx-auto px-4 md:px-6">
        <Hero onNav={navTo} />
        <Section id="about" title="About">
          <motion.div {...fadeUp} className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-6 md:space-y-8">
              <p>Full Stack intern in Captain Contrat subsidiary legaltech of Implid.</p>
              <p>Last year engineering student with IoT Mastère at École des Mines de Saint-Étienne.</p>
              </div>
            <div className="rounded-2xl border p-4 bg-white/70 dark:bg-white/5 border-black/10 dark:border-white/10">
              <h3 className="font-semibold tracking-tight">Highlights</h3>
              <ul className="mt-2 text-sm space-y-1.5 text-gray-700 dark:text-gray-300 list-disc list-inside">
                <li>Full‑stack (Ruby on Rails · React · PostgreSQL)</li>
                <li>RISC-V control flow integrity verification project</li>
                <li>AES decryptor co-design in VHDL (Zedboard)</li>
                <li>Mathematics & Computer Science teacher (high school & academic) at Complétude</li>
              </ul>
            </div>
          </motion.div>
        </Section>
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Publications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      </div>
    </div>
  );
}
