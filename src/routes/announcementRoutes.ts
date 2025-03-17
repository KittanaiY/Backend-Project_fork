import { Router } from 'express';
import { createAnnouncement, getAnnouncements } from '../controllers/announcementController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';
import { upload } from '../middleware/uploadMiddleware';

const router = Router();

router.post('/announcements', authenticateToken, authorizeRole(['ADVISOR']), upload.single('file'), createAnnouncement);
// /api/announcements
router.get('/announcements', authenticateToken, authorizeRole(['STUDENT', 'ADVISOR']), getAnnouncements);
// /api/announcements

export default router;