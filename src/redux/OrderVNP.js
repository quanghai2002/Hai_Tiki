import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '~/apis/userApi.js';


// ------------TẠO ĐƠN HÀNG XEM TRƯỚC TRƯỚC KHI CẬP NHẬT LÊN SERVER -
const orderVNP = createSlice({
  name: 'orderVNP',
  initialState: [],
  reducers: {

    //--- THÊM ĐƠN HÀNG PREVIEW THANH TOÁN VNP  ----
    addOrderPayVNP(state, action) {
      const newState = action?.payload;
      return state = newState;
    }
  }

});


// export action and reduceSlide
const { reducer, actions } = orderVNP;
export default reducer;
export const { addOrderPayVNP } = actions;