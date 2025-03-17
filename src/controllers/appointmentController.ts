import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/authMiddleware'; // Import extended type
import { appointmentService } from '../services/appointmentService';

export const createAppointment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const studentId = req.user.id;
        const { advisorId, requestedDate, subject } = req.body;

        await appointmentService.createAppointment(studentId, advisorId, requestedDate, subject);
        res.status(201).json({ message: 'Appointment created successfully' });
    } catch (error) {
        next(error);
    }
};

export const getAppointmentsByAdvisor = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const advisorId = req.user.id;
        const appointments = await appointmentService.getAppointmentsByAdvisor(advisorId);
        res.status(200).json(appointments);
    } catch (error) {
        next(error);
    }
};

export const getAppointmentsByStudent = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const studentId = req.user.id;
        const appointments = await appointmentService.getAppointmentsByStudent(studentId);
        res.status(200).json(appointments);
    } catch (error) {
        next(error);
    }
};

export const updateAppointment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const { id } = req.params;
        const { confirmedDate } = req.body;

        const updatedAppointment = await appointmentService.updateAppointment(Number(id), confirmedDate);
        res.status(200).json(updatedAppointment);
    } catch (error) {
        next(error);
    }
};

export const confirmAppointment = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const { id } = req.params;
        const confirmedAppointment = await appointmentService.confirmAppointment(Number(id));
        res.status(200).json(confirmedAppointment);
    } catch (error) {
        next(error);
    }
};