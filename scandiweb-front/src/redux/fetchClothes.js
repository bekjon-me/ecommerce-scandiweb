import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '..';
import { PRODUCTS } from '../App';

const initialState = {
  products: null,
  status: 'idle',
  error: null,
};

export const fetchAllClothesProducts = createAsyncThunk(
  'fetch/fetchClothes',
  async () => {
    try {
      const response = await client
        .query({ query: PRODUCTS })
        .then((result) => {
          return result.data.categories[1].products;
        });
      return response;
    } catch (error) {
      return error;
    }
  }
);

const fetchDataSlice = createSlice({
  name: 'fetch',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchAllClothesProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAllClothesProducts.fulfilled, (state, action) => {
        state.status = 'success';
        state.products = action.payload;
      })
      .addCase(fetchAllClothesProducts.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error;
      });
  },
});

export default fetchDataSlice.reducer;
