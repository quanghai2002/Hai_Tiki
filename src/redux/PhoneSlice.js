import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import phoneApi from '~/apis/phoneApi.js';

// thunk API
//// First, create the AsyncThunk
const getAllPhoneProductsNoPagination = createAsyncThunk(
  'get-ALL-PHONE-PRODUCTS-No-Pagination',
  async (param, thunkAPI) => {
    try {
      const dataGellAllPhone = await phoneApi.getAllPhones();

      // console.log({ dataGellAllPhone });
      return dataGellAllPhone;

    } catch (error) {
      console.log(error);
    }
    // const response = await userApi.checkLogin(param);
    // return response.data
  }
);

// delete => Phone
const deletePhone = createAsyncThunk(
  'DELETE => phone',
  async (param, thunkAPI) => {
    try {
      const deletePhone = await phoneApi.deletePhones(param);
      // console.log({ dataGellAllPhone });
      thunkAPI.dispatch(getAllPhoneProductsNoPagination());
      console.log({ deletePhone });

    } catch (error) {
      console.log(error);
    }
    // const response = await userApi.checkLogin(param);
    // return response.data
  }
);


// tạo phoneSlice
const phoneSlice = createSlice({
  name: 'Phone',
  initialState: {
    isLoading: false,
    phone: [],

    // các thông tin khác nếu cần
  },
  reducers: {
    // action là function nhé => gọi dispatch => phải gọi hàm: dispatch(login(...))


  },

  extraReducers: (builder) => {

    // get all phone
    builder.addCase(getAllPhoneProductsNoPagination.pending, (state) => {
      state.isLoading = true;

    });

    builder.addCase(getAllPhoneProductsNoPagination.fulfilled, (state, action) => {
      state.isLoading = false;
      state.phone = action.payload;
    });
    builder.addCase(getAllPhoneProductsNoPagination.rejected, (state) => {
      state.isLoading = false;
      state.phone = [];
    });

    // delete phone
    builder.addCase(deletePhone.pending, (state) => {
      state.isLoading = true;

    });

    builder.addCase(deletePhone.fulfilled, (state, action) => {
      state.isLoading = false;

    });
    builder.addCase(deletePhone.rejected, (state) => {
      state.isLoading = false;
      state.phone = [];
    });

  }
});

// export action and reduceSlide
const { reducer, actions } = phoneSlice;
export default reducer;

// các acion nội bộ =>trong redux
// export const { } = actions;

//  action => Action => AsyncThunk => => để call API
export { getAllPhoneProductsNoPagination, deletePhone }; // action Async thunk