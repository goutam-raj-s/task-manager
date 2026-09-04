# Task Manager API

A RESTful API for managing tasks using Node.js, Express.js, and in-memory data storage.

## Features
- Create, Read, Update, and Delete (CRUD) operations for Tasks.
- In-memory data storage.
- Built with TypeScript and Express.js.
- Tested using Jest and Supertest.

## Getting Started

### Prerequisites
- Node.js (v14 or above)
- npm

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the application
Start the development server:
```bash
npm run dev
```

Build and run in production mode:
```bash
npm run build
npm start
```

### Running Tests
Run the test suite:
```bash
npm run test
```

## API Endpoints

### Tasks
- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a task by ID
- `POST /tasks` - Create a new task
  - Body: `{ "title": "string", "description": "string" }`
- `PUT /tasks/:id` - Update a task
  - Body: `{ "title"?: "string", "description"?: "string", "completed"?: boolean }`
- `DELETE /tasks/:id` - Delete a task
