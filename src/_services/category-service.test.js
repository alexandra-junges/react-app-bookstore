/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import {
  getCategories,
  getCategoryById,
  searchCategory,
  createCategory,
  updateCategory,
  deleteCategory
 } from "./category-service";

jest.mock('axios')

describe('CategoryService', () => {
    const mockedCategoriesList =  [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
      { id: 3, name: 'Category 3' },
    ]

    test('fetches categories', async () => {
      axios.get = jest.fn().mockResolvedValue({ data: [ mockedCategoriesList ] })

      const result = await getCategories()
      expect(result).toEqual([ mockedCategoriesList ])

      expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/Categories`)
    })

    test('fetches a category by ID', async () => {
      axios.get = jest.fn().mockResolvedValue({ data: [ mockedCategoriesList ] })

      const categoryId = 1
      const result = await getCategoryById(categoryId)
      expect(result).toEqual([ mockedCategoriesList ])

      expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/Categories/${categoryId}`)
    })

    test('searches for categories by name', async () => {
      axios.get = jest.fn().mockResolvedValue({ data: [ mockedCategoriesList ] })

      const categoryName = 'Category 1'
      const result = await searchCategory(categoryName)
      expect(result).toEqual([ mockedCategoriesList ])

      expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/Categories/search/${categoryName}`)
    })

    test('creates a category', async () => {
      axios.post = jest.fn()

      const category = { id: 1, name: 'New Category' }
      await createCategory(category)

      expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/Categories`, category)
    })

    test('updates a category by ID', async () => {
      axios.put = jest.fn()

      const categoryId = 1
      const updatedCategory = { id: 1, name: 'Updated Category' }
      await updateCategory(categoryId, updatedCategory)

      expect(axios.put).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/Categories/${categoryId}`, 
      { id: 1, name: 'Updated Category' })
    })

    test('delete a category by ID', async () => {
      axios.delete = jest.fn()

      const categoryId = 1
      await deleteCategory(categoryId)

      expect(axios.delete).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/Categories/${categoryId}`)
    })

    test('throws an error when fetching categories fails', async () => {
      axios.get = jest.fn().mockRejectedValue(new Error('Error fetching categories:'))
  
      await expect(getCategories()).rejects.toThrow('Error fetching categories:')
  
      expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/Categories`)
    })
})


