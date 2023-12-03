import { useEffect } from "react";
import "./App.css";
import { BACKEND_API, itemsPerPage } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardData, setFilteredData } from "./redux/dashboardSlice";
import Row from "./components/Row/Row";
import usePagination from "./hooks/usePagination";
import Pagination from "./components/Pagination/Pagination";
import SearchBar from "./components/SearchBar/SearchBar";
import Heading from "./components/Heading/Heading";

function App() {

  const { filteredData } = useSelector((store) => store.dashboard);
  const {  allSelectedPages } = useSelector((store) => store.checkbox)
  const dispatch = useDispatch();

  const { currentData, next, prev, jump, maxPage, currentPage } = usePagination(filteredData, itemsPerPage);
  

  const getData = async () => {
    try {
      const res = await fetch(BACKEND_API);
      const data = await res.json();

      if (data) {
        dispatch(setDashboardData(data));
        // initially dashboardData and filteredData will be same
        dispatch(setFilteredData(data))
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {currentData && (
        <div className="container">
        <SearchBar />
        <Heading 
        label1="Name"
        label2="Email"
        label3="Role"
        label4="Actions"
        currentPage={currentPage}
        />
          {currentData.map((item, index) => (
            <Row 
            key={item.id} 
            data={item} 
            isAllSelected={allSelectedPages.includes(currentPage)}
            />
          ))}

          <Pagination 
          jump={jump} 
          next={next}
          prev={prev}
          maxPage={maxPage}
          currentPage={currentPage}
          />
        </div>
      )}
    </>
  );
}

export default App;
