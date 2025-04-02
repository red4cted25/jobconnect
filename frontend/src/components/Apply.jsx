import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";

const ApplyPage = () => {
    const { id } = useParams(); // id is the job's _id
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loadingJob, setLoadingJob] = useState(true);
    const [error, setError] = useState("");
    const [applicationData, setApplicationData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        coverLetter: ""
    });

    // Fetch the job details using the id from the URL
    useEffect(() => {
        const fetchJob = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
            setJob(response.data);
            setLoadingJob(false);
        } catch (err) {
            console.error(err);
            setError("Failed to load job details.");
            setLoadingJob(false);
        }
        };

        fetchJob();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setApplicationData((prevData) => ({
        ...prevData,
        [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        // Submit application with the job's _id as jobId
        await axios.post(
            "http://localhost:5000/api/applications",
            { ...applicationData, jobId: job._id },
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
            }
        );
        // On success, navigate back to the jobs page or show a success message
        navigate("/jobs");
        } catch (err) {
        console.error(err);
        setError("Failed to submit application. Please try again.");
        }
    };

    return (
        <>
        <Header />
        <div className="max-w-3xl mx-auto p-6">
            {loadingJob ? (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading job details...</p>
            </div>
            ) : error ? (
            <p className="text-red-500 mb-4">{error}</p>
            ) : (
            <>
                <div className="mb-6">
                <h1 className="text-3xl font-bold text-brand-primary mb-2">
                    Apply for {job.title}
                </h1>
                <p className="text-lg text-gray-700">
                    {job.company} &middot; {job.location}
                </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        value={applicationData.firstName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        value={applicationData.lastName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                    />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={applicationData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Phone
                    </label>
                    <input
                        type="text"
                        name="phone"
                        value={applicationData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                    />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                    Address
                    </label>
                    <input
                    type="text"
                    name="address"
                    value={applicationData.address}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700">
                        City
                    </label>
                    <input
                        type="text"
                        name="city"
                        value={applicationData.city}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700">
                        State
                    </label>
                    <select
                        name="state"
                        value={applicationData.state}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                    >
                        <option value="">Select a state</option>
                        <option value="Arizona">Arizona</option>
                        <option value="California">California</option>
                        <option value="Colorado">Colorado</option>
                        <option value="Nevada">Nevada</option>
                        <option value="New Mexico">New Mexico</option>
                        <option value="Utah">Utah</option>
                    </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                    Cover Letter
                    </label>
                    <textarea
                    name="coverLetter"
                    value={applicationData.coverLetter}
                    onChange={handleInputChange}
                    rows="5"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                    ></textarea>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex justify-end">
                    <button
                    type="submit"
                    className="bg-brand-primary text-white px-6 py-2 rounded-md uppercase text-sm font-medium hover:bg-brand-primary-light transition-colors"
                    >
                    Submit Application
                    </button>
                </div>
                </form>
            </>
            )}
        </div>
        </>
    );
};

export default ApplyPage;
