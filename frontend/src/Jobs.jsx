import { useState, useEffect } from 'react';
import Header from './components/Header';
import Dropdown from './components/Dropdown';
import JobPost from './components/JobPost';
import { useParams } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaLocationArrow } from 'react-icons/fa';

const JobsPage = () => {
    const [searchQuery, setSearchQuery] = useState(''); // Job title, keywords, or company
    const [location, setLocation] = useState('');
    const [experience, setExperience] = useState('Any Experience');
    const [remote, setRemote] = useState('Any');
    const [education, setEducation] = useState('All');
    const [jobs, setJobs] = useState([]);
    
    const { preset } = useParams();

    // Preset filter values based on URL parameter (if any)
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

    useEffect(() => {
        fetch('http://localhost:5000/api/jobs')
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
            const formatted = data.data.map((job) => ({
                _id: job._id, 
                title: job.title,
                company: job.company,
                desc: job.desc, // using 'desc' from the new schema
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
            console.error('Failed to fetch jobs:', data.message);
            }
        })
        .catch((err) => console.error('Error fetching jobs:', err));
    }, []);

    const filteredJobs = jobs.filter((job) => {
        const matchesSearchQuery = job.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLocation = job.location.toLowerCase().includes(location.toLowerCase());
        const matchesExperience = experience === 'Any Experience' || job.experienceLevel.toLowerCase().includes(experience.toLowerCase());
        const matchesRemote =
        remote === 'Any' ||
        (remote === 'Remote Only' && job.remote) ||
        (remote === 'On-Site' && !job.remote);
        const matchesEducation = education === 'All' || (job.education && job.education.toLowerCase().includes(education.toLowerCase()));
        return matchesSearchQuery && matchesLocation && matchesExperience && matchesRemote && matchesEducation;
    });

    return (
        <>
        <Header />
        <main className="w-full min-h-screen flex flex-col items-center p-4">
            {/* Search Bar */}
            <div className="w-full md:max-w-2xl p-4 shadow-[rgba(0,0,0,0.4)_3px_3px_1px_0px] rounded-2xl flex flex-wrap md:flex-nowrap items-center border border-black">
            <AiOutlineSearch className="text-brand-dark-gray mr-2 text-2xl" />
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Job title, keywords, or company"
                className="w-10/12 p-2 text-lg outline-none border-b-2 border-brand-dark-gray md:w-full md:border-b-0 md:border-r-2 md:mr-2"
            />
            <FaLocationArrow className="text-brand-dark-gray mr-2 text-xl" />
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Phoenix, AZ"
                className="w-1/2 p-2 text-lg outline-none"
            />
            <button className="bg-brand-primary text-white px-6 py-2 rounded-2xl">
                Search
            </button>
            </div>
            {/* Filters */}
            <div className="flex my-4 mx-0 justify-around flex-wrap md:justify-start md:gap-4">
            <Dropdown 
                label="Experience"
                options={['Any Experience', 'No Experience', 'Entry Level', 'Mid Level']}
                selected={experience}
                onSelect={setExperience}
            />
            <Dropdown 
                label="Remote"
                options={['Any', 'Remote Only', 'On-Site']}
                selected={remote}
                onSelect={setRemote}
            />
            <Dropdown 
                label="Education"
                options={['All', 'No Degree', "High School Degree", "Bachelor's Degree", "Master's Degree"]}
                selected={education}
                onSelect={setEducation}
            />
            </div>
            {/* Job List */}
            {filteredJobs.map((job) => (
            <JobPost key={job._id} {...job} />
            ))}
        </main>
        </>
    );
};

export default JobsPage;
