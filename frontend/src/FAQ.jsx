import { FaSearch } from "react-icons/fa"

const FAQPage = () => {
    return (
        <>
            <div className="flex border border-black border-[1.5px] rounded-2xl p-1 w-100 items-center mx-auto my-8">
                <FaSearch />
                <input type="text" placeholder="Search by topic..." className="font-medium mx-2" />
            </div>

            <div className="w-100 border border-gray-400 h-auto mx-auto p-2 rounded-xl my-4">
                <h1 className="font-bold mb-3">How is JobConnect better than any other job searching site?</h1>
                <p className="font-semibold text-[#5c5c5c]">JobConnect excels over other job sites with its user-friendly interface, and personalized recommendations. It offers real-time alerts and detailed company profiles, helping users make informed decisions. With a diverse range of job listings, JobConnect ensures a tailored and efficient job search experience.</p>
            </div>
            <div className="w-100 border border-gray-400 h-auto mx-auto p-2 rounded-xl my-4">
                <h1 className="font-bold mb-3">How likely are users of JobConnect to be successful in the professional field?</h1>
                <p className="font-semibold text-[#5c5c5c]">Users of JobConnect are highly likely to succeed in their professional field due to the platform's personalized job matching, real-time alerts, and access to a wide range of career opportunities. By aligning job seekers with roles that fit their skills and preferences, JobConnect helps users make informed decisions, increasing their chances of finding the right job and advancing in their careers.</p>
            </div>
            <div className="w-100 border border-gray-400 h-auto mx-auto p-2 rounded-xl my-4">
                <h1 className="font-bold mb-3">What types of jobs are listed on the website?</h1>
                <p className="font-semibold text-[#5c5c5c]">JobConnect offers a wide range of job opportunities across various industries, including tech, engineering, programming, aviation, and other technical fields. Whether you're seeking software development positions, mechanical engineering roles, data analysis jobs, or aviation-related careers, JobConnect connects users to a diverse selection of positions tailored to their skills and expertise. The platform ensures access to both established companies and innovative startups, providing a wealth of career options for those in technical professions.</p>
            </div>
            <div className="w-100 border border-gray-400 h-auto mx-auto p-2 rounded-xl my-4">
                <h1 className="font-bold mb-3">What should I do if I forgot my password?</h1>
                <p className="font-semibold text-[#5c5c5c]">If a user forgets their JobConnect password, they can easily reset it by clicking on the "Forgot Password" link on the login page. After entering the registered email address, they will receive a password reset link in their inbox. Following the link will allow them to create a new password and regain access to their account. If issues persist, users can contact JobConnect's support team for further assistance.</p>
            </div>
        </>
    )
}

export default FAQPage