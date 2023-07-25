import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    getCategories,
    searchCategory,
    deleteCategory 
} from "../components/_services/category-service";
import { getBookByCategoryId } from "../components/_services/book-service";

export const useCategory = () => {
    const history = useNavigate()
    const [categoryList, setCategoryList] = useState([])
    const [deleteAlert, setDeleteAlert] = useState(false)

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const categories = await getCategories()
            setCategoryList(categories)
          } catch (error) {
            console.error("Failed to fetch categories.", error)
          }
        }
        fetchCategories()
    }, [])

    const onDelete = async (id) => {
        const isCategoryUsedInBook = await checkIfCategoryUsedInBook(id)
        if (isCategoryUsedInBook) {
            alert('This category is being used in a book and cannot be deleted.')
            return
        }
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this category?'
        )
        if (confirmDelete) {
                deleteCategory(id)
                .then(() => {
                    getCategories()
                        .then((categories)=> {
                            setCategoryList(categories)
                        })
                    setDeleteAlert(true)
                    setTimeout(() => {
                        setDeleteAlert(false)
                    }, 1500)
                })
                .catch ((error) => {
                    console.error('Failed to delete the category.', error)
                    setDeleteAlert(true)
                    setTimeout(() => {
                        setDeleteAlert(false)
                    }, 1500)
                })
        }
    }

    const checkIfCategoryUsedInBook = async (id) => {
        try {
            const books = await getBookByCategoryId(id)
            return books.length > 0
        } catch (error) {
            if(error.response && error.response.status !== 404) {
                console.error('Failed to fetch books by category.', error)
                return false
            }
        }
    }

    const handleCreateCategory = () => {
        history.push('/addeditcategory')
    }

    const onEditButton = (id) => {
        history.push(`/addeditcategory/${id}`)
    }

    const handleSearch = (searchedValue) => {
        if (searchedValue !== '') {
            searchCategory(searchedValue)
            .then((categories) => {
                if(categories.length > 0) {
                setCategoryList(categories)
                } else {
                    setCategoryList([])
                }
            })
            .catch((error) => {
                console.error("Error fetching categories:", error)
                setCategoryList([])
        })
     } else {
            getCategories()
            .then((categories) => {
                setCategoryList(categories)
            })
            .catch((error) => {
                console.error("Error fetching categories:", error)
                setBooksList([])
            })
        }
    }
    return {
        categoryList,
        deleteAlert,
        onDelete,
        handleCreateCategory,
        onEditButton,
        handleSearch,
        setDeleteAlert
    }
}