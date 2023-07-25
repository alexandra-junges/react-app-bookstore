import { Button } from "react-bootstrap";
import './main-page.css';

const BookStoreHome = () => {
    
    return ( 
        <div className="container center">
            <h2>Welcome to BookStore</h2>
            <p>A platform to search about your preferred books</p>
            <Button>
                See Books
            </Button>
        </div>
     );
}
 
export default BookStoreHome;