// redux/slices/accountSlice.js
import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    balance: 0, // Khởi tạo số dư tài khoản là 0
  },
  reducers: {
    addFunds: (state, action) => {
      state.balance += action.payload; // Cộng tiền vào số dư tài khoản
    },
  },
});

export const { addFunds } = accountSlice.actions;

export default accountSlice.reducer;
