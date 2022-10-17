import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeModal: null,
  currency: {
    label: localStorage.getItem("currency")
      ? JSON.parse(localStorage.getItem("currency")).label
      : "USD",
    symbol: localStorage.getItem("currency")
      ? JSON.parse(localStorage.getItem("currency")).symbol
      : "$",
  },
};

const fetchDataSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {
    setToCurrency(state) {
      state.activeModal = "currency";
    },
    setToCart(state) {
      state.activeModal = "cart";
    },
    setToNull(state) {
      state.activeModal = null;
    },
    setCurrency(state, action) {
      state.currency = action.payload;
      localStorage.setItem("currency", JSON.stringify(state.currency));
    },
  },
});

const { actions } = fetchDataSlice;

export const { setToCart, setToCurrency, setToNull, setCurrency } = actions;

export default fetchDataSlice.reducer;
