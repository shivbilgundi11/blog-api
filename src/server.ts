/**
 * @copyright 2025 shivbilgundi11
 * @license Apache-2.0
 */

// Node modules
import express from 'express';

// Custom modules
import config from '@/config/index';

// Express app initialization
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
