import { Router } from 'express';
import { BlogControllers } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/',
  auth('user', 'admin'),
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.put(
  '/:id',
  auth('user'),
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

router.delete('/:id', auth('admin', 'user'), BlogControllers.deleteBlog);

export const blogRoutes = router;
