import { useState } from 'react';
import Header from './components/Header';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai'; // Search Icon
import { FaLocationArrow } from 'react-icons/fa'; // Location Icon

const JobsPage = () => {
    // React Hooks for the search query and filter values
    const [searchQuery, setSearchQuery] = useState(''); // Job title, keywords, or company
    const [location, setLocation] = useState('Phoenix, AZ');
    const [experience, setExperience] = useState('All')
    const [remote, setRemote] = useState(false)
    const [education, setEducation] = useState('All')

    // Pre-set filters based on search parameters
    const { preset } = useParams()

    if (preset == 'current') {
        setExperience('None');
        setEducation('None');
    }

    if (preset == 'alumni') {
        setExperience('Entry');
        setEducation('High School');
    }

    return (
        <>
            <Header />
            <main className="w-full min-h-screen flex flex-col items-center p-4">
                {/* Search Bar */}
                <div className="w-full max-w-2xl p-4 shadow-xl rounded-full flex items-center">
                    <AiOutlineSearch className="text-brand-dark-grey mr-2" />
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Job title, keywords, or company' className='w-full p-2 text-lg border-r border-brand-dark-grey outline-none ' />
                </div>
            </main>
        </>
    )
}

export default JobsPage