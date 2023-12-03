import React, { useEffect, useState } from 'react'
import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { deleteOne, edit } from '../../redux/dashboardSlice';
import { add, remove } from '../../redux/checkboxSlice';

function Row({data, isAllSelected}) {
  const [value, setValue] = useState(data)
  const [isEdit, setIsEdit] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  const dispatch = useDispatch()

  const handleCheckbox = (e) => {
    setIsSelected(e.target.checked)

    // if the checkbox is selected - add to checkedRowArr
    if(e.target.checked) {
      dispatch(add(data))
    }

    // if the checkbox is deselected - remove from checkedRowArr
    if(!e.target.checked) {
      dispatch(remove(data))
    }
  }

  const handleStopEdit = () => {
    // setting the value to previous value
    setValue(data)
    setIsEdit(false)
  }

  const handleEdit = () => {
    // checking if any of the value is empty
    if(!value.name || !value.email || !value.role) {
      // show error
      return;
    }

    dispatch(edit(value))
    setIsEdit(false)
  }

  const handleInputChange = (e) => {
    setValue(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // deleting one element
  const handleDeleteOne = (id) => {
    if(id) {
      dispatch(deleteOne(id))
    }
  }

  useEffect(() => {
    setIsSelected(isAllSelected);

    if(isAllSelected) {
      dispatch(add(data))
    }
  }, [isAllSelected])

  let containerClassName = styles.container;

  // prevent the heading the change the background on selected
  if(isSelected) containerClassName += ` ${styles.selected}`
  

  return (
    <div className={containerClassName}>
      <div className={styles["checkbox-container"]}>
        <input type="checkbox" name="user" id={data?.id} checked={isSelected} onChange={handleCheckbox} />
      </div>

      {/* since we need the edit functionality in the same line, we will be toggling between the paragraph and input tag according to isEdit flag */}
      <div className={styles.name}>
      {!isEdit ? 
      <p>{data?.name}</p> : 
      <input className={styles.input} type='text' name='name' value={value?.name} onChange={handleInputChange} />
      }
      </div>
        
        <div className={styles.email}>
        {!isEdit ? 
        <p>{ data?.email}</p> : 
        <input className={styles.input} type="text" name='email' value={value?.email} onChange={handleInputChange} />
        }
        </div>

        <div className={styles.role}>
        {!isEdit ? 
        <p>{data?.role}</p> :
        <input className={styles.input} type='text' name='role' value={value?.role} onChange={handleInputChange} />
        }
        </div>

        <div className={styles["action-container"]}>
          {/* displaying the edit and the save icon based of isEdit flag */}
          {isEdit ?
          <button onClick={handleEdit} className={`${styles["action-btn"]} save`}><img src="./submit.svg" alt="save" /></button>
          :
          <button onClick={() => setIsEdit(true)} className={`${styles["action-btn"]} edit`}><img src="./editIcon.svg" alt="edit" /></button>}

          { isEdit ?
          <button onClick={handleStopEdit} className={`${styles["action-btn"]}`}><img src="./cross.svg" alt="delete" /></button>
          :
          <button onClick={() => handleDeleteOne(data.id)} className={`${styles["action-btn"]} delete`}><img src="./deleteIcon.svg" alt="delete" /></button>}
        </div>
    </div>
  )
}

export default Row