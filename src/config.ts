type ConfigType = {
  jwt: {
    secret: string;
    options: {
      algorithm: 'HS256';
      expiresIn: string;
    };
  };
  passwordSaltRounds: number;
};

const devConfig: ConfigType = {
  jwt: {
    secret: process.env.JWT_SECRET ?? 'devsecret',
    options: {
      algorithm: 'HS256',
      expiresIn: '30m',
    },
  },
  passwordSaltRounds: 10,
};

const prodConfig: ConfigType = {
  jwt: {
    secret: process.env.JWT_SECRET ?? 'prodsecret',
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
