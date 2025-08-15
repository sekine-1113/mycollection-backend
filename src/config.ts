import { configDotenv } from 'dotenv';
configDotenv();

type ConfigType = {
  DOMAIN: string;
  PORT: number;
  DATABASE_URL: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  LOG_LEVEL: string;
};

const mustEnv = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
};

const devConfig: ConfigType = {
  DOMAIN: process.env.DOMAIN ?? 'http://localhost',
  PORT: parseInt(process.env.PORT ?? '3000'),
  DATABASE_URL: process.env.DATABASE_URL ?? 'file:./dev.db',
  CLOUDINARY_CLOUD_NAME: mustEnv('CLOUDINARY_CLOUD_NAME'),
  CLOUDINARY_API_KEY: mustEnv('CLOUDINARY_API_KEY'),
  CLOUDINARY_API_SECRET: mustEnv('CLOUDINARY_API_SECRET'),
  LOG_LEVEL: process.env.LOG_LEVEL ?? 'debug',
};

const prodConfig: ConfigType = {
  DOMAIN: process.env.DOMAIN ?? 'http://localhost',
  PORT: parseInt(process.env.PORT ?? '3000'),
  DATABASE_URL: process.env.DATABASE_URL ?? 'file:./dev.db',
  CLOUDINARY_CLOUD_NAME: mustEnv('CLOUDINARY_CLOUD_NAME'),
  CLOUDINARY_API_KEY: mustEnv('CLOUDINARY_API_KEY'),
  CLOUDINARY_API_SECRET: mustEnv('CLOUDINARY_API_SECRET'),
  LOG_LEVEL: process.env.LOG_LEVEL ?? 'info',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
export default config;
