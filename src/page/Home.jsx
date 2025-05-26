import React, { useState, useContext } from 'react';
import booklogo from '../assets/Booklogo.jpg';
import './Home.css';
import Carousel from '../Components/Carousel';
import { About } from '../Components/About';
import { Link, useNavigate } from 'react-router-dom';
import {bookQuery} from './bookQuery.js';

const Home = () => {
  const [inputQuery, setInputQuery] = useState(''); // Local state for input
  const { setQuery } = useContext(bookQuery); // Access setQuery from context
  const navigate = useNavigate();

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(inputQuery); // Update context query
    navigate('/BookRecommender'); // Navigate to BookRecommender
  };

  return (
    <div className='w-full text-gray-900 overflow-x-hidden'>
      {/* Carousel background section */}
      <div className='relative w-full h-screen'>
        {/* Carousel as background */}
        <div className='absolute inset-0 z-0'>
          <Carousel />
        </div>

        {/* Content overlay */}
        <div className='relative z-10 h-full flex flex-col'>
          {/* Navigation */}
          <nav className='flex w-full h-16 bg-black/90 text-white items-center px-6 md:px-10 justify-between'>
            <div className='flex gap-x-3 md:gap-x-4 items-center'>
              <Link to="/" className='flex gap-x-3 md:gap-x-4 items-center'>
                <img 
                  src={booklogo} 
                  alt="Main logo of Book Recommender" 
                  className='h-9 w-9 md:h-10 md:w-10 rounded-full border border-amber-300'
                />
                <h1 className='text-sm md:text-base lg:text-lg font-medium'>Intelligent Book Recommendation System</h1>
              </Link>
            </div>
            <div className='flex items-center'>
              <ul className='flex gap-x-4 md:gap-x-6 lg:gap-x-8 text-sm md:text-base'>
                <li className='hover:text-amber-300 transition-colors duration-200'>
                  <Link to="/">Home</Link>
                </li>
                <li className='hover:text-amber-300 transition-colors duration-200'>
                  <button onClick={scrollToAbout}>About</button>
                </li>
                <li className='hover:text-amber-300 transition-colors duration-200'>
                  <Link to="/Login">Login</Link>
                </li>
                <li className='hover:text-amber-300 transition-colors duration-200'>
                  <Link to="/Register">Sign Up</Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main hero content */}
          <section id="home" className="flex-1 flex justify-center items-center text-center">
            <div className="p-6 md:p-8 text-white bg-black/60 rounded-lg max-w-xl mx-4 backdrop-blur-[0px] border border-white/10">
              <h1 className='text-3xl md:text-3xl font-bold mb-4 md:mb-6'>Discover Your Next Favorite Book</h1>
              <p className='mb-6 text-lg md:text-lg'>Tell us about the type of book you're looking for and the emotions you want to feel.</p>
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input
                  type="text"
                  placeholder='Book description'
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  className="p-3 rounded h-auto text-gray-800 w-full mb-4 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  to="/BookRecommender" 
                  className='bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-8 rounded transition-all duration-300 shadow-md hover:shadow-amber-500/30'
                >
                  Get Recommendations
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    
      <div id="about">
        <About />
      </div>
    </div>
  );
};

export default Home;