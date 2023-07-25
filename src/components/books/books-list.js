import React  from 'react';
import { useBooks } from "../../hooks/useBooks";
import { Button, Alert } from "react-bootstrap";
import SearchResults from "../main-page/search";
import formatDate from '../../utils/utilityDate';

function BooksList() {
    const { 
        booksList,
        deleteAlert,
        setDeleteAlert,
        onDelete,
        handleCreateBook,
        handleSearch,
        onEditButton 
    } = useBooks()

    return (
        <>
            {deleteAlert && (
                <Alert
                    className="mt-3"
                    variant="danger"
                    onClose={() => setDeleteAlert(false)}
                    dismissible
                >
                    The book has been deleted.
                </Alert>
            )}
            <h4 className="mt-4 center">Books List</h4>
            <Button
                className="mt-2 text-center"
                variant="primary"
                onClick={handleCreateBook}
            >
                New Book
            </Button>

            <SearchResults onSearch={handleSearch} />

            {booksList && booksList.length > 0 ? (
            <table className="table table-striped table-bordered table-hover mt-3">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Book Name</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Value</th>
                        <th>Publish Date</th>
                        <th>Options</th>
                    </tr>
                </thead>
                
                <tbody>
                    {booksList.map((book) => { 
                        const formattedDate = formatDate(book.publishDate)
                        return (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.description}</td>
                                <td>{book.categoryName}</td>
                                <td>{book.value}</td>
                                <td>{formattedDate}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        onClick={() => onEditButton(book.id)}
                                    >
                                        Edit
                                    </Button>
                                    {' '}
                                    <Button
                                        variant="danger"
                                        onClick={() => onDelete(book.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
        </table>
         ) : (
            <p className="mt-5 text-center">No books found.</p>
        )}
    </>
    )
}

export default BooksList;