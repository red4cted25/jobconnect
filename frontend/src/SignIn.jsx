import { useState } from 'react'
import { BiArrowBack } from "react-icons/bi";
import { Link } from 'react-router-dom'

const SignInPage = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUsers(prev => [...prev, formData]);
        setFormData({
        email: '',
        username: '',
        password: ''
        });
        console.log('Updated users array:', [...users, formData]);
    };
    
    return (
        <div className='bg-brand-light-gray h-screen'>
            {/* Back Arrow */}
            <Link to='/'>
                <h1 className='flex gap-2 ml-4 pt-2 mb-36 items-center'><BiArrowBack /> Back</h1>
            </Link>

            {/* Sign in Section */}
            <div className="bg-white shadow-xl w-1/2 mx-auto rounded-2xl">
                <header className="text-center text-white bg-brand-secondary py-2 rounded-t-2xl">
                    <h1 className='ml-4 text-2xl'>Job<span className='text-brand-primary'>Connect</span></h1>
                    <h2 className='-mt-1'>@ West-<span className='text-brand-primary'>MEC</span></h2>
                </header>
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">Ready to take the next step?</h2>
                    <p className="text-gray-600 mb-6">Create an account or sign in.</p>
                    
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
                        <div className='pb-6'>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <Link to='/'>
                            <button 
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                            >
                                Sign Up
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignInPage