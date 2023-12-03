import React from 'react'
import styles from "./styles.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { deleteMany } from '../../redux/dashboardSlice'
import { clearCheckedRow, resetAllSelectedPages } from '../../redux/checkboxSlice'

function DeleteSelected() {
    const dispatch = useDispatch()
    const { checkedRowArr } = useSelector(store => store.checkbox)

    const handleDelete = () => {
        // deleting the elements
        dispatch(deleteMany(checkedRowArr))

        // reset all selected pages
        dispatch(resetAllSelectedPages())

        // clearing the checkedRow array
        dispatch(clearCheckedRow())
    }


  return (
    <button onClick={handleDelete} className={styles.btn}>Delete Selected</button>
  )
}

export default DeleteSelected