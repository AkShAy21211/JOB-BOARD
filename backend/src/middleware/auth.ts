import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { JwtUser, UserRole } from '../types/auth';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return secret;
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    req.user = jwt.verify(token, getJwtSecret()) as JwtUser;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const requireRole = (role: UserRole) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== role) {
    return res.status(403).json({ error: `Only ${role}s can access this route` });
  }

  next();
};
