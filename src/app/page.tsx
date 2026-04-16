import Image from "next/image";
import Link from "next/link";
import Gallery, { type GalleryItem } from "@/components/Gallery";

const CAMP_PHOTOS: GalleryItem[] = [
  { src: "/images/gallery/camp/IMG_7873.jpg", alt: "Camp life" },
  { src: "/images/gallery/camp/IMG_7881.jpg", alt: "Camp life" },
  { src: "/images/gallery/camp/IMG_7892.jpg", alt: "Camp life" },
  { src: "/images/gallery/camp/IMG_7948.jpg", alt: "Camp life" },
  { src: "/images/gallery/camp/IMG_7985.jpg", alt: "Camp life" },
  { src: "/images/gallery/camp/IMG_7988.jpg", alt: "Camp life" },
  { src: "/images/gallery/camp/IMG_8225.jpg", alt: "Camp life" },
  { src: "/images/gallery/camp/PXL_20240826_015152568.jpg", alt: "Camp life" },
  { src: "/images/gallery/camp/PXL_20240826_064603005.jpg", alt: "Camp life" },
  { src: "/images/gallery/camp/IMG_3092.jpg", alt: "Camp life" },
  { src: "/images/gallery/camp/IMG_3106.jpg", alt: "Camp life" },
  { src: "/images/gallery/camp/IMG_3259.jpg", alt: "Camp life" },
];

const PROJECT_PHOTOS: GalleryItem[] = [
  { src: "/images/gallery/projects/PXL_20250825_172147971.jpg", alt: "Project build" },
  { src: "/images/gallery/projects/PXL_20250825_200645725.jpg", alt: "Project build" },
  { src: "/images/gallery/projects/PXL_20250826_060808794.MP.jpg", alt: "Project build" },
  { src: "/images/gallery/projects/PXL_20250826_062516676.jpg", alt: "Project build" },
  { src: "/images/gallery/projects/PXL_20250826_062828419.MP.jpg", alt: "Project build" },
  { src: "/images/gallery/projects/PXL_20250826_065217757.MP.jpg", alt: "Project build" },
  { src: "/images/gallery/projects/PXL_20250826_071848464.jpg", alt: "Project build" },
  { src: "/images/gallery/projects/PXL_20250826_072512706.MP.jpg", alt: "Project build" },
  { src: "/images/gallery/projects/PXL_20250826_084640715.MP.jpg", alt: "Project build" },
  { src: "/images/gallery/projects/PXL_20250828_003304020.jpg", alt: "Project build" },
  { src: "/images/gallery/projects/PXL_20250828_010125406.jpg", alt: "Project build" },
  { src: "/images/gallery/projects/PXL_20250828_023011835.jpg", alt: "Project build" },
  { src: "/images/gallery/projects/PXL_20250828_023421447.jpg", alt: "Project build" },
  { src: "/images/gallery/projects/PXL_20250828_042813263.NIGHT.jpg", alt: "Night shot" },
  { src: "/images/gallery/projects/PXL_20250828_043946287.jpg", alt: "Project build" },
  { src: "/images/gallery/projects/PXL_20250828_044010213.jpg", alt: "Project build" },
  { src: "/images/gallery/projects/PXL_20250828_044124077.jpg", alt: "Project build" },
  { src: "/images/gallery/projects/PXL_20250828_044908255.jpg", alt: "Project build" },
];

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
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-night/85 border-b border-sand/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/site/hi-res.png"
              alt="ZetaZone logo"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="text-xl font-bold tracking-wider text-ember">
              ZETAZONE
            </span>
          </Link>
          <ul className="hidden gap-6 text-sm font-medium sm:flex">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-sand/70 transition-colors hover:text-ember"
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
        <Image
          src="/images/site/hi-res.png"
          alt="ZetaZone Camp logo"
          width={180}
          height={180}
          className="rounded-full shadow-lg shadow-ember/20"
          priority
        />
        <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl">
          <span className="text-ember">Zeta</span>
          <span className="text-playa">Zone</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg text-sand/70">
          A Burning Man camp supporting art, sound, and community on the playa. 
        </p>
        <div className="mt-8 flex gap-4">
          <a
            href="#about"
            className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-night transition-transform hover:scale-105"
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
      <section id="about" className="bg-deep/50">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <h2 className="text-3xl font-bold text-ember">About</h2>
          <p className="mt-4 leading-relaxed text-sand/70">
            ZetaZone is an art support camp at Burning Man dedicated to interactive
            art, music, and radical self-expression. 
          </p>
        </div>
      </section>

      {/* ── Camp Gallery ── */}
      <section id="gallery">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-3xl font-bold text-ember">Camp Gallery</h2>
          <div className="mt-6">
            <Gallery items={CAMP_PHOTOS} columns={3} />
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="bg-deep/50">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-3xl font-bold text-ember">Projects</h2>
          <div className="mt-6">
            <Gallery items={PROJECT_PHOTOS} columns={3} />
          </div>
        </div>
      </section>

      {/* ── Camp Notes placeholder ── */}
      <section id="notes">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-3xl font-bold text-glow">Camp Notes</h2>
          <p className="mt-4 text-sand/70">Blog posts coming soon.</p>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="bg-deep/50">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <h2 className="text-3xl font-bold text-ember">Contact</h2>
          <p className="mt-4 text-sand/70">
            Want to join the camp or collaborate?{" "}
            <a
              href="mailto:hello@zetazone.org"
              className="text-glow underline underline-offset-4 hover:text-ember"
            >
              hello@zetazone.org
            </a>
          </p>
          <div className="mt-6 flex items-center gap-5">
            <a
              href="https://www.instagram.com/zetazonecamp/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/site/ig.png"
                alt="Instagram"
                width={40}
                height={40}
                className="rounded"
              />
            </a>
            <a
              href="https://www.facebook.com/people/Camp-Zeta-Zone/61578113943712/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/site/fb.png"
                alt="Facebook"
                width={40}
                height={40}
                className="rounded"
              />
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-sand/10 py-8 text-center text-xs text-sand/30">
        &copy; {new Date().getFullYear()} ZetaZone. Built with dust and love.
      </footer>
    </>
  );
}
