import { z } from 'zod';

// Create Blog Schema
const createBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: 'Title is required' })
      .max(255, { message: 'Title must not exceed 255 characters' }),
    content: z.string().min(1, { message: 'Content is required' }),
    author: z.string().optional(),
    isPublished: z.boolean().optional(),
  }),
});

// Update Blog Schema
const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    author: z.string().optional(),
    isPublished: z.boolean().optional(),
  }),
});

export const BlogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
