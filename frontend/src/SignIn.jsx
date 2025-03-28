import React, { useState } from 'react'
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        firstName: '',
        lastName: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                // Login logic
                const response = await axios.post('http://localhost:5000/api/auth/login', {
                    email: formData.email,
                    password: formData.password
                });

                // Store the JWT token
                localStorage.setItem('token', response.data.token);
                
                // Redirect to dashboard or home page
                navigate('/dashboard');
            } else {
                // Sign up logic
                const response = await axios.post('http://localhost:5000/api/auth/register', {
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    username: formData.username
                });

                // Automatically log in after sign up
                localStorage.setItem('token', response.data.token);
                navigate('/');
            }
        } catch (err) {
            // Handle errors
            console.log(err)
            setError(err.response?.data?.message || 'An error occurred');
        }
    };
    
    return (
        <>
            <div className="h-screen w-screen bg-brand-light-gray absolute -z-10"></div>
            {/* Back Arrow */}
            <Link to='/' className='flex gap-2 ml-4 pt-2 mb-12 items-center text-inherit py-3 px-5 transition-all duration-300 ease-linear hover:underline underline-offset-8'>
                <BiArrowBack />
                <h1>Back</h1>
            </Link>
            
            {/* Form */}
            <div className="bg-white shadow-xl w-5/6 mx-auto rounded-2xl md:w-1/2">
                <header className="text-center text-white bg-brand-secondary py-3 rounded-t-2xl">
                    <h1 className='ml-4 text-2xl'>Job<span className='text-brand-primary'>Connect</span></h1>
                    <h2 className='-mt-1'>@ West-<span className='text-brand-primary'>MEC</span></h2>
                </header>
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">
                        {isLogin ? 'Welcome Back!' : 'Ready to take the next step?'}
                    </h2>
                    <p className="text-gray-600 mb-6">
                        {isLogin ? 'Log in to your account' : 'Create an account or '}
                        <span 
                            onClick={() => setIsLogin(!isLogin)} 
                            className="text-blue-600 cursor-pointer hover:underline"
                        >
                            {isLogin ? 'Sign up' : 'sign in'}
                        </span>
                    </p>
                    
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {!isLogin && (
                            <>
                                <div>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </>
                        )}

                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength="6"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                        >
                            {isLogin ? 'Log In' : 'Sign Up'}
                        </button>
                    </form>

                    {isLogin && (
                        <div className="text-center mt-4">
                            <Link to="/forgot-password" className="text-blue-600 hover:underline">
                                Forgot Password?
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default AuthPage