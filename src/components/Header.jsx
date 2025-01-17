import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
    const [toggleOpen, setToggleOpen] = useState(false);

    const handleToggle = () => setToggleOpen(!toggleOpen);


    return (
        // <header className='flex h-20 bg-brand-secondary text-white items-center'>
        //     {/* Logo */}
        //     <Link to='/' className='flex flex-col font-semibold items-end'>
        //         <h1 className='ml-4 text-2xl'>Job<span className='text-brand-primary'>Connect</span></h1>
        //         <h2 className='-mt-1'>@ West-<span className='text-brand-primary'>MEC</span></h2>
        //     </Link>
        //     {/* Navbar Links + Sign In */}
        //     <nav className='flex ml-auto mr-4 items-center'>
        //         <div className='relative float-left group'>
        //             <button className="hover:underline underline-offset-8 border-none outline-none text-white py-3.5 px-4 bg-transparent font-inherit m-0">JobConnect</button>
        //             <div className="hidden group-hover:block absolute bg-brand-secondary w-full shadow-dropdown z-10">
        //                 <Link to="/jobconnect/about-us" className='hover:underline underline-offset-8 block text-white py-2 px-4 text-left'>About Us</Link>
        //                 <Link to="/jobconnect/contact" className='hover:underline underline-offset-8 block text-white py-2 px-4 text-left'>Contact</Link>
        //                 <Link to="/jobconnect/faq" className='hover:underline underline-offset-8 block text-white py-2 px-4 text-left'>FAQ</Link>
        //             </div>
        //         </div>
        //         <Link to="/companies" className='hover:underline underline-offset-8 text-center px-4'>Companies</Link>
        //         <Link to="/jobs" className='hover:underline underline-offset-8 text-center px-4'>Jobs</Link>
        //         <div className='relative float-left group'>
        //             <button className="hover:underline underline-offset-8 border-none outline-none text-white py-3.5 px-4 bg-transparent font-inherit m-0">Community</button>
        //             <div className="hidden group-hover:block absolute bg-brand-secondary min-w-auto shadow-dropdown z-10">
        //                 <Link to="#" className='hover:underline underline-offset-8 block text-white py-2 px-4 text-left whitespace-nowrap'>Current Students</Link>
        //                 <Link to="#" className='hover:underline underline-offset-8 block text-white py-2 px-4 text-left whitespace-nowrap'>Alumni</Link>
        //                 <Link to="#" className='hover:underline underline-offset-8 block text-white py-2 px-4 text-left whitespace-nowrap'>Scholarships</Link>
        //                 <Link to="#" className='hover:underline underline-offset-8 block text-white py-2 px-4 text-left whitespace-nowrap'>Campus Activities</Link>
        //             </div>
        //         </div>
        //         <Link to="#" className='hover:underline underline-offset-8 text-center px-4'>For Employers</Link>
        //         {/* Sign In / Log In */}
        //         {/* Switches to show username and profile picture when user is signed in */}
        //         <div>
        //             <Link to="/login" className='bg-brand-primary mr-4 px-4 py-2 text-white rounded-2xl hover:bg-brand-dark-primary'>Sign In</Link>
        //         </div>
        //     </nav>
        // </header>
        <header className="bg-brand-secondary w-full h-20 px-6 md:px-12 transition-all ease-linear duration-300">
            <div className="overflow-hidden text-white mx-auto max-w-7xl h-full flex items-center justify-between relative z-50">
                {/* Logo */}
                <Link to='/' className='flex flex-col font-semibold items-end'>
                    <h1 className='ml-4 text-2xl'>Job<span className='text-brand-primary'>Connect</span></h1>
                    <h2 className='-mt-1'>@ West-<span className='text-brand-primary'>MEC</span></h2>
                </Link>
                <nav className="top-0 right-full w-full h-screen fixed flex flex-col justify-center items-center text-center bg-black opacity-90 backdrop-blur-sm translate-x-0 translate-y-0 transition-transform duration-300 ease-linear md:transform-none md:flex-row md:bg-transparent md:w-auto md:h-full md:static">
                    <ul className='list-none p-0 flex flex-col mb-spacing-lg md:flex-row md:items-center md:mb-0 md:mr-[calc(0.5rem-2rem)]'>
                        <li className='mb-spacing-lg md:mb-0 md:mr-spacing-md'>
                            <Link to='/' className='no-underline text-inherit py-3 px-5 rounded-nav-button transition-all duration-300 ease-linear hover:underline underline-offset-8'>PageOne</Link>
                        </li>
                        <li className='mb-spacing-lg md:mb-0 md:mr-spacing-md'>
                            <Link to='/' className='no-underline text-inherit py-3 px-5 rounded-nav-button transition-all duration-300 ease-linear hover:underline underline-offset-8'>PageTwo</Link>
                        </li>
                        <li>
                            <Link to='/' className='no-underline text-inherit py-3 px-5 rounded-nav-button transition-all duration-300 ease-linear hover:underline underline-offset-8'>PageThree</Link>
                        </li>
                    </ul>
                    <button className='cursor-pointer outline-none py-3 px-5 rounded-nav-button text-base bg-brand-primary text-white transition-all ease-linear duration-300 hover:bg-brand-dark-primary active:bg-gradient-to-tr active:from-brand-dark-primary active:to-brand-primary'>Sign In</button>
                </nav>
                div.
            </div>
        </header>
    )
}

export default Header