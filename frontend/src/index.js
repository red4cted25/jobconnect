import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './Home.jsx';
import JobsPage from './Jobs.jsx';
import SignInPage from './SignIn.jsx';
import SettingsPage from './Settings.jsx';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  // Redirect to login if not authenticated
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Create router with protected and public routes
const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/jobs', element: <JobsPage /> },
  { path: '/login', element: <SignInPage /> },
  { path: '/settings', element: (<ProtectedRoute><SettingsPage /></ProtectedRoute>) }
]);

// Render the app with AuthProvider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);