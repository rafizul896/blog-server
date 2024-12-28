import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from '../user/user.validation';

const router = Router();

router.post(
  '/register',
  validateRequest(userValidations.userValidationSchema),
  AuthControllers.register,
);
router.post('/login');

export const authRoutes = router;
