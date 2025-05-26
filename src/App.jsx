import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './page/Home';
import BookDetail from './Components/BookDetail';
import Loginpage from './page/Loginpage'
import Registerpage from './page/Registerpage';
import BookRecommender from './page/BookRecomender';
import { About } from './Components/About';
import { bookQuery, BookContext } from './page/bookQuery.js';
import { useState, useMemo } from 'react';

function App() {
  const [query, setQuery] = useState(''); // State for the query
  const queryValue = useMemo(() => ({ query, setQuery }), [query]);

  const [books, setBooks] = useState([]); // State for books
  const bookValue = useMemo(() => ({ books, setBooks }), [books]);

  return (
    <bookQuery.Provider value={queryValue}>
      <BookContext.Provider value={bookValue}>
        <Router>
          <Routes>
            {/* Redirect root path to /Login */}
            <Route path="/" element={<Navigate to="/Login" replace />} />

            {/* Keep all existing routes */}
            <Route path="/Home" element={<Home />} />
            <Route path="/book/:bookId" element={<BookDetail />} />
            <Route path="/About" element={<About />} />
            <Route path="/Login" element={<Loginpage />} />
            <Route path="/Register" element={<Registerpage />} />
            <Route path="/BookRecommender" element={<BookRecommender />} />
          </Routes>
        </Router>
      </BookContext.Provider>
    </bookQuery.Provider>
  );
}

export default App;