import { Router } from 'express';
import { BlogControllers } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';

const router = Router();

router.post(
  '/',
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog,
);

export const blogRoutes = router;
