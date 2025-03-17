import { Request, Response } from 'express';
import { adminService } from '../services/adminService';

export const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const newUser = await adminService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

export const createAdvisor = async (req: Request, res: Response) => {
    try {
        const advisorData = req.body;
        const newAdvisor = await adminService.createAdvisor(advisorData);
        res.status(201).json(newAdvisor);
    } catch (error) {
        res.status(500).json({ message: 'Error creating advisor', error });
    }
};

export const createStudent = async (req: Request, res: Response) => {
    try {
        const studentData = req.body;
        const newStudent = await adminService.createStudent(studentData);
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating student', error });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await adminService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

export const getAllAdvisors = async (req: Request, res: Response) => {
    try {
        const advisors = await adminService.getAdvisors();
        res.status(200).json(advisors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching advisors', error });
    }
};

export const getAllStudents = async (req: Request, res: Response) => {
    try {
        const students = await adminService.getStudents();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userData = req.body;
        const updatedUser = await adminService.updateUser(id, userData);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

export const updateAdvisor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const advisorData = req.body;
        const updatedAdvisor = await adminService.updateAdvisor(id, advisorData);
        res.status(200).json(updatedAdvisor);
    } catch (error) {
        res.status(500).json({ message: 'Error updating advisor', error });
    }
};

export const updateStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const studentData = req.body;
        const updatedStudent = await adminService.updateStudent(id, studentData);
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: 'Error updating student', error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await adminService.deleteUser(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

export const deleteAdvisor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await adminService.deleteAdvisor(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting advisor', error });
    }
};

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await adminService.deleteStudent(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error });
    }
};

export const searchStudents = async (req: Request, res: Response) => {
    try {
        const { studentId, firstName, lastName } = req.query;
        const students = await adminService.searchStudents(studentId, firstName, lastName);
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error searching students', error });
    }
};

export const getAdvisorsSummary = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
  
    try {
      const data = await getAdvisorsWithDetails(page, limit);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

export const linkStudentToAdvisor = async (req: Request, res: Response) => {
    try {
        const { studentId, advisorId } = req.body;
        const updatedStudent = await adminService.linkStudentToAdvisor(studentId, advisorId);
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: 'Error linking student to advisor', error });
    }
};

function getAdvisorsWithDetails(page: number, limit: number) {
    throw new Error('Function not implemented.');
}
