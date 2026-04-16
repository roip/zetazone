import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Gallery from "@/components/Gallery";
import {
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/lib/projects";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return {
    title: `${project.title} — ZetaZone`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;

  let project;
  try {
    project = getProjectBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      {/* Back link */}
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1 text-sm text-sand/50 transition-colors hover:text-ember"
      >
        &larr; Back to Projects
      </Link>

      {/* Header */}
      <div className="mt-8">
        <div className="flex items-baseline gap-3">
          <h1 className="text-4xl font-extrabold text-playa">
            {project.title}
          </h1>
          <span className="text-xl font-semibold text-ember">
            {project.year}
          </span>
        </div>

        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-sand/70">
          {project.description}
        </p>

        {/* Crew */}
        <div className="mt-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-sand/40">
            Crew
          </h2>
          <p className="mt-1 text-sand/60">{project.crew.join(" · ")}</p>
        </div>
      </div>

      {/* MDX body (if any) */}
      {project.content.trim() && (
        <div className="mt-10 max-w-3xl text-sand/70 [&_h2]:text-ember [&_h3]:text-glow [&_a]:text-glow [&_a:hover]:text-ember [&_strong]:text-playa">
          <MDXRemote source={project.content} />
        </div>
      )}

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-ember">Gallery</h2>
          <div className="mt-6">
            <Gallery items={project.gallery} columns={3} />
          </div>
        </div>
      )}
    </main>
  );
}
