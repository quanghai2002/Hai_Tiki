import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '~/apis/userApi.js';


// ------------TẠO ĐƠN HÀNG XEM TRƯỚC TRƯỚC KHI CẬP NHẬT LÊN SERVER -
const orderPreview = createSlice({
  name: 'orderPreview',
  initialState: {},
  reducers: {

    // THÊM ĐƠN HÀNG XEM TRƯỚC ---- CHƯA LƯU VÀO DATABASE ---------
    addOrderReview(state, action) {

      // ----- MỖI LẦN CLICK MUA NGAY 1 SẢN PHẨM SẼ THAY BẰNG ĐƠN HÀNG MỚI NHẤT -------
      const newState = action?.payload;
      return state = newState;
    },
  }
});


// export action and reduceSlide
const { reducer, actions } = orderPreview;
export default reducer;
export const { addOrderReview } = actions;