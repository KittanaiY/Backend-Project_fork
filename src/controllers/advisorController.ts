import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/authMiddleware'; // Import extended type
import { advisorService } from '../services/advisorService';

export const getAssignedStudents = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const advisorId = req.user.id;
        const students = await advisorService.getAssignedStudents(advisorId, {
            include: {
                user: {
                    include: {
                        profile: true
                    }
                }
            }
        });
        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
};