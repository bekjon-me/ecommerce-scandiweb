import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeLink: 'all',
};

const fetchDataSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    setToAll(state) {
      state.activeLink = 'all';
    },
    setToTech(state) {
      state.activeLink = 'tech';
    },
    setToClothes(state) {
      state.activeLink = 'clothes';
    },
  },
});

const { actions } = fetchDataSlice;

export const { setToAll, setToTech, setToClothes } = actions;

export default fetchDataSlice.reducer;
