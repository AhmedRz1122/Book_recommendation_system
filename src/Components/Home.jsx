import React from 'react'
import booklogo from '../assets/Booklogo.jpg'
import './Home.css'
import Carousel from './Carousel'

const Home = () => {
  return (
    <div className='relative min-h-screen w-screen text-black m-0'>
      {/* Carousel as background */}
      <div className='absolute inset-0 z-0'>
        <Carousel />
      </div>
      
      {/* Content overlay */}
      <div className='relative z-10'>
        {/* Navigation */}
        <nav className='flex w-full h-14 bg-black bg-opacity-50 text-white items-center px-10 justify-between'>
          <div className='flex gap-x-4 items-center'>
            <img src={booklogo} alt="Main Logo of Book Recommendor" className='h-10 w-10 rounded-full' />
            <h1>Intelligent Book Recommendation System</h1>
          </div>
          <div className='flex items-center'>
            <ul className='flex gap-x-8'>
              <li className='hover:text-amber-200 cursor-pointer'>Home</li>
              <li className='hover:text-amber-200 cursor-pointer'>About</li>
              <li className='hover:text-amber-200 cursor-pointer'>Login</li>
              <li className='hover:text-amber-200 cursor-pointer'>Sign Up</li>
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <div className="flex justify-center items-center text-center min-h-[calc(100vh-3.5rem)]">
          <div className="p-6 text-white bg-[#00000067] bg-opacity-50 rounded-lg max-w-xl mx-4">
            <h1 className='text-4xl font-bold mb-6'>Discover Your Next Favourite Book</h1>
            <p className='mb-6 text-xl'>Tell us about the type of book you're looking for and the emotions you want to feel</p>
            <div className="flex flex-col items-center">
              <input
                type="text"
                placeholder='Book Description'
                className="p-3 rounded text-black w-full mb-4 placeholder:text-gray-500"
              />
              <button className='bg-amber-400 hover:bg-amber-500 text-shadow-white font-bold py-2 px-6 rounded transition duration-300'>
                Get Recommendations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home