import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import DeletedSelected from "../DeleteSelected/DeleteSelected";

function Pagination({ jump, next, prev, maxPage, currentPage }) {

  const arr = new Array(maxPage).fill(null);
  const { checkedRowArr } = useSelector(store => store.checkbox)
  const { filteredData } = useSelector(store => store.dashboard)

      // if all the items are deleted in the last page, the value of the current page remains the same but the maxpage decreases
    // say - current page is 5 and max page is 5, you delete all the items in the current page (5) - then max page will be 4 but current page will still be 5

    useEffect(() => {
      if(currentPage > maxPage && maxPage > 0) {
        jump(maxPage)
      }
    }, [currentPage, maxPage])
  

    // console.log(currentPage)


  return (
    <div className={styles.container}>
      {/* show no of selected rows */}
      <div>
        <p>{checkedRowArr.length} of {filteredData.length} row (s) selected</p>
        {checkedRowArr.length > 0 && <DeletedSelected />}
      </div>

      <div className={styles["btn-container"]}>
        {/* first page button start */}
      <button className={`${styles["pagination-btn"]} first-page`} onClick={() => jump(1)}>
        <img
          className={styles["first-page"]}
          src="./lastIcon.svg"
          alt="first-page"
        />
      </button>
      {/* first page button end */}

      {/* prev button start */}
      <button className={`${styles["pagination-btn"]} previous-page`} onClick={() => prev()}>
        <img className={styles.prev} src="./nextIcon.svg" alt="prev" />
      </button>
      {/* prev button end */}

      {arr?.map((_, i) => (
        <button
          className={currentPage === i + 1 ? `${styles["pagination-btn"]} ${styles["btn-active"]}` : styles["pagination-btn"]}
          key={i}
          onClick={() => jump(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      {/* next button start */}
      <button className={`${styles["pagination-btn"]} next-page`} onClick={() => next()}>
        <img src="./nextIcon.svg" alt="next" />
      </button>
      {/* next button end */}

      {/* last page button start */}
      <button
        className={`${styles["pagination-btn"]} last-page`}
        onClick={() => jump(maxPage)}
      >
        <img src="./lastIcon.svg" alt="last-page" />
      </button>
      {/* last page button end */}
      </div>
    </div>
  );
}

export default Pagination;
