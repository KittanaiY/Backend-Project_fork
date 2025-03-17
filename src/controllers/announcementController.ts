import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/authMiddleware'; // Import extended type
import { announcementService } from '../services/announcementService';

export const createAnnouncement = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const advisorId = req.user.id;
        const { title, content } = req.body;
        const fileUrl = req.file ? req.file.path : undefined; // Fix: Ensure fileUrl is a string or undefined

        await announcementService.createAnnouncement(advisorId, title, content, fileUrl || '');
        res.status(201).json({ message: 'Announcement created successfully' });
    } catch (error) {
        next(error);
    }
};

export const getAnnouncements = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const announcements = await announcementService.getAnnouncements();
        res.status(200).json(announcements);
    } catch (error) {
        next(error);
    }
};