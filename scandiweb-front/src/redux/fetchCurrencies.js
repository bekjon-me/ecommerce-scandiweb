import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '..';
import { Currencies } from '../Graphql/queries';

const initialState = {
  currencies: null,
  status: 'idle',
  error: null,
};

export const fetchCurrencies = createAsyncThunk(
  'fetch/fetchCurrencies',
  async (id) => {
    try {
      const response = await client
        .query({ query: Currencies })
        .then((result) => {
            return result.data.currencies
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
      .addCase(fetchCurrencies.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.status = 'success';
        state.currencies = action.payload;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error;
      });
  },
});

export default fetchDataSlice.reducer;
