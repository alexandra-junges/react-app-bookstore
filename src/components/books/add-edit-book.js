import React  from 'react';
import { Button, Form, Alert } from "react-bootstrap";
import { useAddEditBooks } from "../../hooks/useAddEditBooks";

function AddEditBook() {
    const {
        id,
        book,
        categoryList,
        successAlert,
        setSuccessAlert,
        editAlert,
        setEditAlert,
        errorAlert,
        setErrorAlert,
        onChange,
        onSubmit,
        isFormValid,
        onCancel
    } = useAddEditBooks()

    return ( 
        <>
            {successAlert && (
                <Alert
                    className="mt-3"
                    variant="success"
                    onClose={() => setSuccessAlert(false)}
                    dismissible
                >
                    Your book has been created.
                </Alert>
                )}

            {editAlert && (
                <Alert
                    className="mt-3"
                    variant="warning"
                    onClose={() => setEditAlert(false)}
                    dismissible
                >
                    The book has been edited.
                </Alert>
            )}

            {errorAlert && (
            <Alert
                className="mt-3"
                variant="danger"
                onClose={() => setErrorAlert(false)}
                dismissible
            >
                An error occurred while creating/updating the book.
            </Alert>
            )}

            <Form className="mt-5 text-center">
                <Form.Group className="mb-3 text-primary">
                    <Form.Label>{id ? 'Edit Book' : 'Add new Book'}</Form.Label>
                    <Form.Control
                        className="mb-3"
                        type="text"
                        placeholder="Book's name"
                        id="name"
                        value={book.name}
                        onChange={onChange}
                    />

                    <Form.Control
                        className="mb-3"
                        type="text"
                        placeholder="Author's name"
                        id="author"
                        value={book.author}
                        onChange={onChange}
                    />

                    <Form.Control 
                        className="mb-3" 
                        as="textarea" 
                        id="description"
                        placeholder="Description of the book"
                        aria-label="With textarea" 
                        value={book.description}
                        onChange={onChange}
                    />

                    <Form.Select
                        className="mb-3"
                        id="categoryId"
                        value={book.categoryId}
                        onChange={onChange}
                    >
                        <option value="">
                            Choose a category
                        </option>
                        {categoryList.map((category) => (
                            <option 
                                key={category.id}
                                value={parseInt(category.id)}
                                data-testid={`category-${category.id}`}
                            >
                                { category.name }
                            </option> 
                        ))}
                    </Form.Select>

                    <Form.Control
                        className="mb-3"
                        type="text"
                        placeholder="€"
                        id="value"
                        value={book.value}
                        onChange={onChange}
                    />

                    <Form.Control
                        type="date"
                        placeholder="Publish Date"
                        id="publishDate"
                        value={book.publishDate}
                        onChange={onChange}
                        onBlur={onChange}
                    />

                </Form.Group>

                <Button
                    variant="primary"
                    onClick={onSubmit}
                    disabled={isFormValid}
                >
                    Save
                </Button>
                {' '}
                <Button
                    variant="light"
                    type="button"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            </Form>
        </>
     )
}
 
export default AddEditBook;