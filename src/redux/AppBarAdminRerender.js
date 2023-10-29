import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '~/apis/userApi.js';


// ------------TẠO ĐƠN HÀNG XEM TRƯỚC TRƯỚC KHI CẬP NHẬT LÊN SERVER -
const AppBarAdminRerender = createSlice({
  name: 'AppBarAdminRerender',
  initialState: 0,
  reducers: {

    //--- THAY ĐỔI ĐỂ APP BAR ADMIN RENDER --
    rerender(state) {
      return state = Math.random() * 190000;
    }
  }

});


// export action and reduceSlide
const { reducer, actions } = AppBarAdminRerender;
export default reducer;
export const { rerender } = actions;