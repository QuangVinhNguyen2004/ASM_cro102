// redux/slices/dungcuSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api1 } from '../../api1';

export const fetchDungCu = createAsyncThunk('dungcu/fetch', async () => {
  const response = await api1.fetchDungCu();
  return response?.data || [];
});

const dungcuSlice = createSlice({
  name: 'dungcu',
  initialState: {
    data: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDungCu.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDungCu.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchDungCu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dungcuSlice.reducer;
