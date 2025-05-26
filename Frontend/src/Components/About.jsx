import React from 'react'

export const About = () => {
  return (
    <section id="about" className="w-full min-h-screen bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-0">
        <div className="flex flex-col lg:flex-row w-full min-h-screen">
          {/* Text content - full height */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
            <div className='mb-6'>
              <span className='text-amber-500 font-semibold'>ABOUT OUR SYSTEM</span>
              <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mt-2'>Personalized Book Discovery</h1>
            </div>
            
            <div className='space-y-5 text-gray-700'>
              <div className='flex items-start gap-4'>
                <div className='mt-1 flex-shrink-0 text-amber-500'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>
                  Our <span className='font-semibold text-amber-600'>intelligent recommendation engine</span> analyzes your preferences across multiple dimensions to suggest books you'll love.
                </p>
              </div>

              <div className='flex items-start gap-4'>
                <div className='mt-1 flex-shrink-0 text-amber-500'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>
                  We consider <span className='font-semibold'>genre, writing style, themes, emotional impact</span>, and more to go beyond basic categorization.
                </p>
              </div>

              <div className='flex items-start gap-4'>
                <div className='mt-1 flex-shrink-0 text-amber-500'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>
                  Our system learns from your feedback to continuously <span className='font-semibold'>improve recommendations</span> over time.
                </p>
              </div>
            </div>

            <div className='mt-8 grid grid-cols-2 md:grid-cols-3 gap-3'>
              {['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Biography'].map((genre) => (
                <span key={genre} className='bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1.5 rounded-full text-center'>
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Image - full height */}
          <div className="w-full lg:w-1/2 bg-amber-50 flex items-center justify-center p-8">
            <img 
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80" 
              alt="Person enjoying a book" 
              className="w-full h-full max-h-[80vh] object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}