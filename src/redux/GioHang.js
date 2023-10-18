import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '~/apis/userApi.js';


// ------------TẠO ĐƠN HÀNG XEM TRƯỚC TRƯỚC KHI CẬP NHẬT LÊN SERVER -
const GioHang = createSlice({
  name: 'GioHang',
  initialState: [],
  reducers: {

    //---- THÊM SẢN PHẨM VÀO TRONG GIỎ HÀNG ----
    addPhoneCart(state, action) {

      // ----- MỖI LẦN CLICK MUA NGAY 1 SẢN PHẨM SẼ THAY BẰNG ĐƠN HÀNG MỚI NHẤT -------
      console.log('giá trị cần thêm vào giỏ hàng', action?.payload)
    },
  }
});


// export action and reduceSlide
const { reducer, actions } = GioHang;
export default reducer;
export const { addPhoneCart } = actions;