import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState({
        width: undefined,
        height: undefined
    })

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        // Adjust menu width based on screen size
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false)
        }
    }, [size.width, menuOpen])
    

    const menuToggleHandler = () => {
        setMenuOpen(!menuOpen);
    }

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
        //         <div className='relative float-left group'>
        //             <button className="hover:underline underline-offset-8 border-none outline-none text-white py-3.5 px-4 bg-transparent font-inherit m-0">Community</button>
        //             <div className="hidden group-hover:block absolute bg-brand-secondary min-w-auto shadow-dropdown z-10">
        //                 <Link to="#" className='hover:underline underline-offset-8 block text-white py-2 px-4 text-left whitespace-nowrap'>Current Students</Link>
        //                 <Link to="#" className='hover:underline underline-offset-8 block text-white py-2 px-4 text-left whitespace-nowrap'>Alumni</Link>
        //                 <Link to="#" className='hover:underline underline-offset-8 block text-white py-2 px-4 text-left whitespace-nowrap'>Scholarships</Link>
        //                 <Link to="#" className='hover:underline underline-offset-8 block text-white py-2 px-4 text-left whitespace-nowrap'>Campus Activities</Link>
        //             </div>
        //         </div>
        //         {/* Sign In / Log In */}
        //         {/* Switches to show username and profile picture when user is signed in */}
        //         <div>
        //             <Link to="/login" className='bg-brand-primary mr-4 px-4 py-2 text-white rounded-2xl hover:bg-brand-dark-primary'>Sign In</Link>
        //         </div>
        //     </nav>
        // </header>
        <header className="bg-brand-secondary w-full h-20 px-6 md:px-12 transition-all ease-linear duration-300">
            <div className="overflow-hidden text-white max-w-full h-full flex items-center justify-between relative z-50">
                {/* Logo */}
                <Link to='/' className='flex flex-col font-semibold items-end'>
                    <h1 className='ml-4 text-2xl'>Job<span className='text-brand-primary'>Connect</span></h1>
                    <h2 className='-mt-1'>@ West-<span className='text-brand-primary'>MEC</span></h2>
                </Link>
                <nav className={`top-0 right-full w-full h-screen fixed flex flex-col justify-center items-center text-center bg-black opacity-90 backdrop-blur-sm translate-x-0 translate-y-0 transition-transform duration-300 ease-linear md:transform-none md:flex-row md:bg-transparent md:w-auto md:h-full md:static ${menuOpen ? 'translate-x-full' : ''}`}>
                    <ul className='list-none p-0 flex flex-col mb-spacing-lg md:flex-row md:items-center md:mb-0 md:mr-6'>
                        <li className='mb-spacing-lg md:mb-0 md:mr-spacing-md'>
                            <Link to='/' className='no-underline text-inherit py-3 px-5 rounded-nav-button transition-all duration-300 ease-linear hover:underline underline-offset-8'>PageOne</Link>
                        </li>
                        <li className='mb-spacing-lg md:mb-0 md:mr-spacing-md'>
                            <Link to='/' className='no-underline text-inherit py-3 px-5 rounded-nav-button transition-all duration-300 ease-linear hover:underline underline-offset-8'>PageOne</Link>
                        </li>
                        <li className='mb-spacing-lg md:mb-0 md:mr-spacing-md'>
                            <Link to='/jobs' className='no-underline text-inherit py-3 px-5 rounded-nav-button transition-all duration-300 ease-linear hover:underline underline-offset-8'>Jobs</Link>
                        </li>
                        <li className='mb-spacing-lg md:mb-0 md:mr-spacing-md'>
                            <Link to='/companies' className='no-underline text-inherit py-3 px-5 rounded-nav-button transition-all duration-300 ease-linear hover:underline underline-offset-8'>Companies</Link>
                        </li>
                        <li>
                            <Link to='/employers' className='no-underline text-inherit py-3 px-5 rounded-nav-button transition-all duration-300 ease-linear hover:underline underline-offset-8'>For Employers</Link>
                        </li>
                    </ul>
                    <button className='cursor-pointer outline-none py-3 px-5 rounded-nav-button text-base bg-brand-primary text-white transition-all ease-linear duration-300 hover:bg-brand-dark-primary active:bg-gradient-to-tr active:from-brand-primary active:via-brand-dark-primary active:to-brand-primary'>Sign In</button>
                </nav>
                <div className="cursor-pointer flex items-center text-3xl transition-all ease-linear duration-300 relative hover:text-brand-primary md:hidden">
                    {!menuOpen ? <RxHamburgerMenu onClick={menuToggleHandler}/> : <RxCross1 onClick={menuToggleHandler} />}
                </div>
            </div>
        </header>
    )
}

export default Header