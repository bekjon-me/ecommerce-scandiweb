import { createSlice, current } from '@reduxjs/toolkit';

const localDataBase = JSON.parse(localStorage.getItem("products"))
let localquantity = 0;
let localTotal = 0;
localDataBase?.forEach((product) => {
  localquantity += product.amount;
});

localDataBase?.map((product) => {
  product.prices.map((price) => {
    if (price.currency.label === JSON.parse(localStorage.getItem("currency")).label) {
      localTotal += price.amount * product.amount;
    }else if(price.currency.label === "USD") {
      localTotal += price.amount * product.amount;
    }
    return null;
  });
  return null;
});

const initialState = {
  productsInCart: localDataBase ? localDataBase : [],
  quantity: localquantity,
  total: localTotal,
};

const fetchDataSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    addToCart(state, action) {
      if (state.productsInCart.length === 0) {
        state.productsInCart.push({ ...action.payload, amount: 1 });
        localStorage.setItem('products', JSON.stringify(state.productsInCart));

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
          console.log("bor");
          localStorage.setItem('products', JSON.stringify(state.productsInCart));
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
        localStorage.setItem('products', JSON.stringify(state.productsInCart));
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
           localStorage.setItem('products', JSON.stringify(state.productsInCart));
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
