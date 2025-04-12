// redux/slices/chaucaySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const fetchChauCay = createAsyncThunk('chaucay/fetch', async () => {
  const response = await api.get('/chaucay');
  return response.data;
});

const chaucaySlice = createSlice({
  name: 'chaucay',
  initialState: {
    data: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChauCay.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChauCay.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchChauCay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default chaucaySlice.reducer;
