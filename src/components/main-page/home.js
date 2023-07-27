import React  from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './main-page.css';

const BookStoreHome = () => {
    const bookListRoute = "/bookslist"
    const navigate = useNavigate()

    const handleButtonClick = () => {
        navigate(bookListRoute)
    }

    return ( 
        <div className="container center">
            <h2>Welcome to BookStore</h2>
            <p>A platform to search about your preferred books</p>
            <Button
                variant="primary"
                onClick={handleButtonClick}
            >
                See Books
            </Button>
        </div>
     );
}
 
export default BookStoreHome;