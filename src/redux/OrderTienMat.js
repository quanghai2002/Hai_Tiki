import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '~/apis/userApi.js';


// ------------TẠO ĐƠN HÀNG XEM TRƯỚC TRƯỚC KHI CẬP NHẬT LÊN SERVER -
const orderPayTienMat = createSlice({
  name: 'orderPayTienMat',
  initialState: [],
  reducers: {

    //--- THÊM ĐƠN HÀNG THANH TOÁN TIỀN MẶT =>> SAU KHI ĐÃ THÊM ĐƠN HÀNG ĐÓ VÀO DATA BASE----
    addOrderThanhToanTienMat(state, action) {
      const newState = action?.payload;
      return state = newState;
    }
  }

});


// export action and reduceSlide
const { reducer, actions } = orderPayTienMat;
export default reducer;
export const { addOrderThanhToanTienMat } = actions;