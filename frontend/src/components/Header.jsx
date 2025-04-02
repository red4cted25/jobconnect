import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { MdArrowDropDown } from "react-icons/md";
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaCog, FaBriefcase, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
    const { user, logout } = useAuth();
    console.log(user);

    // State for mobile menu and dropdowns (including new user dropdown)
    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState({
        width: undefined,
        height: undefined
    });
    const [dropdownOpen, setDropdownOpen] = useState({
        community: false, 
        jobconnect: false,
        user: false,
    });

    // Update window dimensions
    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Reset dropdowns when menu closes or screen resizes
    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        }
        if (!menuOpen) {
            setDropdownOpen({
                community: false,
                jobconnect: false,
                user: false,
            });
        }
    }, [size.width, menuOpen]);

    // Toggle dropdown state for each menu
    const toggleDropdown = (menu) => {
        setDropdownOpen(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };

    const menuToggleHandler = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="bg-brand-secondary w-full h-20 px-6 md:px-12 transition-all ease-linear duration-300">
            <div className="text-white max-w-full h-full flex items-center justify-between relative z-50">
                {/* Logo */}
                <Link to='/' className='flex flex-col font-semibold items-end font-Quicksand'>
                    <h1 className='ml-4 text-2xl'>
                        Job<span className='bg-gradient-to-b from-brand-primary-light to-brand-primary inline-block text-transparent bg-clip-text'>Connect</span>
                    </h1>
                    <h2 className='-mt-1'>
                        @ West-<span className='bg-gradient-to-b from-brand-primary-light to-brand-primary inline-block text-transparent bg-clip-text'>MEC</span>
                    </h2>
                </Link>
                {/* Main Navigation */}
                <nav className={
                    `top-0 left-full w-full h-screen fixed 
                    flex flex-col justify-center items-center text-center 
                    bg-black opacity-90 backdrop-blur-sm 
                    translate-x-0 translate-y-0 transition-transform duration-300 ease-linear 
                    md:transform-none md:flex-row md:bg-transparent md:w-auto md:h-full md:static md:opacity-100
                    ${menuOpen ? ' translate-x-neg-full' : ''}`
                }>
                    {/* Navigation Links */}
                    <ul className='list-none p-0 flex flex-col mb-spacing-lg md:flex-row md:items-center md:mb-0 md:mr-6'>
                        {/* JobConnect Dropdown */}
                        <li className='relative mb-spacing-lg md:mb-0 md:mr-spacing-md group'>
                            <button 
                                onClick={() => toggleDropdown('jobconnect')} 
                                className="ml-6 border-none outline-none rounded-nav-button text-white py-3 px-5 bg-transparent font-inherit hover:underline underline-offset-8 flex items-center md:ml-0"
                            >
                                <span>JobConnect</span> <MdArrowDropDown className='size-6 md:hidden' />
                            </button>
                            <div className={`${(size.width <= 768 && dropdownOpen.jobconnect) ? 'block bg-[#2B2B2B]/20' : 'hidden md:group-hover:block'} relative min-w-auto md:shadow-dropdown z-10 md:absolute md:top-full md:left-2 md:bg-brand-secondary`}>
                                {['About', 'Contact Us', 'FAQ'].map((item, index) => (
                                    <Link 
                                      key={index} 
                                      to="/jobs" 
                                      className='hover:underline underline-offset-8 block text-white py-2 px-4 text-left whitespace-nowrap'
                                    >
                                      {item}
                                    </Link>
                                ))}
                            </div>
                        </li>
                        <li className='mb-spacing-lg md:mb-0 md:mr-spacing-md'>
                            <Link to='/jobs' className='text-inherit py-3 px-5 rounded-nav-button transition-all duration-300 ease-linear hover:underline underline-offset-8'>Jobs</Link>
                        </li>
                        <li className='mb-spacing-lg md:mb-0 md:mr-spacing-md'>
                            <Link to='/companies' className='text-inherit py-3 px-5 rounded-nav-button transition-all duration-300 ease-linear hover:underline underline-offset-8'>Companies</Link>
                        </li>
                        {/* Community Dropdown */}
                        <li className='relative mb-spacing-lg md:mb-0 md:mr-spacing-md group'>
                            <button 
                                onClick={() => toggleDropdown('community')} 
                                className="ml-6 border-none outline-none rounded-nav-button text-white py-3 px-5 bg-transparent font-inherit hover:underline underline-offset-8 flex items-center md:ml-0"
                            >
                                <span>Community</span> <MdArrowDropDown className='size-6 md:hidden' />
                            </button>
                            <div className={`${(size.width <= 768 && dropdownOpen.community) ? 'block bg-[#2B2B2B]/20' : 'hidden md:group-hover:block'} relative min-w-auto md:shadow-dropdown z-10 md:absolute md:top-full md:left-0 md:bg-brand-secondary`}>
                                {['Current Students', 'Alumni', 'Scholarships', 'Campus Activities'].map((item, index) => (
                                    <Link 
                                      key={index} 
                                      to="/jobs" 
                                      className='hover:underline underline-offset-8 block text-white py-2 px-4 text-left whitespace-nowrap'
                                    >
                                      {item}
                                    </Link>
                                ))}
                            </div>
                        </li>
                        <li>
                            <Link to='/employers' className='text-inherit py-3 px-5 rounded-nav-button transition-all duration-300 ease-linear hover:underline underline-offset-8'>For Employers</Link>
                        </li>
                        {/* User Dropdown (using same dropdown style as others) */}
                        {user && (
                          <li className='relative mb-spacing-lg md:mb-0 md:mr-spacing-md group'>
                            <button 
                                onClick={() => toggleDropdown('user')}
                                className="ml-6 border-none outline-none rounded-nav-button text-white py-3 px-5 bg-transparent font-inherit hover:underline underline-offset-8 flex items-center whitespace-nowrap md:ml-0"
                            >
                                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                    {user.profileImage ? (
                                        <img 
                                          src={user.profileImage} 
                                          alt={user.username} 
                                          className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <FaUser className="text-gray-600" />
                                    )}
                                </div>
                                <span className="text-sm ml-2">{user.username}</span>
                                <MdArrowDropDown className="ml-1" />
                            </button>
                            <div className={`${(size.width <= 768 && dropdownOpen.user) ? 'block bg-[#2B2B2B]/20' : 'hidden md:group-hover:block'} relative min-w-auto md:shadow-dropdown z-10 md:absolute md:top-full md:left-0 md:bg-brand-secondary`}>
                                <Link 
                                    to="/profile" 
                                    className="hover:underline underline-offset-8 block text-white py-2 px-4 text-left whitespace-nowrap"
                                >
                                    <FaUser className="mr-2" /> Profile
                                </Link>
                                <Link 
                                    to="/settings" 
                                    className="hover:underline underline-offset-8 block text-white py-2 px-4 text-left whitespace-nowrap"
                                >
                                    <FaCog className="mr-2" /> Settings
                                </Link>
                                <Link 
                                    to="/my-jobs" 
                                    className="hover:underline underline-offset-8 block text-white py-2 px-4 text-left whitespace-nowrap"
                                >
                                    <FaBriefcase className="mr-2" /> My Jobs
                                </Link>
                                <button 
                                    onClick={logout} 
                                    className="w-full text-left px-4 py-2 text-white hover:underline underline-offset-8 flex items-center"
                                >
                                    <FaSignOutAlt className="mr-2" /> Sign Out
                                </button>
                            </div>
                          </li>
                        )}
                    </ul>
                    {/* If not logged in, show Sign In button */}
                    {!user && (
                        <Link to="/login" className='cursor-pointer outline-none py-3 px-5 rounded-nav-button text-base bg-brand-primary text-white transition-all ease-linear duration-300 hover:bg-brand-dark-primary active:bg-gradient-to-tr active:from-brand-primary-light active:via-brand-primary active:to-brand-primary-light'>Sign In</Link>
                    )}
                </nav>
                <div className="cursor-pointer flex items-center text-3xl transition-all ease-linear duration-300 relative hover:text-brand-primary md:hidden">
                    {!menuOpen ? <RxHamburgerMenu onClick={menuToggleHandler}/> : <RxCross1 onClick={menuToggleHandler} />}
                </div>
            </div>
        </header>
    );
};

export default Header;
