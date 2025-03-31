const ApplyPage = () => {
    return (
        <div className="lg:bg-gray-300 flex flex-col items-center">
            <h1 className="absolute mt-6 ml-4 text-[#5c5c5c] right-480 text-xl hover:underline">Back</h1>
            <div className="flex flex-col text-center mt-8 lg:bg-gray-200 lg:p-10 lg:rounded-lg">
                <h3 className="font-semibold text-lg">Currently Applying For:</h3>
                <h1 className="font-bold text-2xl text-[#FF8000]">Software Engineer Intern</h1>
                <div className="w-60 lg:w-200 h-[1px] bg-black mt-5 mx-auto ml-6 mb-3">
                    <div className="relative rounded-full w-3 h-3 bg-[#FF8000] bottom-1"></div>
                    <h1 className="w-40 relative right-18">My Information</h1>
                    <div className="relative rounded-full w-[0.6rem] h-[0.6rem] bg-black bottom-10 ml-20 lg:ml-50"></div>
                    <h1 className="w-40 relative left-32 bottom-8 hidden lg:block">My Experience</h1>
                    <div className="relative rounded-full w-[0.6rem] h-[0.6rem] bg-black bottom-[3.1rem] lg:bottom-[4.6rem] ml-40 lg:ml-130"></div>
                    <h1 className="w-40 relative left-112 bottom-16 hidden lg:block">My Documents</h1>
                    <div className="relative rounded-full w-[0.6rem] h-[0.6rem] bg-black bottom-[3.65rem] ml-58 lg:ml-199 lg:bottom-[6.7rem]"></div>
                    <h1 className="w-40 relative left-180 bottom-25 hidden lg:block">Submit</h1>
                </div>
            </div>
            <div className="my-2 flex flex-col lg:items-center lg:bg-gray-200 lg:p-10 lg:rounded-lg lg:w-225">
                <h1 className="font-bold text-[#FF8000] ml-6 text-2xl">My Information</h1>
                <div className="ml-12 lg:ml-0 flex flex-col my-4">
                    <h1 className="font-semibold text-xl text-[#5c5c5c] my-2">First Name</h1>
                    <input type="text" className="w-80 h-8 border border-gray-400 rounded-lg pl-1"/>
                </div>
                <div className="ml-12 lg:ml-0 flex flex-col my-4">
                    <h1 className="font-semibold text-xl text-[#5c5c5c] my-2">Last Name</h1>
                    <input type="text" className="w-80 h-8 border border-gray-400 rounded-lg pl-1"/>
                </div>
                <div className="ml-12 lg:ml-0 flex flex-col my-4">
                    <h1 className="font-semibold text-xl text-[#5c5c5c] my-2">Email</h1>
                    <input type="text" className="w-80 h-8 border border-gray-400 rounded-lg pl-1"/>
                </div>
                <div className="ml-12 lg:ml-0 flex flex-col my-4">
                    <h1 className="font-semibold text-xl text-[#5c5c5c] my-2">Address</h1>
                    <input type="text" className="w-80 h-8 border border-gray-400 rounded-lg pl-1"/>
                </div>
                <div className="ml-12 lg:ml-0 flex flex-col my-4">
                    <h1 className="font-semibold text-xl text-[#5c5c5c] my-2">City</h1>
                    <input type="text" className="w-80 h-8 border border-gray-400 rounded-lg pl-1"/>
                </div>
                <div className="ml-12 lg:ml-0 flex flex-col my-4">
                    <h1 className="font-semibold text-xl text-[#5c5c5c] my-2">State</h1>
                    <select name="state" id="state" className="w-50 h-8 border border-gray-400 pl-1 rounded-lg">
                        <option value="arizona">Arizona</option>
                        <option value="arizona">California</option>
                        <option value="arizona">Colorado</option>
                        <option value="arizona">Nevada</option>
                        <option value="arizona">New Mexico</option>
                        <option value="arizona">Utah</option>
                    </select>
                </div>
                <div className="flex justify-center">
                    <button className="mx-6 my-8 bg-[#CECECE] p-2 rounded-lg border border-[#5c5c5c]">Previous Section</button>
                    <button className="mx-10 my-8 bg-[#FF8000] p-2 rounded-lg border border-[#C04300]">Next Section</button>
                </div>
            </div>
        </div>
    )
}

export default ApplyPage