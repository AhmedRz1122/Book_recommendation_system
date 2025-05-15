import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import BookDetail from './Components/BookDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:bookId" element={<BookDetail />} />
      </Routes>
    </Router>
  );
}

export default App;