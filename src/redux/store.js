import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "./dashboardSlice";
import checkboxSlice from "./checkboxSlice";

const store = configureStore({
    reducer: {
        dashboard: dashboardSlice,
        checkbox: checkboxSlice
    }
})

export default store