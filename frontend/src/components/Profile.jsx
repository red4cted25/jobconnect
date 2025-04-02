import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from './Header';

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [editedBio, setEditedBio] = useState("");
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    // Fetch user profile on mount
    useEffect(() => {
        const fetchUserProfile = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users/settings", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setUser(response.data);
            setEditedBio(response.data.bio || "");
        } catch (err) {
            console.error("Failed to load profile", err);
            setError("Failed to load profile");
        }
        };

        fetchUserProfile();
    }, []);

    const handleSaveBio = async () => {
        try {
        const response = await axios.patch(
            "http://localhost:5000/api/users/update",
            { bio: editedBio },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setUser(response.data);
        setIsEditingBio(false);
        setError("");
        } catch (err) {
        console.error("Failed to update bio", err);
        setError("Failed to update bio. Please try again.");
        }
    };

    const handleProfilePicUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
        const base64Image = reader.result;
        try {
            setUploading(true);
            const response = await axios.post(
            `http://localhost:5000/api/users/${user._id}/uploadProfile`,
            { base64Image },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            // Update the user profile with the new profile picture URL returned from the backend
            setUser((prev) => ({ ...prev, profilePicture: response.data.profilePicture }));
            setUploading(false);
        } catch (err) {
            console.error("Failed to upload profile picture", err);
            setError("Failed to upload profile picture. Please try again.");
            setUploading(false);
        }
        };
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
        fileInputRef.current.click();
        }
    };

    if (!user) {
        return (
        <div className="flex justify-center items-center h-screen">
            {error ? <p className="text-red-500">{error}</p> : <p>Loading...</p>}
        </div>
        );
    }

    return (
        <>
            <Header />
            <div className="max-w-4xl mx-auto">
            {/* Cover Image */}
            <div className="bg-blue-500 w-full h-40 lg:h-60"></div>
            <div className="relative -top-10 lg:-top-16 flex flex-col items-center">
                {/* Profile Picture with Upload Button */}
                <div className="relative">
                <img
                    src={user.profilePicture || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="rounded-full border-4 border-white w-40 h-40 lg:w-60 lg:h-60 object-cover"
                />
                <button
                    onClick={triggerFileInput}
                    className="absolute bottom-0 right-0 bg-blue-500 text-white px-2 py-1 rounded text-xs"
                >
                    {uploading ? "Uploading..." : "Change"}
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleProfilePicUpload}
                    className="hidden"
                />
                </div>
                {/* Display Full Name */}
                <h1 className="font-bold text-2xl mt-2">
                {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "User Name"}
                </h1>
                <h3 className="font-bold text-lg text-[#5c5c5c]">
                {user.accountType ? user.accountType.charAt(0).toUpperCase() + user.accountType.slice(1) : "User Type"}
                </h3>
            </div>

            {/* Bio Section */}
            <div className="bg-gray-300 w-full max-w-[20rem] lg:max-w-[30rem] mx-auto rounded-xl p-4 mt-8">
                <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl text-[#FF8000]">Bio</h1>
                {!isEditingBio && (
                    <button
                    onClick={() => setIsEditingBio(true)}
                    className="text-blue-600 hover:underline"
                    >
                    Edit
                    </button>
                )}
                </div>
                {isEditingBio ? (
                <div className="mt-4">
                    <textarea
                    className="w-full p-2 border rounded"
                    rows="5"
                    value={editedBio}
                    onChange={(e) => setEditedBio(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end space-x-2 mt-2">
                    <button
                        onClick={() => {
                        setIsEditingBio(false);
                        setEditedBio(user.bio || "");
                        }}
                        className="bg-gray-200 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveBio}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                    </div>
                </div>
                ) : (
                <p className="text-lg text-[#5c5c5c] mt-2 break-words">
                    {user.bio || "No bio available. Click edit to add one."}
                </p>
                )}
                {error && (
                <p className="text-red-500 mt-2 text-sm">{error}</p>
                )}
            </div>

            {/* MyDocuments Section */}
            <div className="bg-gray-300 w-full max-w-[20rem] lg:max-w-[30rem] mx-auto rounded-xl p-4 mt-8">
                <h1 className="font-bold text-2xl text-[#FF8000] mb-3">MyDocuments</h1>
                <div className="flex justify-around">
                <div className="w-20 h-20 rounded-lg bg-white flex flex-col items-center justify-center">
                    <h2 className="font-bold text-md text-[#5c5c5c]">Resume</h2>
                </div>
                <div className="w-20 h-20 rounded-lg bg-white flex flex-col items-center justify-center">
                    <h2 className="font-bold text-md text-[#5c5c5c]">Cover Letter</h2>
                </div>
                <div className="w-20 h-20 rounded-lg bg-[#5c5c5c] flex flex-col items-center justify-center">
                    <h2 className="font-bold text-md text-white">Add More</h2>
                </div>
                </div>
            </div>
            </div>
        </>
        
    );
}
