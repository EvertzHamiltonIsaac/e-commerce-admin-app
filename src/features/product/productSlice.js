import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

export const resetProductState = createAction('resetProductState');

export const getProducts = createAsyncThunk("product/", async (thunkAPI) => {
  try {
    return await productService.getProducts();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createProducts = createAsyncThunk(
  "product/create",
  async (data, {rejectWithValue}) => {
    try {
      return await productService.createProducts(data);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productCreated = action.payload;
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      }).addCase(resetProductState, () => initialState)
  },
});

export const { actions } = productSlice
export default productSlice.reducer;
