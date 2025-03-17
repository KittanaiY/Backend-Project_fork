import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

export const registerUser = async (
    studentId: string,
    firstName: string,
    lastName: string,
    password: string,
    profilePicture?: string,
    department?: string
) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.create({
        data: {
            username: studentId, // Use student ID as username
            password: hashedPassword,
            role: 'STUDENT',
            profile: {
                create: {
                    firstName,
                    lastName,
                    profilePicture,
                    department,
                },
            },
            student: {
                create: {
                    studentId,
                },
            },
        },
    });
    return user;
};

export const loginUser = async (username: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { username },
        include: {
            profile: true,
            student: true,
            advisor: true,
        },
    });

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });
    return { user, token };
};

export const authenticateToken = (req: any, res: any, next: any) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, jwtSecret, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};