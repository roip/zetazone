import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { GalleryItem } from "@/components/Gallery";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export interface ProjectFrontmatter {
  title: string;
  year: number;
  description: string;
  crew: string[];
  coverImage: string;
  gallery: GalleryItem[];
}

export interface ProjectMeta extends ProjectFrontmatter {
  slug: string;
}

export interface ProjectFull extends ProjectMeta {
  content: string;
}

function parseProject(slug: string): ProjectFull {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title,
    year: data.year,
    description: data.description,
    crew: data.crew ?? [],
    coverImage: data.coverImage,
    gallery: data.gallery ?? [],
    content,
  };
}

export function getAllProjects(): ProjectMeta[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"));

  return files
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      const { content: _, ...meta } = parseProject(slug);
      return meta;
    })
    .sort((a, b) => b.year - a.year);
}

export function getProjectBySlug(slug: string): ProjectFull {
  return parseProject(slug);
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
