import { useState, useEffect } from 'react';
import Header from './components/Header';
import Dropdown from './components/Dropdown';
import JobPost from './components/JobPost';
import { useParams } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai'; // Search Icon
import { FaLocationArrow } from 'react-icons/fa'; // Location Icon
import { useAuth } from './contexts/AuthContext'; // Import auth context for token

const JobsPage = () => {
    // React Hooks for the search query and filter values
    const [searchQuery, setSearchQuery] = useState(''); // Job title, keywords, or company
    const [location, setLocation] = useState('');
    const [experience, setExperience] = useState('Any Experience')
    const [remote, setRemote] = useState('Any')
    const [education, setEducation] = useState('All')
    const [isLoading, setIsLoading] = useState(true);
    
    // Get auth context for token
    const { token } = useAuth();
    
    // Get jobs from MongoDB
    const [jobs, setJobs] = useState([]);
    
    // Function to fetch all jobs
    const fetchJobs = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/jobs/listings');
            const data = await response.json();
            
            if (data.success) {
                const formatted = data.data.map((job) => ({
                    id: job._id, // Using MongoDB's _id instead of jobId
                    title: job.title,
                    company: job.company,
                    desc: job.description, // Changed from desc to description
                    payRange: {
                        min: job.payRange?.min ?? 0,  // Default to 0 if undefined
                        max: job.payRange?.max ?? 0,
                        currency: job.payRange?.currency || 'USD',
                        unit: job.payRange?.unit || 'hour', // Changed from hourly to hour
                    },
                    location: job.location,
                    datePosted: new Date(job.datePosted),
                    logo: job.logo,
                    remote: job.remote,
                    education: job.education,
                    experienceLevel: job.experienceLevel,
                }));
                setJobs(formatted);
            } else {
                console.error('Failed to fetch jobs:', data.message);
            }
        } catch (err) {
            console.error('Error fetching jobs:', err);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Function to search jobs with filters
    const searchJobs = async () => {
        setIsLoading(true);
        try {
            // Build query parameters
            const queryParams = new URLSearchParams();
            
            if (searchQuery) queryParams.append('title', searchQuery);
            if (location) queryParams.append('location', location);
            if (experience !== 'Any Experience') {
                let expLevel;
                switch(experience) {
                    case 'No Experience':
                        expLevel = 'Entry';
                        break;
                    case 'Entry Level':
                        expLevel = 'Entry';
                        break;
                    case 'Mid Level':
                        expLevel = 'Intermediate';
                        break;
                    default:
                        expLevel = 'Entry';
                }
                queryParams.append('experienceLevel', expLevel);
            }
            
            // Fetch filtered jobs
            const response = await fetch(`http://localhost:5000/api/jobs/listings?${queryParams.toString()}`);
            const data = await response.json();
            
            if (data.success) {
                const formatted = data.data.map((job) => ({
                    id: job._id,
                    title: job.title,
                    company: job.company,
                    desc: job.description,
                    payRange: {
                        min: job.payRange?.min ?? 0,
                        max: job.payRange?.max ?? 0,
                        currency: job.payRange?.currency || 'USD',
                        unit: job.payRange?.unit || 'hour',
                    },
                    location: job.location,
                    datePosted: new Date(job.datePosted),
                    logo: job.logo,
                    remote: job.remote,
                    education: job.education,
                    experienceLevel: job.experienceLevel,
                }));
                setJobs(formatted);
            } else {
                console.error('Failed to search jobs:', data.message);
            }
        } catch (err) {
            console.error('Error searching jobs:', err);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchJobs();
    }, []);

    // Pre-set filters based on search parameters
    const { preset } = useParams()

    useEffect(() => {
        if (preset === 'current') {
            setExperience('None');
            setEducation('None');
        }

        if (preset === 'alumni') {
            setExperience('Entry');
            setEducation('High School');
        }
    }, [preset]);

    // Handle search button click
    const handleSearch = (e) => {
        e.preventDefault();
        searchJobs();
    };

    return (
        <>
            <Header />
            <main className="w-full min-h-screen flex flex-col items-center p-4">
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="w-full md:max-w-2xl p-4 shadow-[rgba(0,0,0,0.4)_3px_3px_1px_0px] rounded-2xl flex flex-wrap md:flex-nowrap items-center border border-black">
                    <AiOutlineSearch className="text-brand-dark-gray mr-2 size-7 md:size-10" />
                    <input 
                        type="text" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        placeholder='Job title, keywords, or company' 
                        className='w-10/12 p-2 text-lg outline-none border-b-2 border-brand-dark-gray md:w-full md:border-b-0 md:border-r-2 md:mr-2' 
                    />
                    <FaLocationArrow className="text-brand-dark-gray mr-2 size-5 md:size-8" />
                    <input 
                        type="text" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        placeholder='Phoenix, AZ' 
                        className='w-1/2 p-2 text-lg outline-none' 
                    />
                    <button 
                        type="submit"
                        className="bg-brand-primary text-white px-6 py-2 rounded-2xl"
                    >
                        Search
                    </button>
                </form>
                
                {/* Filters */}
                <div className="flex my-4 mx-0 justify-around flex-wrap md:justify-start md:gap-4">
                    {/* Experience Dropdown */}
                    <Dropdown 
                        label="Experience"
                        options={['Any Experience', 'No Experience', 'Entry Level', 'Mid Level']}
                        selected={experience}
                        onSelect={(value) => {
                            setExperience(value);
                            // Trigger search when dropdown changes
                            setTimeout(() => searchJobs(), 100);
                        }}
                    />
                    <Dropdown 
                        label="Remote"
                        options={['Any', 'Remote Only', 'On-Site']}
                        selected={remote}
                        onSelect={(value) => {
                            setRemote(value);
                            // Trigger search when dropdown changes
                            setTimeout(() => searchJobs(), 100);
                        }}
                    />
                    <Dropdown 
                        label="Education"
                        options={['All', 'No Degree', 'High School Degree', 'Bachelor\'s Degree', 'Master\'s Degree']}
                        selected={education}
                        onSelect={(value) => {
                            setEducation(value);
                            // Trigger search when dropdown changes
                            setTimeout(() => searchJobs(), 100);
                        }}
                    />
                </div>
                
                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center w-full py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
                    </div>
                )}
                
                {/* Job List */}
                {!isLoading && jobs.length === 0 && (
                    <div className="text-center py-8">
                        <h3 className="text-xl font-semibold">No jobs found</h3>
                        <p className="text-gray-600">Try adjusting your search criteria</p>
                    </div>
                )}
                
                {!isLoading && jobs.length > 0 && (
                    <div className="w-full max-w-4xl">
                        {jobs
                            .filter((job) => {
                                const matchesSearchQuery = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
                                const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
                                const matchesRemote = remote === 'Any' || 
                                                     (remote === 'Remote Only' && job.remote) || 
                                                     (remote === 'On-Site' && !job.remote);
                                const matchesEducation = education === 'All' || 
                                                       (job.education && job.education.toLowerCase().includes(education.toLowerCase()));
                                
                                // Client-side filtering as backup for API filtering
                                return matchesSearchQuery && matchesLocation && matchesRemote && matchesEducation;
                            })
                            .map((job) => (
                                <JobPost key={job.id} {...job} />
                            ))
                        }
                    </div>
                )}
            </main>
        </>
    );
};

export default JobsPage;