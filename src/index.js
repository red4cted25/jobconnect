import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './Home';
import JobsPage from './Jobs.jsx';
import SignInPage from './SignIn.jsx';

// Two routes to ensure only users who are logged in can access certain pages/apply for jobs
// For those who are not logged in:
const publicRouter = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/jobs', element: <JobsPage /> },
  { path: '/login', element: <SignInPage /> },
])
// For user who are logged in:
const privateRouter = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/jobs', element: <JobsPage /> },
])

// Renders the app based on the logged-in status of the user
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Uses localStorage to check if the user is logged in */}
    <RouterProvider router={localStorage.getItem('login-status') ? privateRouter : publicRouter} /> 
  </React.StrictMode>
);
