import React, { useState } from "react";
import { InputGroup, Form } from "react-bootstrap";

const SearchResults = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch(query)
  }

  return ( 
    <InputGroup className="mt-5">
      <InputGroup.Text>🔍</InputGroup.Text>
      <Form.Control
        placeholder="Search"
        aria-label="Search"
        value={searchQuery}
        onChange={handleChange}
      />
    </InputGroup>
  )
}
 
export default SearchResults;