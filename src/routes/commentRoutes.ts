import { Router } from 'express';
import { addComment, replyToComment } from '../controllers/commentController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

router.post('/comments', authenticateToken, authorizeRole(['ADVISOR']), addComment);
// /api/comments
router.post('/comments/reply', authenticateToken, authorizeRole(['STUDENT']), replyToComment);
// /api/comments/reply
export default router;