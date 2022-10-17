import { configureStore } from '@reduxjs/toolkit';
import allReducers from './fetchDataSlice';
import techReducers from './fetchTechProducts';
import clothesReducers from './fetchClothes';
import activeLinkReducers from './setActiveLink';
import activeModalReducers from './cartCurrencyModal';
import cartReducers from './cartSlice';
import viewingProductReducers from './viewingProduct';
import fetchCurrenciesReducers from './fetchCurrencies';

export const store = configureStore({
  reducer: {
    all: allReducers,
    tech: techReducers,
    clothes: clothesReducers,
    activeLink: activeLinkReducers,
    activeModal: activeModalReducers,
    cart: cartReducers,
    viewingProduct: viewingProductReducers,
    currencies: fetchCurrenciesReducers,
  },
});
