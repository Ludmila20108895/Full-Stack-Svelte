# Explorer-Svelte

Explorer-Svelte is a modern full-stack web application that lets users explore and manage their favorite places (Points of Interest or POIs). With a clean, reactive frontend built in SvelteKit, and a secure backend using Node.js and MongoDB, the app supports full CRUD operations, image uploads via Cloudinary, map integration, user authentication with JWT, and admin-level analytics.

## Deployment

The application is live on Render:  
https://explorer-svelte.onrender.com

Demo Login:
Email: <test@try.com>

Password: Pass123456

---

## Key Features

- User Authentication with JWT and cookie-based session management

- POI CRUD Operations – create, read, update, delete POIs

- Category Support – organize POIs into types like City, Beach, Mountain, etc.

- Cloudinary Integration for uploading and displaying images

- Google Maps Support – view POIs on a map using latitude and longitude

- Admin Dashboard for managing users and points

- RESTful APIs with structured routing and validation

- Joi-based Validation for both frontend forms and backend APIs

- Responsive Svelte UI for fast and dynamic interactions

- MongoDB via Mongoose for persistent data storage

---

## Technologies Used

- Frontend: SvelteKit

- Backend: Node.js + Hapi

- Database: MongoDB + Mongoose

- Authentication: JSON Web Tokens (JWT)

- Image Uploads: Cloudinary

- Validation: Joi

- Testing: Mocha + Chai (unit & integration tests)

- Deployment: Render

## Project Structure

explorer-svelte/
├── src/
│ ├── routes/ # SvelteKit route endpoints
│ ├── lib/ # Shared logic and helpers
│ ├── components/ # UI components
│ ├── stores/ # State management
│ └── hooks/ # Handle auth/session hooks
├── static/ # Public assets
├── .env # Environment configuration
├── svelte.config.js, vite.config.ts, etc.
└── ...

## 🛠 Setup Instructions

### 1. Install Dependencies

npm install

### 2. Create a .env File

.env
JWT_SECRET=yourSecretKey
MONGO_URL=mongodb://localhost/explorer
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

### 3. Run in Development Mode

npm run dev

To auto-open in browser:

npm run dev

### 4. Build for Production

npm run build
npm run preview

## Running Tests

npm test

## Assignment 2 Feature Alignment

| Feature                 | Implemented                       |
| ----------------------- | --------------------------------- |
| User & POI Validation   | Joi schema validations            |
| MongoDB Models          | User & POI models                 |
| Full CRUD Support       | Create, update, delete POIs       |
| Cloudinary Integration  | Upload & view images              |
| JWT Authentication      | Token-based login                 |
| Admin Dashboard         | Charts and analytics              |
| RESTful API Routes      | Modular route structure           |
| Testing                 | Mocha + Chai tests                |
| OpenAPI-Ready Structure | Extensible and documented backend |
