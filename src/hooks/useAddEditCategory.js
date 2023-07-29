import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { 
    createCategory,
    updateCategory,
    getCategoryById
 } from "../components/_services/category-service";

export const useAddEditCategory = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [successAlert, setSuccessAlert] = useState(false)
    const [editAlert, setEditAlert] = useState(false)
    const [errorAlert, setErrorAlert] = useState(false)
    const [category, setCategory] = useState({
        id: 0,
        name: ''
    })

    useEffect(() => {
        const fetchCategory = async () => {
          if (id) {
            try {
              const categoryData = await getCategoryById(id)
              setCategory(categoryData)
            } catch (error) {
              console.error("An error occurred while getting the record.", error)
              setErrorAlert(true)
            }
          }
        }
    
        fetchCategory()
      }, [id])

    const onChange = (e) => {
        setCategory({ ...category, name: e.target.value })
    }

    const resetForm = () => {
        setCategory({ 
            id: 0, 
            name: "" 
        })
    }

    const onSubmit = async (e) => {
        if (!id) {
          await onCreateForm(e)
        } else {
          await onUpdateForm(e)
        }
    }
    
    const onCreateForm = async (e) => {
        e.preventDefault()
        try {
          await createCategory(category)
          resetForm()
          setSuccessAlert(true)
          setTimeout(() => {
            setSuccessAlert(false);
            onCancel()
          }, 1500)
        } catch (error) {
          console.error("Error creating category:", error)
          setErrorAlert(true)
        }
    }
    
    const onUpdateForm = async (e) => {
        e.preventDefault()
        try {
          await updateCategory(id, category)
          setEditAlert(true)
          setTimeout(() => {
            setEditAlert(false)
            onCancel()
          }, 1500)
        } catch (error) {
          console.error("Error updating category:", error)
          setErrorAlert(true)
        }
    }

    const onCancel = () => {
        navigate('/categorieslist')
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