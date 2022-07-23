import { NextFunction } from 'express';
import { FastifyReply, FastifyRequest } from 'fastify';

export function Authentication(
  req: FastifyRequest,
  res: FastifyReply,
  next: NextFunction,
) {
  console.log(`Request...${req.method} ${req.url}`);
  next();
}
