import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { authenticateToken } from '../services/authService';

const router = Router();

router.post('/register', register);
// /api/auth/register
router.post('/login', login);
// /api/auth/login

// Example of a protected route
router.get('/protected', authenticateToken, (req, res) => {
    res.send('This is a protected route');
});
// /api/auth/protected
export default router;