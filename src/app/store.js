import { configureStore, createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    value: 0
  },
  reducers: {
    filterSelected(state, action) {
      state.value = action.payload
    }
  }
})

export const store = configureStore({
  reducer: {
    filter: filterSlice.reducer
  },
});

export const { filterSelected } = filterSlice.actions
