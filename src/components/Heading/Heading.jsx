import React from 'react'
import styles from "./styles.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { addToAllSelectedPages, removeFromAllSelectedPages } from '../../redux/checkboxSlice'

function Heading({label1, label2, label3, label4, currentPage }) {
    const dispatch = useDispatch()
    const { allSelectedPages } = useSelector((store) => store.checkbox)

    
   

    const handleChange = (e) => {
        // if current page is already present remove it
        if(allSelectedPages.includes(currentPage)) {

            dispatch(removeFromAllSelectedPages(currentPage))
            return;
        }

        // add the current page to allSelectedPages
        dispatch(addToAllSelectedPages(currentPage))
    }

  return (
    <div className={styles.container}>
        <div className={styles["checkbox-container"]}>
            <input type="checkbox" name="heading" id="heading" checked={allSelectedPages.includes(currentPage)} onChange={handleChange} />
        </div>

        <p className={`${styles["heading-title"]} ${styles.name}`}>{label1}</p>
        <p className={`${styles["heading-title"]} ${styles.email}`}>{label2}</p>
        <p className={`${styles["heading-title"]} ${styles.role}`}>{label3}</p>
        <p className={styles.actions}>{label4}</p>
    </div>
  )
}

export default Heading