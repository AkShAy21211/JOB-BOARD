import type { NextFunction, Request, Response } from 'express';
import Joi, { type ObjectSchema } from 'joi';

export const validate = (schema: ObjectSchema) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    return res.status(400).json({ error: errorMessage });
  }

  next();
};

export const schemas = {
  register: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('recruiter', 'seeker').required(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
