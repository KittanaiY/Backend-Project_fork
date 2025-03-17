import { Router } from 'express';
import {createAppointment,getAppointmentsByAdvisor,getAppointmentsByStudent,updateAppointment,confirmAppointment} from '../controllers/appointmentController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

// Ensure `authenticateToken` runs before `authorizeRole`
router.post('/appointments', authenticateToken, authorizeRole(['STUDENT']), createAppointment);
// /api/appointments
router.get('/appointments', authenticateToken, authorizeRole(['ADVISOR']), getAppointmentsByAdvisor);
// /api/appointments
router.get('/appointments', authenticateToken, authorizeRole(['STUDENT']), getAppointmentsByStudent);
// /api/appointments
router.put('/appointments/:id', authenticateToken, authorizeRole(['ADVISOR']), updateAppointment);
// /api/appointments/:id
router.put('/appointments/:id/confirm', authenticateToken, authorizeRole(['ADVISOR']), confirmAppointment);
// 	/api/appointments/:id/confirm

export default router;
