/**
 * @copyright 2025 shivbilgundi11
 * @license Apache-2.0
 */

// Node modules
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import dns from 'dns';

// Custom modules
import config from '@/config/index';
import limiter from '@/lib/express_rate_limit';
import { connectToDatabase, disconnectFromDatabase } from '@/lib/mongoose';

// Routes
import v1Routes from '@/routes/v1/index';

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

// Enable JSON request body parsing
app.use(express.json());
// Enable URL-encoded request body parsing with extended mode
// 'extended: true' allows for rich objects and arrays to be encoded into the URL-encoded format
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Enable response compression to reduce payload size and improve performance
app.use(
  compression({
    threshold: 1024, // This will only compress responses larger than 1KB
  }),
);

// Use Helmet to set various HTTP headers for security
app.use(helmet());

// Apply rate limiting middleware to all requests
app.use(limiter);

// Thie below line sets the DNS servers to Google's public DNS. No idea how its solving mongodb connection issue, but it is working. Need to investigate more on this.
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Start the server
(async () => {
  try {
    await connectToDatabase();

    app.use('/api/v1', v1Routes);

    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  } catch (err) {
    console.log('Failed to start server', err);

    if (config.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
})();

/**
 * Handles server shutdown gracefully by disconnecting from the database.
 * Attempts to diconnect from the database before shutting down the server.
 * Logs a success message if the disconnection is successful.
 * If an error occurs during disconnection, it logs the error and exits with a non-zero status code.
 * Exits the process with status coed 0 after attempting to disconnect from the database, regardless of the outcome.
 */
const handleShutDown = async () => {
  try {
    await disconnectFromDatabase();
    console.log('Server SHUTDOWN');
    process.exit(0);
  } catch (err) {
    console.log('Error during server shutdown', err);
  }
};

/**
 *   Listen for termination signals (SIGTERM, SIGINT) to gracefully shut down the server
 * - SIGTERM is typically sent by process managers like Kubernetes when stopping a container
 * - SIGINT is sent when the user presses Ctrl+C in the terminal
 * When either signal is received, the handleShutDown function is called to perform cleanup tasks before exiting the process
 */
process.on('SIGTERM', handleShutDown);
process.on('SIGINT', handleShutDown);
