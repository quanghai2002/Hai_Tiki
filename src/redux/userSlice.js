import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '~/apis/userApi.js';

// thunk API
//// First, create the AsyncThunk
// const checkLoginUser = createAsyncThunk(
//     'checkLogin-user',
//     async (param, thunkAPI) => {
//         const response = await userApi.checkLogin(param);
//         return response.data
//     }
// )


// tạo UserSlice
const userSlice = createSlice({
  name: 'User-Auth',
  initialState: {
    user: undefined,
    // các thông tin khác nếu cần
  },
  reducers: {
    // action là function nhé => gọi dispatch => phải gọi hàm: dispatch(login(...))
    login(state, action) {
      // console.log('dataUsers:', action.payload);
      // thay đổi state mới
      state.user = action.payload;
    },
    logOut(state) {
      state.user = undefined;
    }
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
const { reducer, actions } = userSlice;
export default reducer;

// các acion nội bộ =>trong redux
export const { login, logOut } = actions;

//  action AsyncThunk => => để call API
// export { checkLoginUser }; // action Async thunk