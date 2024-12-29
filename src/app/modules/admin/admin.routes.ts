import { Router } from 'express';
import { AdminControllers } from './admin.controller';

const router = Router();

router.patch('/users/:userId/block', AdminControllers.blockUser);
router.delete('/blogs/:id', AdminControllers.deleteBlog);

export const adminRoutes = router;
