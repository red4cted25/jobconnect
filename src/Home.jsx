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
        <section className='w-full h-1/2 relative flex flex-col justify-center bg-gradient-to-t from-brand-primary font-Golos font-extrabold'>
          <div className='w-1/2 ml-16'>
            <h1 className="text-8xl leading-hero italic">FIND YOUR ARROW</h1>
            <h2 className="text-2xl">THIS IS GENERATION ORANGE</h2>
          </div>
        </section>
        {/* Page Links */}
        {/* All of these lead to the /jobs page */}
        {/* They all have different effects on the filter system in place to serve as quick links to specific searches */}
        <section className='flex flex-grow justify-around items-center text-center'>
          {/* Apply */}
          <Link to="/jobs">
            <div className="bg-brand-light-gray flex flex-col justify-center p-6 gap-4">
              <LuNotebookPen className='w-48 h-48'/>
              <h3 className="text-xl">Apply</h3>
            </div>
          </Link>
          {/* Alumni */}
          <Link to="/jobs">
            <div className="bg-brand-light-gray flex flex-col justify-center p-6 gap-4">
              <FaGraduationCap className='w-48 h-48'/>
              <h3 className="text-xl">Alumni</h3>
            </div>
          </Link>
          {/* Activities */}
          <Link to="/jobs">
            <div className="bg-brand-light-gray flex flex-col justify-center p-6 gap-4">
              <FaRegCalendarCheck className='w-48 h-48'/>
              <h3 className="text-xl">Activities</h3>
            </div>
          </Link>
          {/* Scholarships */}
          <Link to="/jobs">
            <div className="bg-brand-light-gray flex flex-col justify-center p-6 gap-4">
              <FaMoneyBills className='w-48 h-48'/>
              <h3 className="text-xl">Scholarships</h3>
            </div>
          </Link>
        </section>
      </main>
    </>
  )
}

export default HomePage