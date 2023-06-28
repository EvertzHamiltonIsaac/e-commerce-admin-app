import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BlogCategoryService from "./blog.categoryService";

export const getBlogCategories = createAsyncThunk("blogCategory/getAllCategories/", async (thunkAPI) => {
  try {
    return await BlogCategoryService.getBlogCategories();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
}); 

const initialState = {
    blogCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const blogCategorySlice = createSlice({
  name: "blogCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getBlogCategories.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCategories = action.payload;
    })
    .addCase(getBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
    })
  },
});

export default blogCategorySlice.reducer 