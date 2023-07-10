import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import BlogCategoryService from "./blog.categoryService";

const initialState = {
  blogCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const resetBlogState = createAction('resetBlogState');

export const getBlogCategories = createAsyncThunk(
  "blogCategory/getAllCategories/",
  async (_, {rejectWithValue}) => {
    try {
      return await BlogCategoryService.getBlogCategories();
    } catch (error) {
      throw rejectWithValue(error.response.data.message);
    }
  }
);

export const createBlogCategories = createAsyncThunk(
  "blogCategory/createCategory",
  async (data, { rejectWithValue }) => {
    try {
      return await BlogCategoryService.createBlogCategories(data);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

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
        state.message = action.payload;
      })
      .addCase(createBlogCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.BlogCategoryCreated = action.payload;
      })
      .addCase(createBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetBlogState, () => initialState);
  },
});

export const { actions } = blogCategorySlice
export default blogCategorySlice.reducer;
