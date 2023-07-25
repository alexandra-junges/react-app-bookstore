import { useCategory } from "../../hooks/useCategory";
import { Button, Alert } from "react-bootstrap";
import SearchResults from "../main-page/search";

function CategoriesList() {
    const {
        categoryList,
        deleteAlert,
        onDelete,
        handleCreateCategory,
        onEditButton,
        handleSearch,
        setDeleteAlert
    } = useCategory()

    return ( 
        <>
            {deleteAlert && (
                <Alert
                    className="mt-3"
                    variant="danger"
                    onClose={() => setDeleteAlert(false)}
                    dismissible
                >
                    The category has been deleted!
                </Alert>
            )}
            <h4 className="mt-4 center">Categories List</h4>
            <Button
                className="mt-2 text-center"
                variant="primary"
                onClick={handleCreateCategory}
            >
                New Category
            </Button>

            <SearchResults onSearch={handleSearch} />

            {categoryList && categoryList.length > 0 ? (
                <table
                    className="table table-striped table-bordered table-hover mt-3"
                    role="table"
                >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Category</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {categoryList.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        onClick={() => onEditButton(category.id)}
                                    >
                                        Edit
                                    </Button>{' '}
                                    <Button
                                        variant="danger"
                                        onClick={() => onDelete(category.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="mt-5 text-center">No categories found.</p>
            )}
        </>
     )
}
 
export default CategoriesList;