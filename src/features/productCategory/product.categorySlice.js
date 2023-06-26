import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productCategoryService from "./product.categoryService";

export const getProductCategories = createAsyncThunk("prodCategory/getAllCategories/", async (thunkAPI) => {
  try {
    return await productCategoryService.getProductCategories();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
}); 

const initialState = {
    productCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const productCategorySlice = createSlice({
  name: "productCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getProductCategories.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productCategories = action.payload;
    })
    .addCase(getProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
    })
  },
});

export default productCategorySlice.reducer 