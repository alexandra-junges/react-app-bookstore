import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { 
    createCategory,
    updateCategory,
    getCategoryById
 } from "../_services/category-service";

export const useAddEditCategory = () => {
    const history = useNavigate()
    const { id } = useParams()
    const [successAlert, setSuccessAlert] = useState(false)
    const [editAlert, setEditAlert] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)
    const [category, setCategory] = useState({
        id: 0,
        name: ''
    })
    
    useEffect(() => {
        if (id) {
            getCategoryById(id)
                .then((category) => {
                    setCategory(category)
                })
                .catch((error) => {
                    console.error("An error occurred while getting the record.", error)
                    debugger;
                    setErrorAlert(true)
                })
        }
    }, [])

    const onChange = (e) => {
        setCategory({ ...category, name: e.target.value })
    }

    const resetForm = () => {
        setCategory({ 
            id: 0, 
            name: "" 
        })
    }

    const onSubmit = (e) => {
        if (!id) {
            onCreateForm(e)
        } else {
            onUpdateForm(e)
        }
      }
      
    const onCreateForm = (e) => {
        e.preventDefault()
        createCategory(category)
            .then(()=> {
                resetForm()
                setSuccessAlert(true)
                setTimeout(() => {
                    setSuccessAlert(false)
                    onCancel()
                }, 1500)
            })
            .catch((error) => {
                console.error("Error creating category:", error)
                setErrorAlert(true)
            })
    }

    const onUpdateForm = (e) => {
        e.preventDefault()
        updateCategory(id, category)
            .then(() => {
                setEditAlert(true)
                setTimeout(() => {
                    setEditAlert(false)
                    onCancel()
                }, 1500)
            })
            .catch((error) => {
                console.error("Error updating category:", error)
                setErrorAlert(true)
            })
    }

    const onCancel = () => {
        history.push('/categorieslist')
    }

    return {
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
    }
}