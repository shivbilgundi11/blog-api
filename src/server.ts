/**
 * @copyright 2025 shivbilgundi11
 * @license Apache-2.0
 */

// Node modules
import express from 'express';
import cors from 'cors';

// Custom modules
import config from '@/config/index';

// Types
import type { CorsOptions } from 'cors';

// Express app initialization
const app = express();

// configure cors options
const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === 'development' ||
      !origin ||
      config.WHITELISTED_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      // Reject requests from non-whitelisted origins
      callback(
        new Error(`CORS error: ${origin} is not allowed by CORS policy`),
        false,
      );

      console.log(`CORS error: ${origin} is not allowed by CORS policy`);
    }
  },
};

// Middleware setup
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
