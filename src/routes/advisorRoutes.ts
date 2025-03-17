import { Router } from 'express';
import { getAssignedStudents } from '../controllers/advisorController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/students', authenticateToken, authorizeRole(['ADVISOR']), getAssignedStudents);

export default router;