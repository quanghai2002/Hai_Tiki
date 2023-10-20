import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '~/apis/userApi.js';


// ------------TẠO ĐƠN HÀNG XEM TRƯỚC TRƯỚC KHI CẬP NHẬT LÊN SERVER -
const GioHang = createSlice({
  name: 'GioHang',
  initialState: {
    cartList: [],
    isMaxBuyPhone: false
  },
  reducers: {

    //---- THÊM SẢN PHẨM VÀO TRONG GIỎ HÀNG ----
    addPhoneCart(state, action) {

      // ----- MỖI LẦN CLICK MUA NGAY 1 SẢN PHẨM SẼ THAY BẰNG ĐƠN HÀNG MỚI NHẤT -------
      // ---KIỂM TRA XEM SẢN PHẨM ĐÓ ĐÃ CÓ TRONG GIỎ HÀNG HAY CHƯA ---
      // ---NẾU CÓ RỒI THÌ TĂNG SỐ LƯỢNG MUA NÊN 1 AND <= tổng số lượng sản phẩm

      const index = state?.cartList?.findIndex((cart) => {
        return cart?._id === action?.payload?._id;
      });


      // --NẾU KHÁC -1 đã tồn tại thì cập nhật Tăng số lượng sản phẩm
      // check đoạn số lượng lượng không đc vượt quá tổng số lượng sản phẩm
      // nếu số lượng sản phẩm hiện tại ít hơn tổng sản phẩm thì cho thêm 
      // nếu vượt quá thì set số lượng sản phẩm mua bằng tổng sản phẩm trong kho luôn
      if (index !== -1) {
        console.log('sản phẩm đã tồn tại');
        const newPhoneAddSoluong = {
          ...state?.cartList[index],
          soluongmua: state?.cartList[index]?.soluongmua + action?.payload?.soluongmua < state?.cartList[index]?.quantity ? state?.cartList[index]?.soluongmua + action?.payload?.soluongmua : state?.cartList[index]?.quantity
        };

        state?.cartList?.splice(index, 1, newPhoneAddSoluong);

        // nếu tổng số lượng sản phẩm mua === max rồi thì => sẽ set isMaxBuyPhone === true
        if (state?.cartList[index]?.soluongmua === state?.cartList[index]?.quantity) {
          state.isMaxBuyPhone = true;
        } else {
          state.isMaxBuyPhone = false;
        }
      }
      // Ngược lại === -1 không tìm thấy sản phẩm đó thì Thêm mới vào
      else {
        state?.cartList?.push(action?.payload);
        state.isMaxBuyPhone = false;
      }
    },
    // CẬP NHẬT GIỎ HÀNG TRONG REDUX
    updatePhoneCart(state, action) {
      state.cartList = action?.payload;
    }

  }
});


// export action and reduceSlide
const { reducer, actions } = GioHang;
export default reducer;
export const { addPhoneCart, updatePhoneCart } = actions;