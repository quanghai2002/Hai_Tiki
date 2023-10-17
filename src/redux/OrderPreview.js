import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '~/apis/userApi.js';


// ------------TẠO ĐƠN HÀNG XEM TRƯỚC TRƯỚC KHI CẬP NHẬT LÊN SERVER -
const orderPreview = createSlice({
  name: 'orderPreview',
  initialState: [],
  reducers: {

    // THÊM ĐƠN HÀNG XEM TRƯỚC ---- CHƯA LƯU VÀO DATABASE ---------
    addOrderReview(state, action) {
      // kiểm tra xem đơn hàng đã tồn tại chưa => nếu tồn tại rồi thay thế
      // const index = state.findIndex((item) => {
      //   return item?._id === action?.payload?._id;
      // });

      // if (index !== -1) {
      //   state?.splice(index, 1, action.payload);
      // }
      // else {
      //   state.push(action.payload);
      // }

      // ----- MỖI LẦN CLICK MUA NGAY 1 SẢN PHẨM SẼ THAY BẰNG ĐƠN HÀNG MỚI NHẤT -------
      const newState = [action?.payload];
      return state = newState;
    }
  }

});


// export action and reduceSlide
const { reducer, actions } = orderPreview;
export default reducer;
export const { addOrderReview } = actions;