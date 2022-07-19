import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  productsInCart: [],
  quantity: 0,
  total: 0,
};

const fetchDataSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    addToCart(state, action) {
      if (state.productsInCart.length === 0) {
        state.productsInCart.push({ ...action.payload, amount: 1 });
        return;
      }
      state.productsInCart.map((product) => {
        if (
          product.id === action.payload.id &&
          product.selectedParams['Size'] ===
            action.payload.selectedParams['Size'] &&
          product.selectedParams['Color'] ===
            action.payload.selectedParams['Color'] &&
          product.selectedParams['Capacity'] ===
            action.payload.selectedParams['Capacity']
        ) {
          product.amount += 1;
        }
        return null;
      });

      if (
        !state.productsInCart.some(
          (product) =>
            product.id === action.payload.id &&
            product.selectedParams['Size'] ===
              action.payload.selectedParams['Size'] &&
            product.selectedParams['Color'] ===
              action.payload.selectedParams['Color'] &&
            product.selectedParams['Capacity'] ===
              action.payload.selectedParams['Capacity']
        )
      ) {
        state.productsInCart.push({ ...action.payload, amount: 1 });
      }
    },
    removeFromCart(state, action) {
      state.productsInCart.map((product, index) => {
        if (
          product.id === action.payload.id &&
          current(product.selectedParams) === action.payload.selectedParams
        ) {
          if (product.amount === 1) {
            state.productsInCart.splice(index, 1);
          }
          product.amount -= 1;
        }
        return null;
      });
    },
    calcQuantity(state) {
      state.quantity = 0;
      state.productsInCart?.map((product) => {
        state.quantity += product.amount;
        return null;
      });
    },
    calcTotal(state, action) {
      state.total = 0;
      state.productsInCart?.map((product) => {
        console.log(product.prices);
        console.log(action.payload);
        product.prices.map((price) => {
          if (price.currency.label === action.payload) {
            state.total += price.amount * product.amount;
          }
          return null;
        });
        return null;
      });
    },
  },
});

const { actions } = fetchDataSlice;

export const { addToCart, removeFromCart, calcTotal, calcQuantity } = actions;

export default fetchDataSlice.reducer;
