import axios from 'axios';

  export const getCategories = async () => {
    try {
      const categories = await axios.get(`${process.env.REACT_APP_API_URL}/api/Categories`)
      return categories.data
    } catch (error) {
        console.error("Error fetching categories:", error)
      throw error
    }
  }

  export const getCategoryById = async (id) => {
    try {
      const category = await axios.get(`${process.env.REACT_APP_API_URL}/api/Categories/${id}`)
      return category.data
    } catch (error) {
        console.error("Error fetching categories:", error)
      throw error
    }
  }

  export const searchCategory = async (searchedValue) => {
    const categories = await axios.get(`${process.env.REACT_APP_API_URL}/api/Categories/search/${searchedValue}`)
    return categories.data
  }

  export const createCategory = async (category) =>{
    await axios.post(`${process.env.REACT_APP_API_URL}/api/Categories`, category)
  }

  export const updateCategory = async (id, category) => {
    await axios.put(`${process.env.REACT_APP_API_URL}/api/Categories/${id}`, { 
        id: parseInt(id), 
        name: category.name
    })
  }

  export const deleteCategory = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/Categories/${id}`)
  }