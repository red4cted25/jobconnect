import { useState } from 'react';
import Header from './components/Header';
import Dropdown from './components/Dropdown';
import JobPost from './components/JobPost';
import { useParams } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai'; // Search Icon
import { FaLocationArrow} from 'react-icons/fa'; // Location Icon
import { joblist } from './data'

const JobsPage = () => {
    // React Hooks for the search query and filter values
    const [searchQuery, setSearchQuery] = useState(''); // Job title, keywords, or company
    const [location, setLocation] = useState('Phoenix, AZ');
    const [experience, setExperience] = useState('Any Experience')
    const [remote, setRemote] = useState('Any')
    const [education, setEducation] = useState('All')

    // Pre-set filters based on search parameters
    const { preset } = useParams()

    if (preset === 'current') {
        setExperience('None');
        setEducation('None');
    }

    if (preset === 'alumni') {
        setExperience('Entry');
        setEducation('High School');
    }

    return (
        <>
            <Header />
            <main className="w-full min-h-screen flex flex-col items-center p-4">
                {/* Search Bar */}
                <div className="w-full max-w-2xl p-4 shadow-[rgba(0,0,0,0.4)_0px_0px_10px_1px] rounded-2xl flex items-center border border-black">
                    <AiOutlineSearch className="text-brand-dark-gray mr-2 size-10" />
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Job title, keywords, or company' className='w-full p-2 text-lg border-r-2 border-brand-dark-gray outline-none mr-2' />
                    <FaLocationArrow className="text-brand-dark-gray mr-2 size-8" />
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder='City, State' className='w-1/2 p-2 text-lg outline-none' />
                    <button className="bg-brand-primary text-white px-6 py-2 rounded-2xl">Search</button>
                </div>
                {/* Filters */}
                <div className="flex my-4 mx-0 justify-evenly">
                    {/* Experience Dropdown */}
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
                        options={['All', 'No Degree', 'High School Degree', 'Bachelor\'s Degree', 'Master\'s Degree']}
                        selected={education}
                        onSelect={setEducation}
                    />
                </div>
                {/* Job List */}
                {joblist.map((job) => {
                    const matchesSearchQuery = job.title.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesLocation = job.location.toLowerCase().includes(location.toLowerCase());
                    const matchesExperience = experience === 'Any Experience' || job.experienceLevel.toLowerCase().includes(experience.toLowerCase());
                    const matchesRemote = remote === 'Any' || (remote === 'Remote Only' && job.remote) || (remote === 'On-Site' && !job.remote);
                    // TODO: Make it so if a job requires no degree, it shows up in other matches
                    const matchesEducation = education === 'All' || (job.education && job.education.toLowerCase().includes(education.toLowerCase()));
                    
                    if (matchesSearchQuery && matchesLocation && matchesExperience && matchesRemote && matchesEducation) {
                        return (
                            <JobPost key={job.jobId} {...job} />
                        )
                    }
                })}
            </main>
        </>
    )
}

export default JobsPage