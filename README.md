# Blog API

A robust, production-ready REST API for a blog platform built with Express.js, TypeScript, and MongoDB.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Development](#development)
- [License](#license)

## 🎯 Project Overview

Blog API is a modern, type-safe backend service for managing blog content and user authentication. Built with Express.js and TypeScript, it provides a scalable foundation for blog platforms with secure authentication, input validation, and comprehensive error handling.

## ✨ Features

- **User Authentication**: JWT-based authentication with access and refresh tokens
- **User Registration**: Secure user registration with email validation and role-based access
- **User Login**: Secure login with password encryption using bcrypt
- **Token Refresh**: Automatic token refresh mechanism for maintaining user sessions
- **Rate Limiting**: Express rate limiting to prevent abuse
- **Input Validation**: Comprehensive input validation using express-validator
- **CORS Support**: Configurable CORS with whitelisted origins
- **Security**: Helmet.js for securing HTTP headers
- **Logging**: Winston logger for comprehensive logging and debugging
- **Database**: MongoDB with Mongoose ODM
- **Compression**: Response compression for optimized payload sizes
- **API Versioning**: v1 API endpoints with room for future versions

## 🛠 Tech Stack

### Core Framework

- **Express.js** (^5.2.1) - Fast, unopinionated web framework
- **TypeScript** (^6.0.3) - Type-safe JavaScript
- **Node.js** - JavaScript runtime

### Database & ORM

- **MongoDB** - NoSQL database
- **Mongoose** (^9.7.0) - MongoDB object modeling

### Authentication & Security

- **jsonwebtoken** (^9.0.3) - JWT token generation and verification
- **bcrypt** (^6.0.0) - Password hashing and comparison
- **helmet** (^8.2.0) - HTTP header security middleware
- **cors** (^2.8.6) - Cross-Origin Resource Sharing middleware
- **express-rate-limit** (^8.5.2) - Rate limiting middleware

### Validation & Error Handling

- **express-validator** (^7.3.2) - Input validation middleware

### Utilities

- **dotenv** (^17.4.2) - Environment variable management
- **compression** (^1.8.1) - Response compression middleware
- **cookie-parser** (^1.4.7) - Cookie parsing middleware
- **winston** (^3.19.0) - Logging library

### Development Tools

- **nodemon** (^3.1.14) - Auto-restart development server
- **ts-node** (^10.9.2) - Execute TypeScript directly
- **prettier** (^3.8.4) - Code formatting
- **TypeScript Type Definitions** - Full type safety for all dependencies

## 📁 Project Structure

```
blog-api/
├── src/
│   ├── server.ts                 # Express app initialization and startup
│   ├── config/
│   │   └── index.ts              # Configuration management and environment variables
│   ├── controllers/
│   │   └── v1/
│   │       └── auth/
│   │           ├── login.ts      # Login handler
│   │           ├── register.ts   # User registration handler
│   │           └── refresh-token.ts # Token refresh handler
│   ├── lib/
│   │   ├── express_rate_limit.ts # Rate limiting configuration
│   │   ├── jwt.ts                # JWT utilities and helpers
│   │   ├── mongoose.ts           # MongoDB connection and management
│   │   └── winston.ts            # Logger configuration
│   ├── middlewares/
│   │   └── validationError.ts    # Express-validator error handler
│   ├── models/
│   │   ├── token.ts              # Token schema
│   │   └── user.ts               # User schema
│   ├── routes/
│   │   └── v1/
│   │       ├── auth.ts           # Authentication routes
│   │       └── index.ts          # API v1 main routes
│   └── utils/
│       └── index.ts              # Utility functions
├── package.json                   # Project dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── nodemon.json                  # Nodemon configuration
├── .env                          # Environment variables (not in repo)
└── README.md                     # This file
```

## 🚀 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- MongoDB instance (local or remote)

### Steps

1. Clone the repository:

```bash
git clone <repository-url>
cd blog-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the required environment variables (see [Configuration](#configuration))

4. Build the project:

```bash
npm run build
```

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/blog-api

# JWT
JWT_ACCESS_SECRET=your_access_token_secret_here
JWT_REFRESH_SECRET=your_refresh_token_secret_here
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Logging
LOG_LEVEL=info
```

### Configuration Details

| Variable               | Description                          | Default |
| ---------------------- | ------------------------------------ | ------- |
| `PORT`                 | Server port                          | 3000    |
| `NODE_ENV`             | Environment (development/production) | -       |
| `MONGO_URI`            | MongoDB connection string            | -       |
| `JWT_ACCESS_SECRET`    | Secret key for access tokens         | -       |
| `JWT_REFRESH_SECRET`   | Secret key for refresh tokens        | -       |
| `ACCESS_TOKEN_EXPIRY`  | Access token expiration time         | -       |
| `REFRESH_TOKEN_EXPIRY` | Refresh token expiration time        | -       |
| `LOG_LEVEL`            | Winston logging level                | info    |

## 💻 Usage

### Development

Start the development server with auto-reload:

```bash
npm run dev
```

The server will start at `http://localhost:3000` (or your configured PORT)

### Production

1. Build the TypeScript code:

```bash
npm run build
```

2. Start the server:

```bash
node dist/server.js
```

## 🔌 API Endpoints

### Authentication (v1)

#### Register User

- **Endpoint**: `POST /api/v1/auth/register`
- **Description**: Create a new user account
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123",
    "role": "user"
  }
  ```
- **Response**: User data with tokens

#### Login

- **Endpoint**: `POST /api/v1/auth/login`
- **Description**: Authenticate user and receive tokens
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```
- **Response**: Access and refresh tokens

#### Refresh Token

- **Endpoint**: `POST /api/v1/auth/refresh-token`
- **Description**: Generate new access token using refresh token
- **Response**: New access token

## 🔧 Development

### Code Style

This project uses Prettier for code formatting. Format code with:

```bash
npm run format
```

### TypeScript

The project is fully typed with TypeScript. Compilation is configured with strict mode enabled for maximum type safety.

### Logging

Winston logger is configured for different log levels. Logs are output to the console and can be extended to write to files.

## 📄 License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

---

**Author**: [shivbilgundi11](https://github.com/shivbilgundi11)

**Last Updated**: 2025
