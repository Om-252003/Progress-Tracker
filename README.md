# Progress-Tracker

This is a MERN stack project with separate frontend and backend.

## Deployment Instructions

### Backend

- Set environment variables:
  - `PORT` (optional, default 5000)
  - `MONGO_URI` (MongoDB connection string)

- Install dependencies and start server:
  ```bash
  cd backend
  npm install
  npm start
  ```

- Deploy backend on your preferred platform (e.g., Heroku, Render, etc.) using the above start script.

### Frontend

- Install dependencies and build the React app:
  ```bash
  cd frontend
  npm install
  npm run build
  ```

- Deploy the contents of the `build` folder to your preferred static hosting service (e.g., Netlify, Vercel, GitHub Pages).

### Notes

- Ensure the backend API URL is correctly configured in the frontend (e.g., in `frontend/src/api.js`) to point to the deployed backend URL.
- Set environment variables on your deployment platform as needed.

## Environment Variables Example

Create a `.env` file in the backend directory with the following content:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
