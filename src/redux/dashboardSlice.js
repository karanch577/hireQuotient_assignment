import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        dashboardData: [],
        // filterData will be used in the UI
        filteredData: []
    },
    reducers: {
        setDashboardData: (state, action) => {
            state.dashboardData = action.payload
        },
        setFilteredData: (state, action) => {
            state.filteredData = action.payload
        },
        search: (state, action) => {
            state.filteredData = state.dashboardData.filter(item => {
                // checking for each property except id
                for (const property in item) {
                    if(property !== "id" && item[property].toLowerCase().startsWith(action.payload?.toLowerCase())) {
                        return item
                    }
                }
            })
        },
        deleteOne: (state, action) => {
            // removing that particular element from filteredData
            state.filteredData = state.filteredData.filter(item => item.id !== action.payload)

            // also removing from the dashboardData
            state.dashboardData = state.dashboardData.filter(item => item.id !== action.payload)
        },
        edit: (state, action) => {
            // updating with the provided data
            state.filteredData = state.filteredData.map(item => {
                if(item.id === action.payload.id) {
                    return action.payload
                }

                return item
            })

            // also updating the dashboardData
            state.dashboardData = state.dashboardData.map(item => {
                if(item.id === action.payload.id) {
                    return action.payload
                }

                return item
            })
        },
        deleteMany: (state, action) => {
            let deleteItemArr = action.payload
            // deleting the provided items
            state.filteredData = state.filteredData.filter(item => !deleteItemArr.some(el => item.id === el.id)
            )

            // also deleting from the dashboardData
            state.dashboardData = state.dashboardData.filter(item => !deleteItemArr.some(el => item.id === el.id)
            )
        }
    }
})

export const { setDashboardData, setFilteredData, search, deleteOne, edit, deleteMany } = dashboardSlice.actions

export default dashboardSlice.reducer