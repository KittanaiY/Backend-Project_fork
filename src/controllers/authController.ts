import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
    const { studentId, firstName, lastName, password, profilePicture, department } = req.body;
    try {
        const user = await registerUser(studentId, firstName, lastName, password, profilePicture, department);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'User already exists' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const { user, token } = await loginUser(username, password);
        res.json({ user, token });
    } catch (error) {
        res.status(401).json({ error: 'Invalid username or password' });
    }
};

