import { createSlice } from "@reduxjs/toolkit";

const checkboxSlice = createSlice({
    name: "checkbox",
    initialState: {
        checkedRowArr: [],
        allSelectedPages: []
    },
    reducers: {
        add: (state, action) => {
            state.checkedRowArr.push(action.payload)
        },
        remove: (state, action) => {
            state.checkedRowArr = state.checkedRowArr.filter(item => item?.id !== action.payload.id)
        },
        clearCheckedRow: (state) => {
            state.checkedRowArr.length = 0
        },
        addToAllSelectedPages: (state, action) => {
            state.allSelectedPages.push(action.payload)
        },
        removeFromAllSelectedPages: (state, action) => {
            state.allSelectedPages = state.allSelectedPages.filter(item => item !== action.payload)
        },
        resetAllSelectedPages: (state) => {
            state.allSelectedPages.length = 0;
        }
    }
})

export const { add, remove, clearCheckedRow, addToAllSelectedPages, removeFromAllSelectedPages, resetAllSelectedPages } = checkboxSlice.actions

export default checkboxSlice.reducer