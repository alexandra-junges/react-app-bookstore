import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchResults from './search';

describe('SearchResults', () => {
  test('handle change renders correctly', async () => {
    const searchHandler = jest.fn()
    render(<SearchResults onSearch={searchHandler} />)

    const searchInput = screen.getByRole('textbox', {
      name: /search/i,
    })

    fireEvent.change(searchInput, { target: { value: 'example search' } })

    expect(searchHandler).toHaveBeenCalledTimes(1)
  })
})
