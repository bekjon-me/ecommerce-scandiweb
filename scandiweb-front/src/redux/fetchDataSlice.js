import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '..';
import { PRODUCTS } from '../App';

const initialState = {
  products: null,
  status: 'idle',
  error: null,
};

export const fetchAllProducts = createAsyncThunk('fetch/fetchAll', async () => {
  try {
    const response = await client.query({ query: PRODUCTS }).then((result) => {
      return result.data.categories[0].products;
    });
    return response;
  } catch (error) {
    return error;
  }
});

export const fetchAllTechProducts = createAsyncThunk(
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
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'success';
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error;
      });
  },
});

export default fetchDataSlice.reducer;
