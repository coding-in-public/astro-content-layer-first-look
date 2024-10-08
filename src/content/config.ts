import { file, glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/blog" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const pizzas = defineCollection({
  loader: file("src/data/pizzas.json"),
  schema: z.object({
    id: z.number(),
    pizzaName: z.string(),
    ingredients: z.array(z.string()),
  }),
});

const countries = defineCollection({
  loader: async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data.map((country: any) => ({
      id: country.cca3,
      name: country.name.common,
    }));
  },
  schema: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export const collections = { blog, pizzas, countries };
