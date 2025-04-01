import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import ApplyPage from './components/Apply.jsx';
import ProfilePage from './components/Profile.jsx';
import HomePage from './Home.jsx';
import JobsPage from './Jobs.jsx';
import SignInPage from './SignIn.jsx';
import FAQPage from './FAQ.jsx';
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
  { path: '/FAQ', element: <FAQPage /> },
  { path: '/settings', element: (<ProtectedRoute><SettingsPage /></ProtectedRoute>) },
  { path: '/apply', element: (<ProtectedRoute><ApplyPage /></ProtectedRoute>) },
  { path: '/profile', element: (<ProtectedRoute><ProfilePage /></ProtectedRoute>) }
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