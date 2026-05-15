import { Router } from 'express';
import { getMe, login, register } from './auth.controller';
import { protect } from '../../middleware/auth';
import { schemas, validate } from '../../middleware/validate';

const router = Router();

router.post('/register', validate(schemas.register), register);
router.post('/login', validate(schemas.login), login);
router.get('/me', protect, getMe);

export default router;
