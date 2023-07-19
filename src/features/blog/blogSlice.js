import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";

export const resetBlogState = createAction("resetBlogState");

export const getBlogs = createAsyncThunk("blog/", async (thunkAPI) => {
  try {
    return await blogService.getBlogs();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createBlogs = createAsyncThunk(
  "blog/create",
  async (data, { rejectWithValue }) => {
    try {
      return await blogService.createBlogs(data);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateBlogs = createAsyncThunk(
  `blog/update/:id`,
  async ({data, id}, { rejectWithValue }) => {
    try {
      return await blogService.updateBlog({data, id});
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteBlogs = createAsyncThunk(
  `blog/delete/:id`,
  async (id, { rejectWithValue }) => {
    try {
      return await blogService.deleteBlog(id);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(createBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.BlogCreated = action.payload;
      })
      .addCase(createBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.BlogUpdated = action.payload;
      })
      .addCase(updateBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.BlogDeleted = action.payload;
      })
      .addCase(deleteBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetBlogState, () => initialState)
  },
});

export default blogSlice.reducer;
