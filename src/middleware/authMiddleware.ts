import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Extend Express Request type to include "user"
export interface AuthRequest extends Request {
  user?: { id: number; role: string };
}

export const authenticateToken = (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access token required' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }
    req.user = decoded as { id: number; role: string };
    next();
  });
};

export const authorizeRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      const user = (req as AuthRequest).user;
      
      if (!user) {
        res.status(403).json({ message: 'Forbidden: User not authenticated' });
        return;
      }
  
      if (!roles.includes(user.role)) {
        res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        return;
      }
  
      next();
    };
  };
  