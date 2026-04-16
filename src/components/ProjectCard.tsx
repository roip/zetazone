import Image from "next/image";
import Link from "next/link";
import type { ProjectMeta } from "@/lib/projects";

export default function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group overflow-hidden rounded-xl bg-navy/60 transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="px-4 py-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-lg font-bold text-playa">{project.title}</h3>
          <span className="shrink-0 text-sm font-medium text-ember">
            {project.year}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-sand/60">
          {project.description}
        </p>
        <p className="mt-2 text-xs text-sand/40">
          {project.crew.join(" · ")}
        </p>
      </div>
    </Link>
  );
}
