// redux/slices/cayxanhSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const fetchCayXanh = createAsyncThunk('cayxanh/fetch', async () => {
  const response = await api.get('/cayxanh');
  return response.data;
});

const cayxanhSlice = createSlice({
  name: 'cayxanh',
  initialState: {
    data: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCayXanh.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCayXanh.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchCayXanh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cayxanhSlice.reducer;
