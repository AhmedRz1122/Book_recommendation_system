import React, { useContext, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookContext } from '../page/bookQuery.js';

const BookDetail = () => {
  const { bookId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const bookRef = useRef(null);

  const {books} = useContext(BookContext);
  // console.log(books);

//  const sampleBooks = [
//   {
//     title: "The Hobbit",
//     author: "J.R.R. Tolkien",
//     genre: "Fantasy",
//     mood: "Adventurous",
//     rating: 4.28,
//     coverImage: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
//     description: "Bilbo Baggins, a quiet and unassuming hobbit, is swept into an epic quest to help a group of dwarves reclaim their homeland from the fearsome dragon Smaug. Along the way, he faces trolls, goblins, and a mysterious creature called Gollum. With courage he never knew he had, Bilbo transforms from a reluctant traveler to a true hero."
//   },
//   {
//     title: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     genre: "Classic",
//     mood: "Thought-provoking",
//     rating: 4.27,
//     coverImage: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
//     description: "Set in the racially segregated American South, this novel follows young Scout Finch as her father, Atticus, defends a black man falsely accused of rape. Through Scout’s eyes, readers experience the harsh realities of prejudice and moral courage. The story is both a coming-of-age tale and a poignant critique of injustice."
//   },
//   {
//     title: "1984",
//     author: "George Orwell",
//     genre: "Dystopian",
//     mood: "Bleak",
//     rating: 4.17,
//     coverImage: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
//     description: "In a grim future where the government controls every aspect of life, Winston Smith dares to question authority and seek truth. Under the watchful eye of Big Brother, he begins a dangerous rebellion. Orwell’s haunting vision of a surveillance state warns of the dangers of unchecked power and lost freedoms."
//   },
//   {
//     title: "Pride and Prejudice",
//     author: "Jane Austen",
//     genre: "Romance",
//     mood: "Witty",
//     rating: 4.25,
//     coverImage: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
//     description: "Elizabeth Bennet navigates the complexities of social class, family expectations, and love in 19th-century England. Her evolving relationship with the proud Mr. Darcy leads to sharp wit and emotional growth. Austen crafts a timeless story of misunderstandings, personal pride, and the transformative power of love."
//   },
//   {
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     genre: "Classic",
//     mood: "Melancholic",
//     rating: 3.91,
//     coverImage: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
//     description: "Jay Gatsby, a mysterious millionaire, throws lavish parties in hopes of winning back his lost love, Daisy Buchanan. Narrated by Nick Carraway, the novel explores the illusion of the American Dream and the emptiness beneath glittering wealth. Set in the Roaring Twenties, it's a tale of love, longing, and despair."
//   },
//   {
//     title: "Moby-Dick",
//     author: "Herman Melville",
//     genre: "Adventure",
//     mood: "Epic",
//     rating: 3.49,
//     coverImage: "https://covers.openlibrary.org/b/isbn/9780142437247-L.jpg",
//     description: "Ishmael joins the whaling ship Pequod, led by the obsessed Captain Ahab, who seeks revenge on the great white whale, Moby Dick. The voyage becomes a symbolic exploration of fate, madness, and man’s struggle against nature. Melville’s masterpiece delves deep into the human psyche and existential questions."
//   },
//   {
//     title: "Brave New World",
//     author: "Aldous Huxley",
//     genre: "Science Fiction",
//     mood: "Satirical",
//     rating: 3.99,
//     coverImage: "https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg",
//     description: "In a world engineered for conformity and pleasure, individuality is suppressed by conditioning and drugs. Bernard Marx begins to question this artificial harmony when he meets John, a 'savage' raised outside the system. Huxley’s dystopia critiques consumerism, loss of identity, and the cost of societal stability."
//   },
//   {
//     title: "The Catcher in the Rye",
//     author: "J.D. Salinger",
//     genre: "Fiction",
//     mood: "Reflective",
//     rating: 3.80,
//     coverImage: "https://covers.openlibrary.org/b/isbn/9780316769488-L.jpg",
//     description: "Holden Caulfield recounts his days in New York after being expelled from prep school. Disillusioned with the 'phoniness' of the adult world, he wanders the city in search of meaning and authenticity. Salinger captures teenage angst and the struggle to find one’s place in a confusing world."
//   },
//   {
//     title: "The Alchemist",
//     author: "Paulo Coelho",
//     genre: "Adventure",
//     mood: "Inspirational",
//     rating: 3.86,
//     coverImage: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
//     description: "Santiago, a young shepherd, dreams of a treasure in the Egyptian pyramids and sets off on a journey of self-discovery. Along the way, he meets mentors and faces trials that reveal deeper truths. Coelho’s novel is a philosophical tale about destiny, following one’s heart, and the pursuit of purpose."
//   },
//   {
//     title: "Jane Eyre",
//     author: "Charlotte Brontë",
//     genre: "Gothic",
//     mood: "Empowering",
//     rating: 4.12,
//     coverImage: "https://covers.openlibrary.org/b/isbn/9780142437209-L.jpg",
//     description: "Orphaned and mistreated, Jane Eyre grows into a strong and principled woman. As a governess at Thornfield Hall, she falls in love with the mysterious Mr. Rochester. Brontë weaves themes of morality, independence, and resilience into this gothic romance, making it a powerful story of personal triumph."
//   }
// ];

  // Find book by ID
  const book = books.find(b => 
    `${b.title}-${b.authors}`.toLowerCase() === decodeURIComponent(bookId).toLowerCase()
  );

  // Get click position for morph animation
  const clickPosition = location.state?.clickPosition || { 
    x: window.innerWidth/2, 
    y: window.innerHeight/2 
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
    visible: { opacity: 1, backdropFilter: 'blur(4px)' }
  };

  const cardVariants = {
    hidden: { 
      scale: 0.8,
      x: clickPosition.x - window.innerWidth/2,
      y: clickPosition.y - window.innerHeight/2,
      opacity: 0,
      borderRadius: "24px"
    },
    visible: {
      scale: 1,
      x: 0,
      y: 0,
      opacity: 1,
      borderRadius: "12px",
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 300,
        mass: 0.8
      }
    },
    exit: {
      scale: 0.8,
      x: clickPosition.x - window.innerWidth/2,
      y: clickPosition.y - window.innerHeight/2,
      opacity: 0,
      borderRadius: "24px",
      transition: { duration: 0.3 }
    }
  };

  if (!book) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md mx-4">
        <div className="text-6xl mb-4">📚</div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Book Not Found</h2>
        <p className="text-gray-600 mb-6">The book you're looking for doesn't exist in our collection.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Back to Recommendations
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence mode='wait'>
      {/* Backdrop with blur effect */}
      <motion.div
        key="backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="fixed inset-0 bg-black/30 z-40"
        onClick={() => navigate(-1)}
      />

      {/* Book Card */}
      <motion.div
        key="book-card"
        ref={bookRef}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 m-auto z-50 bg-white shadow-2xl overflow-hidden"
        style={{
          maxWidth: 'min(90vw, 900px)',
          maxHeight: '90vh',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 z-50 p-2 bg-white/90 rounded-full shadow-md hover:bg-gray-100 transition-all"
          aria-label="Close book details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        {/* Book Content */}
        <div className="flex flex-col md:flex-row h-full">
          {/* Cover Image Section */}
          <div className="md:w-2/5 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative w-full h-full max-h-[500px] flex items-center justify-center"
            >
              <img
                src={book.image}
                alt={book.title}
                className="h-full max-h-[400px] w-auto object-contain shadow-xl rounded-sm"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x450?text=No+Cover";
                  e.target.className = "h-full max-h-[400px] w-auto object-contain bg-gray-200 p-4";
                }}
              />
              {/* <div className="absolute -bottom-4 -right-4 bg-amber-500 text-white font-bold px-3 py-1 rounded-lg shadow-md">
                {book.rating.toFixed(1)} ★
              </div> */}
            </motion.div>
          </div>

          {/* Details Section */}
          <div className="md:w-3/5 p-6 md:p-8 overflow-y-auto">
            <div className="space-y-6">
              {/* Title and Author */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{book.title}</h1>
                <h2 className="text-xl md:text-2xl text-gray-600 mt-2">by {book.authors}</h2>
              </motion.div>

              {/* Metadata Chips */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap gap-3"
              >
                <span className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full font-medium">
                  {book.genre}
                </span>
                <span className="px-4 py-1.5 bg-purple-100 text-purple-800 rounded-full font-medium">
                  {book.mood}
                </span>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="prose max-w-none"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">About This Book</h3>
                <p className="text-gray-700 leading-relaxed">{book.caption}</p>
              </motion.div>

              {/* Similar Books */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="pt-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Readers Also Enjoyed</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {books
                    .filter(b => b.title !== book.title)
                    .slice(0, 3)
                    .map(book => (
                      <motion.div
                        key={book.title}
                        whileHover={{ y: -5 }}
                        className="cursor-pointer group"
                        onClick={() => navigate(`/book/${encodeURIComponent(`${book.title}-${book.authors}`)}`)}
                      >
                        <div className="aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                          <img 
                            src={book.image} 
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mt-3">
                          <p className="font-medium text-gray-900 truncate">{book.title}</p>
                          <p className="text-sm text-gray-600">{book.author}</p>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookDetail;