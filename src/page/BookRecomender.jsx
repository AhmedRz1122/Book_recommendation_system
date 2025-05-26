import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import { BookContext, bookQuery } from './bookQuery.js';

const BookRecommender = () => {
  // State management
  const [bookDescription, setBookDescription] = useState('');
  const [category, setCategory] = useState('All');
  const [tone, setTone] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  // const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState('');
  const booksPerPage = 12;
  const navigate = useNavigate();

  const { query } = useContext(bookQuery);
  const {setBooks} = useContext(BookContext);

  // Initialize bookDescription with context query
  useEffect(() => {
    if (query) {
      setBookDescription(query); // Set bookDescription to homepage query
    }
  }, [query]);

  // Handle form submission to fetch books from API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookDescription) {
      setError('Please enter a book description');
      return;
    }
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token'); // Get JWT token
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }
      // console.log(token);

      const response = await axios.post(
        '/api/recommend',
        {
          query: bookDescription,
          category: category,
          tone: tone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      // console.log(response.data);
      const recommendations = response.data.recommendations;
      // console.log(recommendations);
      if (!Array.isArray(recommendations)) {
        throw new Error('Invalid response format from API');
      }

      // Set books from API response
      setBooks(recommendations);
      setFilteredBooks(recommendations);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError(error.response?.data?.error || error.message || 'Failed to fetch recommendations');
      setBooks([]);
      setFilteredBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Create URL-friendly book ID
  const createBookId = (book) => {
    return encodeURIComponent(`${book.title}-${book.authors}`.toLowerCase());
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Semantic Book Recommender</h1>
          <p className="text-gray-600">Discover books that match your mood and interests</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center py-4 text-red-600">
            <p>{error}</p>
            {error.includes('log in') && (
              <button
                onClick={() => navigate('/Login')}
                className="underline text-blue-600 hover:text-blue-800"
              >
                Go to Login
              </button>
            )}
          </div>
        )}

        {/* Form section */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe the book you're looking for
            </label>
            <textarea
              value={bookDescription}
              onChange={(e) => setBookDescription(e.target.value)}
              placeholder="e.g. A psychological thriller with an unreliable narrator and shocking twist ending"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="All">All Categories</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Classic">Classic</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emotional Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="All">All Tones</option>
              <option value="Adventurous">Adventurous</option>
              <option value="Thought-provoking">Thought-provoking</option>
              <option value="Dark">Dark</option>
              <option value="Inspiring">Inspiring</option>
              <option value="Emotional">Emotional</option>
            </select>
          </div>

          <div className="lg:col-span-4 flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Finding Recommendations...
                </span>
              ) : (
                'Find Recommendations'
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => {
                setCategory('All');
                setTone('All');
                setBookDescription('');
                setFilteredBooks([]);
                setBooks([]);
                setCurrentPage(1);
                setError('');
              }}
              className="px-8 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
            >
              Reset
            </motion.button>
          </div>
        </form>

        {/* Results Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              {category === 'All' && tone === 'All' && !bookDescription ? 'All Books' : 'Recommended Books'}
            </h2>
            <div className="text-sm text-gray-500">
              Showing {currentBooks.length} of {filteredBooks.length} books (Page {currentPage} of {totalPages})
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {Array.from({ length: booksPerPage }).map((_, idx) => (
                <div key={idx} className="bg-gray-100 rounded-lg p-4 animate-pulse h-64" />
              ))}
            </div>
          ) : currentBooks.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {currentBooks.map((book) => (
                  <motion.div
                    key={createBookId(book)}
                    onClick={() => navigate(`/book/${createBookId(book)}`)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
                  >
                    <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={book.image=="cover-not-found.jpg"?book.image="src/assets/cover-not-found.jpg":book.image}
                        alt={`Cover of ${book.title}`}
                        // onError={handleImageError(book.image)}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-xs font-semibold text-blue-600 mb-1">{book.genre}</div>
                      <h3 className="font-bold text-gray-800 mb-1 line-clamp-2">{book.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{book.authors}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        {book.mood}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <nav className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
                    >
                      &lt;
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 rounded-md border ${
                            currentPage === pageNum ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {totalPages > 5 && <span className="px-1">...</span>}

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
                    >
                      &gt;
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No books match your criteria</h3>
              <p className="mt-1 text-gray-500">Try adjusting your description or filters</p>
            </div>
          )}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default BookRecommender;