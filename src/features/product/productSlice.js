import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

export const resetProductState = createAction('resetProductState');

export const getProducts = createAsyncThunk("product/", async (_, {rejectWithValue}) => {
  try {
    return await productService.getProducts();
  } catch (error) {
    return rejectWithValue(error);
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

export const updateProducts = createAsyncThunk(
  `product/update/:id`,
  async ({data, id}, { rejectWithValue }) => {
    try {
      return await productService.updateProducts({data, id});
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  `product/delete/:id`,
  async (id, { rejectWithValue }) => {
    try {
      return await productService.deleteProducts(id);
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
        state.message = action.payload;
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
      })
      .addCase(updateProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productUpdated = action.payload;
      })
      .addCase(updateProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productDeleted = action.payload;
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetProductState, () => initialState)
  },
});

export const { actions } = productSlice
export default productSlice.reducer;
