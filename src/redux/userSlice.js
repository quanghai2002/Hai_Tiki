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
    user: {},
    isLoading: false,
    // các thông tin khác nếu cần
  },
  reducers: {
    // 
    // loginPending(state) {
    //   state.isLoading = true;
    // },

    // loginFulfilled(state, action) {
    //   state.isLoading = false;
    //   state.user = action.payload;
    //   // localStorage.setItem('token', action.payload.token)
    // },
    // loginRejected(state) {
    //   state.isLoading = false;
    //   state.user = {};
    // },
    // logOut(state) {
    //   state.user = {};
    // }
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
// các acion nội bộ
// export const { loginPending, loginFulfilled, loginRejected, logOut } = actions;

// export các action AsyncThunk => để call API
// export { checkLoginUser }; // action Async thunk