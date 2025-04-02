import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header"; // Import your header component

const ApplyPage = ({ match }) => {
    const [job, setJob] = useState(null);
    const [error, setError] = useState("");
    const [applicationData, setApplicationData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        state: "",
        resume: null,
        coverLetter: null,
    });

    useEffect(() => {
        const fetchJobData = async () => {
        try {
            const response = await axios.get(
            `http://localhost:5000/api/jobs/${match.params.jobId}`
            );
            setJob(response.data);
        } catch (err) {
            setError("Failed to load job details");
        }
        };

        fetchJobData();
    }, [match.params.jobId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setApplicationData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmitApplication = async (e) => {
        e.preventDefault();
        try {
        // Send application data to the backend (you need to create an endpoint for submitting applications)
        const response = await axios.post(
            "http://localhost:5000/api/applications",
            { ...applicationData, jobId: job._id }, // Link the job to the application
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            }
        );
        console.log(response.data); // Handle successful submission
        } catch (err) {
        setError("Failed to submit application");
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
        <Header />
        <div className="lg:bg-gray-300 flex flex-col items-center">
            <h1 className="absolute mt-6 ml-4 text-[#5c5c5c] right-480 text-xl hover:underline">
            Back
            </h1>
            <div className="flex flex-col text-center mt-8 lg:bg-gray-200 lg:p-10 lg:rounded-lg">
            <h3 className="font-semibold text-lg">Currently Applying For:</h3>
            <h1 className="font-bold text-2xl text-[#FF8000]">
                {job ? job.title : "Loading job details..."}
            </h1>
            {/* Add additional job details here */}
            </div>
            <div className="my-2 flex flex-col lg:items-center lg:bg-gray-200 lg:p-10 lg:rounded-lg lg:w-225">
            <h1 className="font-bold text-[#FF8000] ml-6 text-2xl">My Information</h1>
            <form onSubmit={handleSubmitApplication}>
                <div className="ml-12 lg:ml-0 flex flex-col my-4">
                <h1 className="font-semibold text-xl text-[#5c5c5c] my-2">First Name</h1>
                <input
                    type="text"
                    name="firstName"
                    value={applicationData.firstName}
                    onChange={handleInputChange}
                    className="w-80 h-8 border border-gray-400 rounded-lg pl-1"
                />
                </div>
                {/* Repeat similar input fields for lastName, email, address, etc. */}
                <div className="flex justify-center">
                <button
                    type="submit"
                    className="mx-10 my-8 bg-[#FF8000] p-2 rounded-lg border border-[#C04300]"
                >
                    Submit Application
                </button>
                </div>
            </form>
            </div>
        </div>
        </>
    );
};

export default ApplyPage;
