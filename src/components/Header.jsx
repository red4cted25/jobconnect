import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header className='flex h-20 bg-brand-secondary text-white items-center'>
            {/* Logo */}
            <div className='flex flex-col font-semibold items-end'>
                <h1 className='ml-4 text-2xl'>Job<span className='text-brand-primary'>Connect</span></h1>
                <h2 className='-mt-1'>@ West-<span className='text-brand-primary'>MEC</span></h2>
            </div>
            {/* Navbar Links + Sign In */}
            <nav className='flex ml-auto mr-4 items-center'>
                <div className='relative float-left group'>
                    <button className="hover:underline underline-offset-8 border-none outline-none text-white py-3.5 px-4 bg-transparent font-inherit m-0">JobConnect</button>
                    <div className="hidden group-hover:block absolute bg-brand-secondary w-full shadow-dropdown z-10">
                        <Link to="#" className='hover:underline underline-offset-8 block text-white py-2 px-4 text-left'>About Us</Link>
                        <Link to="#" className='hover:underline underline-offset-8 block text-white py-2 px-4 text-left'>Contact</Link>
                        <Link to="#" className='hover:underline underline-offset-8 block text-white py-2 px-4 text-left'>FAQ</Link>
                    </div>
                </div>
                <Link to="#" className='hover:underline underline-offset-8 text-center px-4'>Companies</Link>
                <Link to="#" className='hover:underline underline-offset-8 text-center px-4'>Jobs</Link>
                <div className='relative float-left group'>
                    <button className="hover:underline underline-offset-8 border-none outline-none text-white py-3.5 px-4 bg-transparent font-inherit m-0">Community</button>
                    <div className="hidden group-hover:block absolute bg-brand-secondary w-full shadow-dropdown z-10">
                        <Link to="#" className='hover:underline underline-offset-8 block text-white py-2 px-4 text-left'>Current Students</Link>
                        <Link to="#" className='hover:underline underline-offset-8 block text-white py-2 px-4 text-left'>Alumni</Link>
                        <Link to="#" className='hover:underline underline-offset-8 block text-white py-2 px-4 text-left'>Scholarships</Link>
                        <Link to="#" className='hover:underline underline-offset-8 block text-white py-2 px-4 text-left'>Campus Activities</Link>
                    </div>
                </div>
                <Link to="#" className='hover:underline underline-offset-8 text-center px-4'>For Employers</Link>
                {/* Sign In / Log In */}
                {/* Switches to show username and profile picture when user is signed in */}
                <div>
                    <Link to="/login" className='bg-brand-primary mr-4 px-4 py-2 text-white rounded-2xl hover:bg-brand-secondary'>Sign In</Link>
                </div>
            </nav>
        </header>
    )
}

export default Header