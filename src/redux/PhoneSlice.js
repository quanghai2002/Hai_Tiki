import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '~/apis/userApi.js';

// thunk API
//// First, create the AsyncThunk
const getAllPhoneProducts = createAsyncThunk(
  'get-ALL-PHONE-PRODUCTS',
  async (param, thunkAPI) => {
    // const response = await userApi.checkLogin(param);
    // return response.data
  }
);


// tạo phoneSlice
const phoneSlice = createSlice({
  name: 'Phone',
  initialState: {
    phone: {},
    // các thông tin khác nếu cần
  },
  reducers: {
    // action là function nhé => gọi dispatch => phải gọi hàm: dispatch(login(...))


  },
  // extraReducers: (builder) => {

  //     builder.addCase(checkLoginUser.pending, (state) => {
  //         state.isLoading = true;

  //     });

  //     builder.addCase(checkLoginUser.fulfilled, (state, action) => {
  //         state.isLoading = false;
  //         state.user = action.payload;
  //     });
  //     builder.addCase(checkLoginUser.rejected, (state) => {
  //         state.isLoading = false;
  //         state.user = {};
  //     });


  // }
});

// export action and reduceSlide
const { reducer, actions } = phoneSlice;
export default reducer;

// các acion nội bộ =>trong redux
// export const { } = actions;

//  action AsyncThunk => => để call API
// export { checkLoginUser }; // action Async thunk