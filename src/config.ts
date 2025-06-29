/* eslint-disable @typescript-eslint/no-non-null-assertion */
type ConfigType = {
  DOMAIN: string;
  PORT: number;
  DATABASE_URL: string;
  ACCESS_SECRET: string;
  REFRESH_SECRET: string;
  PASSWORD_SALT_ROUNDS: number;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
};

const devConfig: ConfigType = {
  DOMAIN: process.env.DOMAIN ?? 'http://localhost',
  PORT: parseInt(process.env.PORT ?? '3000'),
  DATABASE_URL: process.env.DATABASE_URL ?? 'file:./dev.db',
  ACCESS_SECRET: process.env.ACCESS_SECRET ?? 'devsecret',
  REFRESH_SECRET: process.env.REFRESH_SECRET ?? 'devrefsecret',
  PASSWORD_SALT_ROUNDS: parseInt(process.env.PASSWORD_SALT_ROUNDS ?? '10'),
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_CLOUD_NAME!,
};

const prodConfig: ConfigType = {
  DOMAIN: process.env.DOMAIN ?? 'http://localhost',
  PORT: parseInt(process.env.PORT ?? '3000'),
  DATABASE_URL: process.env.DATABASE_URL ?? 'file:./dev.db',
  ACCESS_SECRET: process.env.ACCESS_SECRET ?? 'prodsecret',
  REFRESH_SECRET: process.env.REFRESH_SECRET ?? 'prodrefsecret',
  PASSWORD_SALT_ROUNDS: parseInt(process.env.PASSWORD_SALT_ROUNDS ?? '10'),
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_CLOUD_NAME!,
};

const config =
  process.env.NODE_ENV === 'production' || true ? prodConfig : devConfig;
export default config;
