import React  from 'react';
import { useAddEditCategory } from "../../hooks/useAddEditCategory";
import { Button, Form, Alert } from "react-bootstrap";

function AddEditCategory() {
    const { 
        id,
        category,
        successAlert,
        setSuccessAlert,
        editAlert,
        setEditAlert,
        errorAlert,
        setErrorAlert,
        onChange,
        onSubmit,
        onCancel
    } = useAddEditCategory()

    return ( 
        <>
            {successAlert && (
                <Alert
                    className="mt-3"
                    variant="success"
                    onClose={() => setSuccessAlert(false)}
                    dismissible
                >
                    Your category has been created.
                </Alert>
            )}

            {editAlert && (
                <Alert
                    className="mt-3"
                    variant="warning"
                    onClose={() => setEditAlert(false)}
                    dismissible
                >
                    The category has been edited.
                </Alert>
            )}

            {errorAlert && (
                <Alert
                    className="mt-3"
                    variant="danger"
                    onClose={() => setErrorAlert(false)}
                    dismissible
                >
                    An error occurred while creating/updating the category.
                </Alert>
            )}

            <Form className="mt-5 text-center">
                <Form.Group className="mb-3 text-primary">
                    <Form.Label>{id ? 'Edit Category' : 'Add new Category'}</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="New Category"
                        id="name"
                        value={category.name || ""}
                        onChange={onChange}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    onClick={onSubmit}
                    disabled={!category.name}
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
 
export default AddEditCategory;