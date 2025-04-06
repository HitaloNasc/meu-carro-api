import { registerAs } from '@nestjs/config';

export const env = registerAs('env', () => ({
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    url: process.env.SERVER_URL || 'http://localhost:3000',
  },
  database: {
    stringConnection: process.env.DATABASE_URL || '',
  },
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET || '',
      expiration: process.env.JWT_EXPIRATION || '1h',
      issuer: process.env.JWT_ISSUER || 'nest-js-template',
    },
    bcrypt: {
      salts: parseInt(process.env.BYCRIPT_SALT_ROUNDS || '10', 10),
    },
    google: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    },
  },
}));
