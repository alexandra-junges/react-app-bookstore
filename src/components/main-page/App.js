import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './main-page.css';
import Header from './header';
import BookStoreHome from './home';

function App() {
  return (
    <Router>
      <Header />
      <div className='container'>
        <Routes>

          <Route path='/' element={<BookStoreHome />} exact />

        </Routes> 
      </div>
    </Router>
  );
}

export default App;
