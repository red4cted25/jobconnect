import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create authentication context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if token exists and validate user session
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, []);

    // Fetch user profile with token
    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            // Get token from local storage
            const token = localStorage.getItem('token');
            if (!token) {
                console.warn('No token found, redirecting to login');
                logout();
                return;
            }

            // Include token in request headers
            const response = await axios.get('http://localhost:5000/api/auth/profile');

            if (response.data) {
                setCurrentUser(response.data);
            } else {
                console.warn('Profile data is empty or undefined');
                setCurrentUser(null);
            }
        } catch (err) {
            console.error('Error fetching profile:', err.message || err);
            logout(); // If token is invalid, log the user out
        } finally {
            setLoading(false);
        }
    };

    // Login function
    const login = async (email, password) => {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });

            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            setCurrentUser(res.data.user);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Register function
    const register = async (userData) => {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.post('http://localhost:5000/api/auth/register', userData);

            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            setCurrentUser(res.data.user);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, loading, error, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
