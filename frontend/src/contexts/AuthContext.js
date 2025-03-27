import { createContext, useState, useContext, useEffect } from 'react';

// Create an authentication context
const AuthContext = createContext(null);

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Check authentication on initial load
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
            try {
                // Parse user data and set authentication
                const parsedUser = JSON.parse(userData);
                setIsAuthenticated(true);
                setUser(parsedUser);
            } catch (error) {
                // Clear invalid localStorage data
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
    }, []);

    // Login method
    const login = (token, userData) => {
        // Store token and user data in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Update authentication state
        setIsAuthenticated(true);
        setUser(userData);
    };

    // Logout method
    const logout = () => {
        // Remove token and user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Reset authentication state
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>{children}</AuthContext.Provider>
    );
};

// Custom hook to use authentication context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};