import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    text: ''
}


const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
      updateFilter(state, action) {
        return {
            text: action.payload
        }
      }
    }
})

export const { updateFilter } = filterSlice.actions
export default filterSlice.reducer