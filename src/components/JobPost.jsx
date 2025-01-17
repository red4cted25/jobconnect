import { Link } from 'react-router-dom'

const JobPost = ({title, payRange, logo, desc, jobId}) => {
    return (
        <div className="w-11/12 bg-gray-200 p-4 rounded-lg flex items-center m-4">
            {/* Company Logo */}
            <img src={logo} alt="Logo" className="w-1/6 h-auto mr-4" />

            {/* Job Title, Pay, and Description */}
            <div className="flex-1">
                <div className="text-xl font-semibold">{title} - <span className='text-brand-dark-gray'>${payRange.max} / {payRange.unit}</span></div>
                <p className="text-sm text-gray-600 mt-1">{desc}</p>
            </div>

            {/* Apply Button */}
            <Link to={`/jobs/post/${jobId}`} className="bg-brand-primary text-white py-2 px-4 rounded-md ml-4 uppercase">Apply</Link>
        </div>
    );
}

export default JobPost;