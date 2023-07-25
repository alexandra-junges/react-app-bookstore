import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './main-page.css';
import Header from './header';
import BookStoreHome from './home';
import CategoriesList from '../categories/categories-list';
import AddEditCategory from '../categories/add-edit-category';
import BooksList from '../books/books-list';
import AddEditBook from '../books/add-edit-book';

function App() {
  return (
    <Router>
      <Header />
      <div className='container'>
        <Routes>

          <Route exact path='/' element={<BookStoreHome />} />
          
          <Route exact path='/categorieslist' element={<CategoriesList />} />

          <Route exact path='/addeditcategory' element={<AddEditCategory />} />

          <Route exact path='/addeditcategory/:id' element={<AddEditCategory />} />

          <Route exact path='/bookslist' element={<BooksList />} />

          <Route exact path='/addeditbook' element={<AddEditBook />} />

          <Route exact path='/addeditbook/:id' element={<AddEditBook />} />

        </Routes> 
      </div>
    </Router>
  );
}

export default App;
