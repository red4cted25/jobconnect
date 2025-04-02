import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Settings } from 'lucide-react';

const SettingsPage = () => {
    // State to manage current user and settings
    const [user, setUser] = useState(null);
    const [selectedSection, setSelectedSection] = useState('accountSettings');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal state for settings changes
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);
    const [modalError, setModalError] = useState(null);

    // This state will hold the new value for the setting being changed.
    const [formData, setFormData] = useState({});

    // Fetch user settings on component mount
    useEffect(() => {
        const fetchUserSettings = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/settings', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
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

    // Open modal for a specific setting change and pre-populate formData if applicable
    const openModal = (action) => {
        setCurrentAction(action);
        // Pre-populate with current value if available (except for password)
        if (action !== 'password') {
        setFormData({ [action]: user[action] || '' });
        } else {
        setFormData({});
        }
        setModalError(null);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentAction(null);
        setFormData({});
        setModalError(null);
    };

    // Handler for form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value,
        }));
    };

    // Handler for modal form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // If updating password, ensure password and confirmPassword match
        if (currentAction === 'password') {
        if (formData.password !== formData.confirmPassword) {
            setModalError('Passwords do not match');
            return;
        }
        }
        try {
        // Updated endpoint to match your backend
        await axios.patch('http://localhost:5000/api/users/update', { [currentAction]: formData[currentAction] || formData.password }, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        // Refresh user data after update
        const updatedUser = await axios.get('http://localhost:5000/api/users/settings', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setUser(updatedUser.data);
        closeModal();
        } catch (err) {
        console.error('Update failed', err);
        setModalError('Update failed. Please try again.');
        }
    };

    // Settings Modal Component
    const SettingsModal = () => {
        if (!isModalOpen) return null;

        return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-80">
            <h2 className="text-xl font-bold mb-4 capitalize">{currentAction} Change</h2>
            <form onSubmit={handleSubmit}>
                {currentAction === 'email' && (
                <input
                    type="email"
                    name="email"
                    placeholder="New Email"
                    className="w-full p-2 border rounded"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    required
                />
                )}
                {currentAction === 'password' && (
                <>
                    <input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    className="w-full p-2 border rounded mb-2"
                    onChange={handleInputChange}
                    required
                    />
                    <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    className="w-full p-2 border rounded"
                    onChange={handleInputChange}
                    required
                    />
                </>
                )}
                {currentAction === 'phoneNumber' && (
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="New Phone Number"
                    className="w-full p-2 border rounded"
                    value={formData.phoneNumber || ''}
                    onChange={handleInputChange}
                    required
                />
                )}
                {currentAction === 'accountType' && (
                <select
                    name="accountType"
                    className="w-full p-2 border rounded"
                    value={formData.accountType || ''}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select Account Type</option>
                    <option value="student">Student</option>
                    <option value="employer">Employer</option>
                    <option value="admin">Admin</option>
                </select>
                )}
                {modalError && (
                <p className="text-red-500 text-sm mt-2">{modalError}</p>
                )}
                <div className="flex justify-end space-x-2 mt-4">
                <button
                    type="button"
                    onClick={closeModal}
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
        <div className="flex items-center border border-[#999999] rounded-lg p-2 m-4 w-[20rem]">
            <div className="flex-col mx-5 my-1">
            <p>Account Type: </p>
            <h1 className="text-gray-600 font-bold">{user?.accountType || 'Not Set'}</h1>
            </div>
            <div>
            <button className="border border-[#999999] rounded-md p-1" onClick={() => openModal('accountType')}>
                Change Account Type
            </button>
            </div>
        </div>

        {/* Email Section */}
        <div className="flex items-center border border-[#999999] rounded-lg p-2 m-4 w-[20rem]">
            <div className="flex-col mx-5 my-1 max-w-1/2">
            <p>Email: </p>
            <h1 className="text-gray-600 font-bold truncate">{user?.email || 'No email set'}</h1>
            </div>
            <div>
            <button className="border border-[#999999] rounded-md p-1" onClick={() => openModal('email')}>
                Change Email
            </button>
            </div>
        </div>

        {/* Password Section */}
        <div className="flex items-center border border-[#999999] rounded-lg p-2 m-4 w-[20rem]">
            <div className="flex-col ml-5 mr-6 my-1">
            <p>Password: </p>
            <h1 className="text-gray-600 font-bold">**********</h1>
            </div>
            <div>
            <button className="border border-[#999999] rounded-md p-1" onClick={() => openModal('password')}>
                Change Password
            </button>
            </div>
        </div>

        {/* Phone Number Section */}
        <div className="flex items-center border border-[#999999] rounded-lg p-2 m-4 w-[20rem]">
            <div className="flex-col ml-5 mr-8 my-1">
            <p>Phone Number: </p>
            <h1 className="text-gray-600 font-bold">{user?.phoneNumber || 'No phone number set'}</h1>
            </div>
            <div>
            <button className="border border-[#999999] rounded-md p-1" onClick={() => openModal('phoneNumber')}>
                Change Phone Number
            </button>
            </div>
        </div>

        {/* Settings Change Modal */}
        <SettingsModal />
        </div>
    );
};

export default SettingsPage;
