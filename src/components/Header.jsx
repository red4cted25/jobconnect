// Using React Router Dom's Link component for faster navigation to other pages
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <div>
                <h1>Job<span>Connect</span></h1>
                <br />
                <h2>@West-<span>MEC</span></h2>
            </div>
            <nav>
            <div className='dropdown'>
                <button className="dropbtn">JobConnect</button>
                <div className="dropdown-content">
                    <Link to="#">About Us</Link>
                    <Link to="#">Contact</Link>
                    <Link to="#">FAQ</Link>
                </div>
            </div>
            <Link to="#">Companies</Link>
            <Link to="#">Jobs</Link>
            <div className='dropdown'>
                <button className="dropbtn">Community</button>
                <div className="dropdown-content">
                    <Link to="#">Current Students</Link>
                    <Link to="#">Alumni</Link>
                    <Link to="#">Scholarships</Link>
                    <Link to="#">Campus Activities</Link>
                </div>
            </div>
            <Link to="#">For Employers</Link>
            
            </nav>
        </header>
    )
}

export default Header