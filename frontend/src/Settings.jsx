import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Settings } from 'lucide-react';

const SettingsPage = () => {
    // State to manage current user and settings
    const [user, setUser] = useState(null);
    const [selectedSection, setSelectedSection] = useState('accountSettings');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserSettings = async () => {
            try {
                // Adjust the API endpoint to match your backend route
                const response = await axios.get('/api/user/settings', {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
                setUser(response.data);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to load user settings');
                setIsLoading(false);
            }
        };

        fetchUserSettings();
    }, []);

    // Handler for changing settings sections
    const handleSectionChange = (e) => {
        setSelectedSection(e.target.value);
    };

    // Modal state for settings changes
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);

    // Generic modal handler
    const openModal = (action) => {
        setCurrentAction(action);
        setIsModalOpen(true);
    };

    // Modal for changing settings
    const SettingsModal = () => {
        const [formData, setFormData] = useState({});
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await axios.patch('/api/user/update', { [currentAction]: formData }, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
                // Refresh user data or update local state
                setIsModalOpen(false);
            } catch (err) {
                console.error('Update failed', err);
            }
        };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isModalOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4 capitalize">{currentAction} Change</h2>
            <form onSubmit={handleSubmit}>
                {/* Dynamic form fields based on currentAction */}
                {currentAction === 'email' && (
                <input 
                    type="email" 
                    placeholder="New Email" 
                    className="w-full p-2 border rounded"
                    onChange={(e) => setFormData({ email: e.target.value })}
                />
                )}
                {/* Add similar conditions for other settings */}
                <div className="flex justify-end space-x-2 mt-4">
                <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    className="bg-gray-200 px-4 py-2 rounded"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Save
                </button>
                </div>
            </form>
            </div>
        </div>
        );
    };

    // Render loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin">
                <Settings className="w-12 h-12 text-gray-500" />
                </div>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="text-red-500 text-center mt-10">
                {error}
            </div>
        );
    }

    return (
        <div className="flex items-center flex-col mt-5">
            {/* Settings Section Dropdown */}
            <select 
                name="options" 
                id="settingsOptions" 
                className="bg-[#D9D9D9] w-48 text-center rounded-md p-1"
                value={selectedSection}
                onChange={handleSectionChange}
            >
                <option value="accountSettings" className="bg-white">Account Settings</option>
                <option value="appearanceSettings" className="bg-white">Appearance Settings</option>
                <option value="privacySettings" className="bg-white">Privacy Settings</option>
            </select>

            {/* Account Type Section */}
            <div className="flex items-center border border-[#999999] rounded-lg p-2 m-4 w-82">
                <div className="flex-col mx-5 my-1">
                    <p>Account Type: </p>
                    <h1 className="text-gray-600 font-bold">{user?.accountType || 'Not Set'}</h1>
                </div>
                <div>
                    <button className="border border-[#999999] rounded-md p-1" onClick={() => openModal('accountType')}>Change Account Type</button>
                </div>
            </div>

            {/* Email Section */}
            <div className="flex items-center border border-[#999999] rounded-lg p-2 m-4 w-82">
                <div className="flex-col mx-5 my-1 max-w-3/6">
                    <p>Email: </p>
                    <h1 className="text-gray-600 font-bold truncate">{user?.email || 'No email set'}</h1>
                </div>
                <div>
                    <button className="border border-[#999999] rounded-md p-1" onClick={() => openModal('email')}>Change Email</button>
                </div>
            </div>

            {/* Password Section */}
            <div className="flex items-center border border-[#999999] rounded-lg p-2 m-4 w-82">
                <div className="flex-col ml-5 mr-18 my-1">
                    <p>Password: </p>
                    <h1 className="text-gray-600 font-bold">**********</h1>
                </div>
                <div>
                    <button className="border border-[#999999] rounded-md p-1" onClick={() => openModal('password')}>Change Password</button>
                </div>
            </div>

            {/* Phone Number Section */}
            <div className="flex items-center border border-[#999999] rounded-lg p-2 m-4 w-82">
                <div className="flex-col ml-5 mr-9 my-1">
                    <p>Phone Number: </p>
                    <h1 className="text-gray-600 font-bold">{user?.phoneNumber || 'No phone number set'}</h1>
                </div>
                <div>
                    <button className="border border-[#999999] rounded-md p-1" onClick={() => openModal('phoneNumber')}>Change Phone Number</button>
                </div>
            </div>

            {/* Settings Change Modal */}
            <SettingsModal />
        </div>
    );
};

export default SettingsPage;