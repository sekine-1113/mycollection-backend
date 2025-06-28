const devConfig = {
  jwt: {
    secret: process.env.JWT_SECRET,
    options: {
      algorithm: 'HS256',
      expiresIn: '30m',
    },
  },
  passwordSaltRounds: 10,
};

const prodConfig = {
  jwt: {
    secret: process.env.JWT_SECRET,
    options: {
      algorithm: 'HS256',
      expiresIn: '30m',
    },
  },
  passwordSaltRounds: 10,
};

const config =
  process.env.NODE_ENV === 'production' || true ? prodConfig : devConfig;
export default config;
