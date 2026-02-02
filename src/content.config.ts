import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';


const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    role: z.string(),
    year: z.number(),
    duration: z.string().optional(),
    teamSize: z.number().optional(),
    outcomeSummary: z.string(),
    overview: z.string(),
    problem: z.string(),
    constraints: z.array(z.string()),
    approach: z.string(),
    keyDecisions: z.array(z.object({
      decision: z.string(),
      reasoning: z.string(),
      alternatives: z.array(z.string()).optional(),
    })),

    techStack: z.array(z.string()),

    impact: z.object({
      metrics: z.array(z.object({
        label: z.string(),
        value: z.string(),
      })).optional(),
      qualitative: z.string(),
    }),

    learnings: z.array(z.string()),

    featured: z.boolean().default(false),

    status: z.enum(['completed', 'ongoing', 'archived']).default('completed'),

    order: z.number().optional(),

    relatedProjects: z.array(z.string()).optional(),
  }),
});

const journeyCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/journey' }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    type: z.enum(['milestone', 'learning', 'transition']),
    description: z.string(),
    skills: z.array(z.string()).optional(),
  }),
});

const testimonialsCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string(),

    role: z.string(),

    company: z.string(),
    relationship: z.string(),
    quote: z.string(),
    linkedin: z.string().url().optional(),
    featured: z.boolean().default(false),
    date: z.coerce.date(),
  }),
});

/** Posts from Keystatic: path src/content/posts/*, format .mdoc (Markdoc) or .md */
const postsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  projects: projectsCollection,
  journey: journeyCollection,
  testimonials: testimonialsCollection,
  posts: postsCollection,
};
