import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModal: null,
  currency: {
    label: 'USD',
    symbol: '$',
  },
};

const fetchDataSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    setToCurrency(state) {
      state.activeModal = 'currency';
    },
    setToCart(state) {
      state.activeModal = 'cart';
    },
    setToNull(state) {
      state.activeModal = null;
    },
    setCurrency(state, action) {
      state.currency = action.payload;
    },
  },
});

const { actions } = fetchDataSlice;

export const { setToCart, setToCurrency, setToNull, setCurrency } = actions;

export default fetchDataSlice.reducer;
