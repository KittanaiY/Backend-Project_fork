import { Router } from 'express';
import { createUser, getUsers, updateUser, deleteUser, createAdvisor, createStudent, getAllAdvisors, getAllStudents, updateAdvisor, updateStudent, deleteAdvisor, deleteStudent, searchStudents, getAdvisorsSummary, linkStudentToAdvisor } from '../controllers/adminController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

// Admin routes for managing users
router.post('/users', authenticateToken, authorizeRole(['ADMIN']), createUser);
// /api/admin/users
router.get('/users', authenticateToken, authorizeRole(['ADMIN']), getUsers);
// /api/admin/users
router.put('/users/:id', authenticateToken, authorizeRole(['ADMIN']), updateUser);
// /api/admin/users/:id
router.delete('/users/:id', authenticateToken, authorizeRole(['ADMIN']), deleteUser);
// /api/admin/users/:id

// Admin routes for managing advisors
router.post('/advisors', authenticateToken, authorizeRole(['ADMIN']), createAdvisor);

router.get('/advisors', authenticateToken, authorizeRole(['ADMIN']), getAllAdvisors);

router.put('/advisors/:id', authenticateToken, authorizeRole(['ADMIN']), updateAdvisor);

router.delete('/advisors/:id', authenticateToken, authorizeRole(['ADMIN']), deleteAdvisor);


// Admin routes for managing students
router.post('/students', authenticateToken, authorizeRole(['ADMIN']), createStudent);
router.get('/students',authenticateToken, authorizeRole(['ADMIN']), getAllStudents);
router.get('/students/search', authenticateToken, authorizeRole(['ADMIN']), searchStudents);
router.put('/students/:id', authenticateToken, authorizeRole(['ADMIN']), updateStudent);
router.delete('/students/:id', authenticateToken, authorizeRole(['ADMIN']), deleteStudent);

router.get('/advisors/summary', authenticateToken, authorizeRole(['ADMIN']), getAdvisorsSummary);

router.post('/students/link', authenticateToken, authorizeRole(['ADMIN']), linkStudentToAdvisor);

export default router;
