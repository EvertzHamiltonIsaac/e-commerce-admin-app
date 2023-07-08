import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import brandService from "./brandService";

export const resetBrandState = createAction("resetBrandState");

export const getBrands = createAsyncThunk("brand/", async (_, {rejectWithValue}) => {
  try {
    return await brandService.getBrands();
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const createBrands = createAsyncThunk(
  "brand/create",
  async (data, { rejectWithValue }) => {
    try {
      return await brandService.createBrands(data);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(createBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brandCreated = action.payload;
      })
      .addCase(createBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetBrandState, () => initialState);
  },
});

export default brandSlice.reducer;
