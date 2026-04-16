# Projects Section Spec — v1

## Overview

The Projects section is redesigned from a flat photo gallery into a project listing
with individual project detail pages. Each project is defined by an MDX file with
YAML frontmatter containing metadata and a gallery image list.

## Data Model

Each project MDX file lives in `content/projects/<slug>.mdx` with this frontmatter:

```yaml
---
title: "Project Name"
year: 2025
description: "Short description of the project."
crew: ["Alice", "Bob", "Charlie"]
coverImage: "/images/gallery/projects/<slug>/cover.jpg"
gallery:
  - src: "/images/gallery/projects/<slug>/photo1.jpg"
    alt: "Description"
    caption: "Optional caption"
---

Optional extended markdown body content.
```

### Fields

| Field        | Type              | Required | Description                          |
| ------------ | ----------------- | -------- | ------------------------------------ |
| title        | string            | yes      | Project name                         |
| year         | number            | yes      | Year presented at Burning Man        |
| description  | string            | yes      | Short description                    |
| crew         | string[]          | yes      | Artist/crew member names             |
| coverImage   | string            | yes      | Path to cover image for card grid    |
| gallery      | GalleryItem[]     | yes      | Array of images for project gallery  |

## Routes

| Route                | Description                          |
| -------------------- | ------------------------------------ |
| `/#projects`         | Homepage section — project card grid |
| `/projects/[slug]`   | Individual project detail page       |

## File Structure

```
content/
  projects/
    <slug>.mdx

public/
  images/gallery/projects/
    <slug>/
      cover.jpg
      photo1.jpg
      ...

src/
  app/
    page.tsx                    # /#projects uses ProjectCard grid
    projects/
      [slug]/
        page.tsx                # project detail page
  components/
    Gallery.tsx                 # reused as-is
    ProjectCard.tsx             # card for homepage grid
  lib/
    projects.ts                 # MDX/frontmatter loading helpers
```

## Homepage Projects Section

- Displays a responsive grid of `ProjectCard` components (2 cols on mobile, 3 on desktop).
- Each card shows: cover image, title, year, and crew names.
- Clicking a card navigates to `/projects/<slug>`.
- Projects sorted by year descending (newest first).

## Project Detail Page (`/projects/[slug]`)

Layout (top to bottom):

1. Back link to `/#projects`
2. Title + year
3. Description
4. Crew list
5. MDX body content (if any)
6. Photo gallery (reusable `Gallery` component)

## Libraries

- `gray-matter` — parse YAML frontmatter from MDX files
- `next-mdx-remote` — compile and render MDX body content

## What stays the same

- `Gallery` component reused on detail pages
- Camp Gallery section untouched
- Color palette, nav links, overall layout unchanged
