// Node modules
import mongoose from 'mongoose';

// custom modules
import config from '@/config/index';

// Types
import type { ConnectOptions } from 'mongoose';

// Client option
const clientOptions: ConnectOptions = {
  dbName: 'blog-db',
  appName: 'Blog API',
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

/**
 * Establishing connection to MongoDB database using mongoose
 * If a error occurs during connection, it will be logged to the console and the process will exit with a failure code
 * uses MONGO_URI from environment variables for the connection string, and clientOptions for additional configuration
 * Errors are properly handled to ensure that any issues during the connection process are logged and the application does not continue running in an unstable state
 */
export const connectToDatabase = async (): Promise<void> => {
  if (!config.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  try {
    await mongoose.connect(config.MONGO_URI, clientOptions);
    console.log('Connected to MongoDB database successfully', {
      uri: config.MONGO_URI,
      options: clientOptions,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to connect to MongoDB database: ${error.message}`,
      );
    }

    console.log('Error connecting to MongoDB database', error);
  }
};

/** * Disconnects from the MongoDB database using mongoose
 * If a error occurs during disconnection, it will be logged to the console and the process will exit with a failure code
 * Errors are properly handled to ensure that any issues during the disconnection process are logged and the application does not continue running in an unstable state
 */
export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB database successfully', {
      uri: config.MONGO_URI,
      options: clientOptions,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to disconnect from MongoDB database: ${error.message}`,
      );
    }

    console.log('Error disconnecting from MongoDB database', error);
  }
};
