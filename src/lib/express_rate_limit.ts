// Node modules

import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60000, // 1 minute time window for request limiting,
  limit: 60, // limit each IP to 60 requests per windowMs
  standardHeaders: 'draft-8', // use the standard rate limit headers
  legacyHeaders: false, // Disable the deprecated X-RateLimit headers
  message: {
    error: 'Too many requests, please try again later.',
  },
});

export default limiter;
