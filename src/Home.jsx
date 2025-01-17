import Header from './components/Header';
// Using react-router-dom's Link component for faster navigation to other pages
import { Link } from 'react-router-dom'
import { LuNotebookPen } from "react-icons/lu";
import { FaGraduationCap, FaRegCalendarCheck, FaMoneyBills  } from "react-icons/fa6";


const HomePage = () => {
  return (
    <>
      <Header />
      <main className='w-screen h-[calc(100vh-5rem)] flex flex-col'>
        {/* Hero Section */}
        {/* The hero section is a video of Northeast Campus and a gradient overlay with a tagline */}
        <section className='w-full h-3/5 flex flex-col justify-center bg-gradient-to-tr from-brand-primary via-brand-dark-primary to-brand-primary font-Golos font-extrabold'>
          <div className='w-fit text-brand-dark-primary rounded-r-2xl bg-brand-dark-gray bg-opacity-50 pl-8 p-6'>
            <h1 className="text-5xl leading-hero italic drop-shadow-text">FIND YOUR <br />ARROW</h1>
            <h2 className="text-xl text-white drop-shadow-text-caption mt-4">THIS IS GENERATION <span className="text-brand-dark-primary">ORANGE</span></h2>
          </div>
        </section>
        {/* Page Links */}
        {/* All of these lead to the /jobs page */}
        {/* They all have different effects on the filter system in place to serve as quick links to specific searches */}
        <section className='flex flex-grow justify-around items-center text-center mx-6'>
          {/* Apply */}
          <Link to="/jobs">
            <div className="bg-brand-light-gray flex flex-col justify-center p-6 gap-4">
              <LuNotebookPen className='w-36 h-36'/>
              <h3 className="text-xl">Apply</h3>
            </div>
          </Link>
          {/* Alumni */}
          <Link to="/jobs">
            <div className="bg-brand-light-gray flex flex-col justify-center p-6 gap-4">
              <FaGraduationCap className='w-36 h-36'/>
              <h3 className="text-xl">Alumni</h3>
            </div>
          </Link>
          {/* Activities */}
          <Link to="/jobs">
            <div className="bg-brand-light-gray flex flex-col justify-center p-6 gap-4">
              <FaRegCalendarCheck className='w-36 h-36'/>
              <h3 className="text-xl">Activities</h3>
            </div>
          </Link>
          {/* Scholarships */}
          <Link to="/jobs">
            <div className="bg-brand-light-gray flex flex-col justify-center p-6 gap-4">
              <FaMoneyBills className='w-36 h-36'/>
              <h3 className="text-xl">Scholarships</h3>
            </div>
          </Link>
        </section>
      </main>
    </>
  )
}

export default HomePage