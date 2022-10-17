import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '..';
import { getProduct } from '../Graphql/queries';

const initialState = {
  product: null,
  status: 'idle',
  error: null,
};

export const fetchViewingProduct = createAsyncThunk(
  'fetch/fetchTech',
  async (id) => {
    try {
      const response = await client
        .query({ query: getProduct, variables: { id: id } })
        .then((result) => {
          return result.data.product;
        });
      return response;
    } catch (error) {
      return error;
    }
    // console.log(id);
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
        state.product = action.payload;
      })
      .addCase(fetchViewingProduct.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error;
      });
  },
});

export default fetchDataSlice.reducer;
