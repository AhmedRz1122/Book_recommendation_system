import React from 'react'
import booklogo from '../assets/Booklogo.jpg'
import './Home.css'

const Home = () => {
  return (
    <div className='min-h-screen w-screen bg-gradient-to-r from-blue-600 to-purple-600 text-white m-0'>
      <nav className='bg-amber-200 flex w-full h-14 text-black items-center px-2.5 justify-between'>
        <div className='flex gap-x-4 items-center '>
          <img src={booklogo} alt="Main Logo of Book Recommendor" className='h-12 w-12 rounded-full' />
          <h1>Intelligent Book Recommendation System</h1>
        </div>
        <div className='flex items-center'>
          <ul className='flex gap-x-4'>
            <li>Home</li>
            <li>About</li>
            <li>Login</li>
            <li>Sign Up</li>
          </ul>
        </div>
      </nav>

      <div className="flex justify-center items-center text-center">
        <div className="p-6 text-white">
          <h1 className='text-2xl font-bold mb-4'>Discover Your Next Favourite Book</h1>
          <p className='mb-4'>Tell us about the type of book you're looking for and the emotions you want to feel</p>
          <div className="flex flex-col items-center">  {/* Updated container */}
            <input
              type="text"
              placeholder='Book Description'
              className="p-2 rounded text-black border-2 border-solid border-amber-50 w-full mb-3 placeholder:text-white"
            />
            <button className='bg-amber-200 text-black p-2 rounded hover:bg-amber-300'>
              Get Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home