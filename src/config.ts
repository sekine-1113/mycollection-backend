export default {
  jwt: {
    secret: process.env.JWT_SECRET,
    options: {
      algorithm: 'HS256',
      expiresIn: '30m',
    },
  },
  passwordSoltRounds: 10,
};
