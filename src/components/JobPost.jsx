import { Link } from 'react-router-dom'

const JobPost = ({jobId, title, company, location, remote, payRange, experienceLevel, datePosted, desc, logo, education}) => {
    // Format date to be more readable
    const formattedDate = new Date(datePosted).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
        });
    
        return (
        <div className="w-11/12 bg-brand-light-gray p-4 rounded-lg m-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Logo Section */}
                <div className="flex justify-center md:justify-start">
                    <img src={logo} alt={`${company} logo`} className="w-20 h-20 md:w-28 md:h-28 object-scale-down"/>
                </div>
        
                {/* Content Section */}
                <div className="flex-1 space-y-3 text-center md:text-left">
                    {/* Header Info */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-semibold text-brand-primary">{title}</h2>
                        <div className="text-lg font-medium">{company}</div>
                    </div>
        
                    {/* Key Details */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-brand-primary bg-opacity-10 text-brand-primary">
                            {location}
                        </span>
                        {remote && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                            Remote
                            </span>
                        )}
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                            {experienceLevel}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                            {education}
                        </span>
                    </div>
        
                    {/* Pay Range */}
                    <div className="text-brand-dark-gray font-medium">
                        ${payRange.min} - ${payRange.max} / {payRange.unit}
                    </div>
        
                    {/* Description */}
                    <p className="text-sm text-brand-dark-gray line-clamp-3 md:line-clamp-4">
                        {desc}
                    </p>
        
                    {/* Footer Info */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between text-sm text-brand-dark-gray">
                        <span>Posted: {formattedDate}</span>
                    </div>
                </div>
        
                {/* Action Section */}
                <div className="flex flex-col gap-2 md:min-w-[120px]">
                    <Link to={`/jobs/apply/${jobId}`} className="w-full bg-brand-primary text-white py-2 px-4 rounded-md uppercase text-center text-sm font-medium hover:bg-opacity-90 transition-colors">
                        Apply Now
                    </Link>
                    <Link to={`/jobs/post/${jobId}`} className="w-full bg-transparent border border-brand-primary text-brand-primary py-2 px-4 rounded-md uppercase text-center text-sm font-medium hover:bg-brand-primary hover:text-white transition-colors">
                        Learn More
                    </Link>
                </div>
            </div>
        </div>
        );
    };
    
    export default JobPost;