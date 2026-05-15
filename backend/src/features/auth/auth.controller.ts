import type { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { type SignOptions } from 'jsonwebtoken';
import db from '../../config/postgres';
import type { JwtUser, UserRecord, UserRole } from '../../types/auth';

interface RegisterBody {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

interface LoginBody {
  email: string;
  password: string;
}

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return secret;
};

const signToken = (payload: JwtUser) => {
  const expiresIn = (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn'];

  return jwt.sign(payload, getJwtSecret(), { expiresIn });
};

export const register = async (
  req: Request<unknown, unknown, RegisterBody>,
  res: Response,
  next: NextFunction,
) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await db.query<UserRecord>('SELECT * FROM users WHERE email = $1', [email]);

    if (userExists.rows.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.query<UserRecord>(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPassword, role],
    );

    const user = newUser.rows[0];
    const token = signToken({ id: user.id, role: user.role });

    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request<unknown, unknown, LoginBody>,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  try {
    const result = await db.query<UserRecord>('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user?.password || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = signToken({ id: user.id, role: user.role });
    const { password: _password, ...safeUser } = user;

    res.json({ user: safeUser, token });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const result = await db.query<UserRecord>(
      'SELECT id, name, email, role FROM users WHERE id = $1',
      [req.user.id],
    );

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};
