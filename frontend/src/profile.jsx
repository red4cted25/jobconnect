const ProfilePage = () => {
    return (
        <div>
            <div class="lg:bg-gray-200">
                <div class="flex flex-col text-center">
                    <div class="bg-blue-500 w-auto h-40 lg:h-60"></div>
                    <div class="relative bottom-17 lg:bottom-32">
                        <img src="../../aquasync logo.png" alt="Profile for User" class="rounded-full border border-white border-4 w-40 h-40 lg:h-60 lg:w-60 relative mx-auto"/>
                        <h1 class="font-bold text-2xl">AquaSync</h1>
                        <h3 class="font-bold text-lg text-[#5c5c5c]">Company</h3>
                    </div>
                </div>
                <div class="flex flex-col text-center bg-gray-300 w-80 h-70 mx-auto rounded-xl relative lg:bottom-24 lg:w-120">
                    <h1 class="font-bold text-2xl text-[#FF8000] my-3">Bio</h1>
                    <p class="text-lg text-[#5c5c5c] text-wrap line-clamp-8">AquaSync is a company specializing in smart water management and distribution solutions. It leverages advanced technology, including IoT sensors, AI-driven analytics, and automated control systems, to optimize water distribution, reduce waste, and improve efficiency. AquaSync serves municipalities, industries, and agricultural sectors, helping them monitor water usage, detect leaks, and ensure sustainable water management. By integrating real-time data insights and automation, AquaSync enhances water conservation efforts and supports global initiatives for efficient water resource management.</p>
                    <p class="font-bold text-lg text-[#FF8000] ml-auto mr-5 hover:underline">See More</p>
                </div>
                <div class="flex flex-col text-center bg-gray-300 w-80 h-40 mx-auto rounded-xl my-6 relative lg:bottom-24 lg:w-120">
                    <h1 class="font-bold text-2xl text-[#FF8000] my-3">MyDocuments</h1>
                    <div class="flex flex-row justify-center">
                        <div class="ml-5 w-20 h-20 rounded-lg bg-white">
                            {{/* Resume Icon */}}
                            <h2 class="font-bold text-md text-[#5c5c5c]">Resume</h2>
                        </div>
                        <div class="ml-5 w-20 h-20 rounded-lg bg-white">
                            {/* Cover Letter Icon */}
                            <h2 class="font-bold text-md text-[#5c5c5c]">Cover Letter</h2>
                        </div>
                        <div class="ml-5 w-20 h-20 rounded-lg bg-[#5c5c5c]">
                            {/* Plus Icon */}
                            <h2 class="font-bold text-md text-[#5c5c5c] text-white">Add More</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage