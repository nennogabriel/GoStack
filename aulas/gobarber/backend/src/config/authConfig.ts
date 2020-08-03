export default {
  jwt: {
    secret: process.env.APP_SECRET || 'md5genereted',
    expiresIn: '30d',
  },
};
