import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand as={Link} to="/">BookStore</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/bookslist">Books</Nav.Link>
                    <Nav.Link as={Link} to="/categorieslist">Categories</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        </>
    )
}
 
export default Header;