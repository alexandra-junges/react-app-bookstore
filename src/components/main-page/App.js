import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './main-page.css';
import Header from './header';
import BookStoreHome from './home';
import CategoriesList from '../categories/categories-list';

function App() {
  return (
    <Router>
      <Header />
      <div className='container'>
        <Routes>

          <Route path='/' element={<BookStoreHome />} exact />
          
          <Route exact path='/categorieslist' component={CategoriesList} />

          <Route exact path={['/addeditcategory', '/addeditcategory/:id']} component={AddEditCategory} />

        </Routes> 
      </div>
    </Router>
  );
}

export default App;
