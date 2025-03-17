import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/authMiddleware'; // Import extended type
import { commentService } from '../services/commentService';

export const addComment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const advisorId = req.user.id;
        const { studentId, content } = req.body;

        await commentService.addComment(advisorId, studentId, content);
        res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        next(error);
    }
};

export const replyToComment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const studentId = req.user.id;
        const { commentId, content } = req.body;

        await commentService.replyToComment(commentId, studentId, content);
        res.status(201).json({ message: 'Reply added successfully' });
    } catch (error) {
        next(error);
    }
};