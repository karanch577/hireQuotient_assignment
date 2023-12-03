import React, { useState } from 'react'
import styles from "./styles.module.css"
import { useDispatch } from 'react-redux'
import { search } from '../../redux/dashboardSlice'

function SearchBar() {
  const [searchInput, setSearchInput] = useState("")

  const dispatch = useDispatch()

  const handleSearch = (e) => {
    e.preventDefault()

    // checking if the input is empty
    if(!searchInput) {
      // error
      return;
    }

    dispatch(search(searchInput))

  }

  const handleInputChange = (e) => {
    setSearchInput(e.target.value)
    dispatch(search(e.target.value))
  }

  return (
    <form className={styles.container} onSubmit={handleSearch}>
        <input className={styles.input} type="text" placeholder='Search by name, email or role' value={searchInput} onChange={handleInputChange} />
        <button className={`${styles.btn} search-icon`}>Search</button>
        
    </form>
  )
}

export default SearchBar