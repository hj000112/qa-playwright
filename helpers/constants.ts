import * as dotenv from 'dotenv';
dotenv.config();

export const USERS = {
  standard: process.env.STANDARD_USER,
  locked: process.env.LOCKED_OUT_USER,
  problem: process.env.PROBLEM_USER,
  performance: process.env.PERFORMANCE_USER,
  error: process.env.ERROR_USER,
  visual: process.env.VISUAL_USER,
};

export const PASSWORD = process.env.COMMON_PASSWORD!;
export const BASE_URL = 'https://www.saucedemo.com/';