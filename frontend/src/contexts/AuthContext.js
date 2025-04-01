import { createContext, useState, useContext, useEffect } from 'react';

// Create an authentication context
const AuthContext = createContext(null);

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Load user data from localStorage on initial render
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            setUser(null);
            return;
        }
    
        try {
            const response = await fetch("/api/auth/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }
    
            const userData = await response.json();
            setUser(userData); // Ensure user state is updated
        } catch (error) {
            console.error("Auth check failed:", error);
            setUser(null);
        }
    };

    // Check authentication on initial load
    useEffect(() => {
        checkAuth();

        // Listen for changes to localStorage
        window.addEventListener('storage', checkAuth);

        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    // Login method
    const login = (userData, token) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
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