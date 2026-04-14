import Link from "next/link";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#projects", label: "Projects" },
  { href: "#notes", label: "Camp Notes" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-night/80 border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-wider text-ember">
            ZETAZONE
          </Link>
          <ul className="hidden gap-6 text-sm font-medium sm:flex">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-sand/80 transition-colors hover:text-ember"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl">
          <span className="text-ember">Zeta</span>Zone
        </h1>
        <p className="mt-4 max-w-xl text-lg text-sand/70">
          A Burning Man theme camp exploring art, sound, and community at the
          edge of the playa.
        </p>
        <div className="mt-8 flex gap-4">
          <a
            href="#about"
            className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            Learn More
          </a>
          <a
            href="#contact"
            className="rounded-full border border-sand/30 px-6 py-3 text-sm font-semibold text-sand transition-colors hover:border-ember hover:text-ember"
          >
            Get In Touch
          </a>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="mx-auto max-w-4xl px-6 py-24">
        <h2 className="text-3xl font-bold text-ember">About</h2>
        <p className="mt-4 leading-relaxed text-sand/70">
          ZetaZone is a theme camp at Burning Man dedicated to interactive art,
          music, and radical self-expression. We build immersive installations,
          host workshops, and create a welcoming space for burners of all
          backgrounds.
        </p>
      </section>

      {/* ── Gallery placeholder ── */}
      <section id="gallery" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-3xl font-bold text-ember">Camp Gallery</h2>
        <p className="mt-4 text-sand/70">Photos and memories coming soon.</p>
      </section>

      {/* ── Projects placeholder ── */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-3xl font-bold text-ember">Projects</h2>
        <p className="mt-4 text-sand/70">
          Art installations and builds coming soon.
        </p>
      </section>

      {/* ── Camp Notes placeholder ── */}
      <section id="notes" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-3xl font-bold text-ember">Camp Notes</h2>
        <p className="mt-4 text-sand/70">Blog posts coming soon.</p>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="mx-auto max-w-4xl px-6 py-24">
        <h2 className="text-3xl font-bold text-ember">Contact</h2>
        <p className="mt-4 text-sand/70">
          Want to join the camp or collaborate?{" "}
          <a
            href="mailto:hello@zetazone.org"
            className="text-ember underline underline-offset-4 hover:text-sand"
          >
            hello@zetazone.org
          </a>
        </p>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-sand/40">
        &copy; {new Date().getFullYear()} ZetaZone. Built with dust and love.
      </footer>
    </>
  );
}
