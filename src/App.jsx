import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import BookDetail from './Components/BookDetail';
import Loginpage from './Components/Loginpage'
import Registerpage from './Components/Registerpage';
import BookRecommender from './Components/BookRecomender';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:bookId" element={<BookDetail />} />
        <Route path="/Login" element={<Loginpage />} />
        <Route path="/Register" element={<Registerpage />} />
        <Route path="/BookRecommender" element={<BookRecommender />} />
        
        
        
      </Routes>
    </Router>
  );
}

export default App;