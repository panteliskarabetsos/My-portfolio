// Single source of truth for the site's content. Everything here mirrors the CV.

export const site = {
  name: "Pantelis Karabetsos",
  role: "Informatics & Computer Engineer",
  degree: "MEng",
  location: "Athens, Greece",
  url: "https://www.pkarabetsos.com",
  email: "contact@pkarabetsos.com",
  resume: "/Resume.pdf",
  github: "https://github.com/panteliskarabetsos",
  linkedin: "https://www.linkedin.com/in/panteliskarabetsos/",
  description:
    "Informatics & Computer Engineer (MEng) focused on network security, intrusion detection and adversarial machine learning. Based in Athens, Greece.",
  seeking:
    "Open to entry-level roles in network security, intrusion detection and digital forensics.",
};

export const nav = [
  { name: "Research", href: "/research" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const thesis = {
  title: "Adversarial Attacks to Evade ML-based Network Intrusion Detection Systems",
  short: "Adversarial attacks on ML-based NIDS",
  date: "Sep 2026",
  institution: "University of West Attica",
  dataset: "CICIDS2017",
  models: ["Multilayer Perceptron (MLP)", "Random Forest"],
  attacks: [
    { name: "FGSM", kind: "White-box, gradient", note: "Fast Gradient Sign Method: a single-step perturbation along the loss gradient." },
    { name: "PGD", kind: "White-box, gradient", note: "Projected Gradient Descent: iterative FGSM, projected back into the allowed perturbation set." },
    { name: "ZOO", kind: "Black-box, score-based", note: "Zeroth-Order Optimization: estimates gradients from model confidence scores alone." },
    { name: "HopSkipJump", kind: "Black-box, decision-based", note: "Walks the decision boundary using only the final label, no scores or gradients." },
  ],
  threatModels: [
    {
      level: "White-box",
      knows: "Full access to the model, including its gradients.",
      attacks: ["FGSM", "PGD"],
    },
    {
      level: "Gray-box",
      knows: "Knows the features and data, but not the target model. Crafts examples on a substitute and transfers them.",
      attacks: ["MLP → RF", "RF → MLP"],
    },
    {
      level: "Black-box",
      knows: "Can only query the deployed model, seeing either confidence scores or just the final label.",
      attacks: ["ZOO", "HopSkipJump"],
    },
  ],
  tools: ["PyTorch", "scikit-learn", "Adversarial Robustness Toolbox", "NumPy", "pandas"],
  // Ranges are reported exactly as in the thesis summary; nothing here is interpolated.
  results: [
    { label: "Unconstrained attacks", detail: "Any feature may be perturbed", min: 57.8, max: 100 },
    { label: "Realistic constraints", detail: "Only timing and packet-size features", min: 45.5, max: 78.6 },
    { label: "Transfer · MLP → RF", detail: "Unconstrained MLP-crafted examples", min: 100, max: 100 },
    { label: "Transfer · RF → MLP", detail: "Reverse direction", min: 0, max: 39 },
  ],
  findings: [
    "Both detectors reached over 99% detection on clean traffic, yet unconstrained attacks evaded them in 57.8–100% of cases.",
    "Restricting the attacker to realistic timing and packet-size changes lowered evasion, but did not eliminate it.",
    "Transferability was strongly asymmetric: examples crafted on the MLP fooled the Random Forest every time, while the reverse stayed at 0–39%.",
    "Robustness should be evaluated across models and under realistic attacker constraints, not against a single detector.",
  ],
};

export const projects = [
  {
    slug: "oasis",
    title: "Oasis",
    subtitle: "Agrotourism & wellness booking platform",
    description:
      "A booking platform for wellness and agritourism experiences across Crete. Visitors browse experiences, see real-time availability and pay online; an admin dashboard manages clients, experiences and the schedule.",
    highlights: ["Real-time availability", "Stripe payments", "Admin dashboard", "reCAPTCHA & auth"],
    tech: ["Next.js", "Node.js", "Prisma", "PostgreSQL", "NextAuth.js", "Stripe", "Tailwind CSS"],
    image: "/images/oasis.png",
    github: "https://github.com/panteliskarabetsos/oasis",
    demo: "https://youroasis.gr/",
    featured: true,
  },
  {
    slug: "drkollia",
    title: "Dr. Kollia",
    subtitle: "Clinic website & appointment system",
    description:
      "Website and patient booking system for an endocrinology clinic in Athens, with admin tools to manage appointments, patients and the weekly schedule.",
    highlights: ["Online booking", "Patient management", "Email notifications"],
    tech: ["Next.js", "Supabase", "Nodemailer", "Tailwind CSS", "Vercel"],
    image: "/images/drkollia.png",
    github: "https://github.com/panteliskarabetsos/drkollia",
    demo: "https://drkollia.com/",
    featured: true,
  },
  {
    slug: "booknow",
    title: "BookNow",
    subtitle: "Apartment rental platform",
    description:
      "Full-stack vacation rental app: search by city, dates and guests, check availability and book, backed by a custom REST API.",
    highlights: ["Search & filtering", "Availability checks", "REST API"],
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "/images/booknow.png",
    github: "https://github.com/panteliskarabetsos/BookNow",
    demo: "https://book-now-amber.vercel.app/",
    featured: true,
  },
  {
    slug: "ir-search",
    title: "Wikipedia Search Engine",
    subtitle: "Crawler, inverted index & ranking",
    description:
      "A mini search engine in Python that crawls Wikipedia, builds an inverted index and answers Boolean queries with TF-IDF, BM25 and vector-space ranking, plus an evaluation CLI.",
    highlights: ["Inverted index", "TF-IDF · BM25 · VSM", "NLTK preprocessing"],
    tech: ["Python", "NLTK", "BeautifulSoup", "NumPy"],
    github: "https://github.com/panteliskarabetsos/IR-Lab-Project",
  },
  {
    slug: "drzisis",
    title: "Dr. Zisis",
    subtitle: "Professional portfolio for a physician",
    description:
      "A responsive portfolio and digital CV for a medical graduate, presenting research, clinical interests and recommendations.",
    tech: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    image: "/images/drzisis.png",
    github: "https://github.com/panteliskarabetsos/drzisis-portfolio",
    demo: "https://www.drzisis.com/",
  },
  {
    slug: "payroll",
    title: "Payroll App",
    subtitle: "Test-driven C# application",
    description:
      "A C# application built test-first with NUnit, focused on clean, testable logic and high coverage.",
    tech: ["C#", ".NET", "NUnit"],
    github: "https://github.com/panteliskarabetsos/PayrollApp",
  },
];

export const education = [
  {
    period: "2020 – 2026",
    title: "Integrated Master's (MEng), Informatics & Computer Engineering",
    org: "University of West Attica",
    note: "Thesis: adversarial attacks against ML-based network intrusion detection.",
  },
];

export const training = [
  {
    title: "Hack The Box Academy",
    org: "Offensive security",
    note: "Training modules and practical labs in offensive security fundamentals, in Linux-based attack environments.",
  },
];

export const certifications = [
  { name: "Digital Forensics", issuer: "University of Patras" },
  { name: "Cybersecurity in Critical Sectors", issuer: "University of Piraeus" },
  {
    name: "Career Essentials in Cybersecurity",
    issuer: "Microsoft & LinkedIn",
    url: "https://www.linkedin.com/learning/certificates/2ea8615ffb07e941052c943470d765532c4e194d15fa52255461b95ed28484ad",
  },
  { name: "Object Oriented Programming in C++", issuer: "University of London · Coursera" },
  {
    name: "Career Essentials in Software Development",
    issuer: "Microsoft & LinkedIn",
    url: "https://www.linkedin.com/learning/certificates/a577679ee6bdd94aaaf96fe64f7301bea1d29a4a13a8e2b8be9908e28f12480b",
  },
  {
    name: "Career Essentials in GitHub",
    issuer: "GitHub & LinkedIn",
    url: "https://www.linkedin.com/learning/certificates/03b7d9e09872660a0398fd3c5e2ca2097927210c1718c80c0387e0db363b29ff",
  },
];

export const skills = [
  { group: "Security", items: ["Network security", "Intrusion detection", "Adversarial ML", "Digital forensics", "Penetration testing fundamentals"] },
  { group: "Machine learning", items: ["PyTorch", "scikit-learn", "ART", "NumPy", "pandas"] },
  { group: "Languages", items: ["Python", "Java", "C", "C++", "JavaScript"] },
  { group: "Web", items: ["React", "Next.js", "Node.js", "Angular", "Tailwind CSS"] },
  { group: "Data", items: ["MySQL", "MongoDB", "Supabase"] },
  { group: "Tools", items: ["Linux", "Git", "Docker"] },
];

export const experience = [
  {
    period: "Mar 2023 – Aug 2024",
    title: "Cashier",
    org: "INDITEX",
    note: "Register operations and weekly financial reconciliation in a high-traffic store, alongside university studies.",
  },
];

export const languages = [
  { name: "Greek", level: "Native" },
  { name: "English", level: "Proficient" },
  { name: "German", level: "A2" },
];
