import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '..';
import { PRODUCTS } from '../App';

const initialState = {
  product: null,
  status: 'idle',
  error: null,
};

export const fetchViewingProduct = createAsyncThunk(
  'fetch/fetchTech',
  async () => {
    try {
      const response = await client
        .query({ query: PRODUCTS })
        .then((result) => {
          return result.data.categories[2].products;
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
      .addCase(fetchViewingProduct.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchViewingProduct.fulfilled, (state, action) => {
        state.status = 'success';
        state.products = action.payload;
      })
      .addCase(fetchViewingProduct.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error;
      });
  },
});

export default fetchDataSlice.reducer;
