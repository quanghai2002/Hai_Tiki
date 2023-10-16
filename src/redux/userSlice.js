import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '~/apis/userApi.js';

// thunk API
//// First, create the AsyncThunk
const getUserServer = createAsyncThunk(
  'getUserServer',
  async (param, thunkAPI) => {
    const response = await userApi.getOneUser(param);
    console.log('dữ liệu USER sau khi cập nhật:', response?.data);
    return response.data;
  }
);


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
    },
    updateUser(state, action) {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {

    builder.addCase(getUserServer.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getUserServer.rejected, (state) => {
      state.user = undefined;
    });


  }
});

// export action and reduceSlide
const { reducer, actions } = userSlice;
export default reducer;

// các acion nội bộ =>trong redux
export const { login, logOut, updateUser } = actions;

//  action AsyncThunk => => để call API
export { getUserServer }; // action Async thunk