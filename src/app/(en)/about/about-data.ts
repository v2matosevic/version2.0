export const ANIMATED_STATS = [
  { target: 100, suffix: '+', decimals: 0, label: 'Projects' },
  { target: 100, suffix: '+', decimals: 0, label: 'Clients' },
  { target: 5, suffix: '', decimals: 1, label: 'Rating' },
  { target: 40, suffix: '+', decimals: 0, label: 'Reviews' },
] as const

export const VALUES = [
  { title: 'Templates look like templates.', description: "That's why we don't use them. Every project starts with a blank file. Your business isn't generic. Your website shouldn't be either." },
  { title: 'Your website is not a brochure.', description: "It's a product. It needs to load fast, work on every device, and actually do something useful for your business." },
  { title: 'Speed matters.', description: 'Not as a talking point. As a measurable outcome. Sub-second load times. Real performance scores.' },
  { title: 'Complexity is the enemy.', description: "Code should be clean enough that anyone can maintain it. If we build something only we can understand, we've failed." },
] as const

export const TECH_STACK = [
  { category: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Three.js/R3F', 'GSAP'] },
  { category: 'Backend', items: ['Node.js', 'PostgreSQL', 'REST APIs', 'WebSockets'] },
  { category: 'AI', items: ['Claude API', 'GPT API', 'RAG', 'Embeddings'] },
  { category: 'Infrastructure', items: ['Hostinger VPS', 'Nginx', 'PM2', 'Cloudflare', 'Git'] },
] as const
