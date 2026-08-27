import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog/src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			seoTitle: z.string().optional(),
			ogDescription: z.string().optional(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			topic: z.string().optional(),
			related: z.array(z.string()).optional(),
			relatedServices: z.array(
				z.object({
					label: z.string(),
					url: z.string().url(),
				}),
			).optional(),
			ctaHeadline: z.string().optional(),
			ctaText: z.string().optional(),
		}),
});

const caseStudies = defineCollection({
	loader: glob({ base: './src/content/case-studies', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tagline: z.string().optional(),
		client: z.string().optional(),
		industry: z.string().optional(),
		publishedDate: z.coerce.date().optional(),
		summary: z.string().optional(),
	}),
});

export const collections = { blog, caseStudies };