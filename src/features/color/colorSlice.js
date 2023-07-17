import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";

export const resetColorState = createAction("resetColorState");

export const getColors = createAsyncThunk("color/", async (_, {rejectWithValue}) => {
  try {
    return await colorService.getColors();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const createColors = createAsyncThunk(
  "color/create",
  async (data, { rejectWithValue }) => {
    try {
      return await colorService.createColors(data);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateColors = createAsyncThunk(
  `color/update/:id`,
  async ({data, id}, { rejectWithValue }) => {
    try {
      return await colorService.updateColor({data, id});
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteColors = createAsyncThunk(
  `color/delete/:id`,
  async (id, { rejectWithValue }) => {
    try {
      return await colorService.deleteColor(id);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
    colors: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getColors.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = action.payload;
    })
    .addCase(getColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
    })
    .addCase(createColors.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createColors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.ColorCreated = action.payload;
    })
    .addCase(createColors.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    })
    .addCase(updateColors.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateColors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.ColorUpdated = action.payload;
    })
    .addCase(updateColors.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    })
    .addCase(deleteColors.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteColors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.ColorDeleted = action.payload;
    })
    .addCase(deleteColors.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    })
    .addCase(resetColorState, () => initialState);
  },
});

export const { actions } = colorSlice
export default colorSlice.reducer