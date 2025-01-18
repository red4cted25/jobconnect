import Header from './components/Header';
// Using react-router-dom's Link component for faster navigation to other pages
import { Link } from 'react-router-dom'
import { LuNotebookPen } from "react-icons/lu";
import { FaGraduationCap, FaRegCalendarCheck, FaMoneyBills  } from "react-icons/fa6";


const HomePage = () => {
  return (
    <>
      <Header />
      <main className='w-screen h-[calc(100vh-9rem)] flex flex-col'>
        {/* Hero Section */}
        {/* The hero section is a video of Northeast Campus and a gradient overlay with a tagline */}
        <section className='w-full h-2/5 md:h-3/5 flex flex-col justify-center bg-gradient-to-tr from-brand-primary via-brand-dark-primary to-brand-primary font-Golos font-extrabold'>
          <div className='w-fit text-brand-dark-primary rounded-r-2xl bg-brand-dark-gray/50 pl-8 p-6'>
            <h1 className="text-5xl leading-hero italic drop-shadow-text md:text-7xl">FIND YOUR <br />ARROW</h1>
            <h2 className="text-xl text-white drop-shadow-text-caption mt-4 md:text-2xl">THIS IS GENERATION <span className="text-brand-dark-primary">ORANGE</span></h2>
          </div>
        </section>
        {/* Page Links */}
        {/* All of these lead to the /jobs page */}
        {/* They all have different effects on the filter system in place to serve as quick links to specific searches */}
        <section className='flex grow-[0.25] justify-around items-center text-center mt-18 mx-6 flex-wrap'>
          {/* Apply */}
          <Link to="/jobs">
            <div className="bg-brand-light-gray flex flex-col justify-center p-6 gap-4 size-40 md:size-48">
              <LuNotebookPen className='size-3/4 mx-auto'/>
              <h3 className="text-xl md:text-2xl font-bold">Apply</h3>
            </div>
          </Link>
          {/* Alumni */}
          <Link to="/jobs">
            <div className="bg-brand-light-gray flex flex-col justify-center p-6 gap-4 size-40 md:size-48">
              <FaGraduationCap className='size-3/4 mx-auto'/>
              <h3 className="text-xl md:text-2xl font-bold">Alumni</h3>
            </div>
          </Link>
          {/* Activities */}
          <Link to="/jobs">
            <div className="bg-brand-light-gray flex flex-col justify-center p-6 gap-4 size-40 md:size-48">
              <FaRegCalendarCheck className='size-3/4 mx-auto'/>
              <h3 className="text-xl md:text-2xl font-bold">Activities</h3>
            </div>
          </Link>
          {/* Scholarships */}
          <Link to="/jobs">
            <div className="bg-brand-light-gray flex flex-col justify-center p-6 gap-4 size-40 md:size-48">
              <FaMoneyBills className='size-3/4 mx-auto'/>
              <h3 className="text-xl md:text-2xl font-bold">Scholarships</h3>
            </div>
          </Link>
        </section>
      </main>
      <footer className="w-full h-16 bg-brand-secondary relative md:hidden"></footer>
    </>
  )
}

export default HomePage