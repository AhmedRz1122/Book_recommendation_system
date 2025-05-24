import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import BookDetail from './Components/BookDetail';
import Loginpage from './page/Loginpage'
import Registerpage from './page/Registerpage';
import BookRecommender from './page/BookRecomender';
import { About } from './Components/About';


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