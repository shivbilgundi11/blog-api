import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  WHITELISTED_ORIGINS: ['https://docs.blog-api.codewithshiv.com'],
};

export default config;
