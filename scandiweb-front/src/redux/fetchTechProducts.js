import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '..';
import { FETCHPRODUCTS } from '../App';

const initialState = {
  products: null,
  status: 'idle',
  error: null,
};

export const fetchAllTechProducts = createAsyncThunk(
  'fetch/fetchTech',
  async () => {
    try {
      const response = await client
        .query({ query: FETCHPRODUCTS, variables: { title: 'tech' } })
        .then((result) => {
          return result.data.category.products;
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
      .addCase(fetchAllTechProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAllTechProducts.fulfilled, (state, action) => {
        state.status = 'success';
        state.products = action.payload;
      })
      .addCase(fetchAllTechProducts.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error;
      });
  },
});

export default fetchDataSlice.reducer;
