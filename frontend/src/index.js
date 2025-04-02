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
  const { user } = useAuth();

  if (!user) {
      return <Navigate to="/login" />;
  }

  return children;
};


// Create router with protected and public routes
const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/jobs', element: <JobsPage /> },
  { path: '/login', element: <SignInPage /> },
  { path: '/FAQ', element: <FAQPage /> },
  { path: '/settings', element: (<SettingsPage />) },
  { path: '/jobs/apply/:id', element: (<ApplyPage />) },
  { path: '/profile', element: (<ProfilePage />) }
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