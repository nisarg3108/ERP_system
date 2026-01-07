import bcrypt from 'bcrypt';
import prisma from '../config/db.js';
import { signToken } from '../utils/jwt.js';

/**
 * Register user logic
 */
export const registerUser = async ({ email, password, role, tenantId }) => {
  if (!email || !password || !tenantId) {
    throw new Error('Missing required fields');
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: role || 'USER',
      tenantId,
    },
  });

  const token = signToken({
    userId: user.id,
    tenantId: user.tenantId,
    role: user.role,
  });

  return {
    message: 'User registered successfully',
    token,
  };
};

/**
 * Login user logic
 */
export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Email and password required');
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = signToken({
    userId: user.id,
    tenantId: user.tenantId,
    role: user.role,
  });

  return {
    message: 'Login successful',
    token,
  };
};
