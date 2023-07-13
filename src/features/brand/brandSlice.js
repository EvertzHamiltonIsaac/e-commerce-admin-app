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

export const updateBrands = createAsyncThunk(
  `/brand/update/:id`,
  async ({data, id}, { rejectWithValue }) => {
    try {
      return await brandService.updateBrand({data, id});
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteBrands = createAsyncThunk(
  `/brand/delete/:id`,
  async (id, { rejectWithValue }) => {
    try {
      return await brandService.deleteBrand(id);
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
      .addCase(updateBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brandUpdated = action.payload;
      })
      .addCase(updateBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brandDeleted = action.payload;
      })
      .addCase(deleteBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetBrandState, () => initialState);
  },
});

export const { actions } = brandSlice
export default brandSlice.reducer;
