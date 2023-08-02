import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import productCategoryService from "./product.categoryService";

export const resetProductCategoryState = createAction('resetProductCategoryState');

export const getProductCategories = createAsyncThunk(
  "prodCategory/getAllCategories/",
  async (_, {rejectWithValue}) => {
    try {
      return await productCategoryService.getProductCategories();
    } catch (error) {
      throw rejectWithValue(error.response.data.message);
    }
  }
);

export const createProductCategories = createAsyncThunk(
  "prodCategory/createCategory",
  async (data, { rejectWithValue }) => {
    try {
      return await productCategoryService.createProductCategories(data);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProductCategory = createAsyncThunk(
  `prodCategory/updateCategory/:id`,
  async ({data, id}, { rejectWithValue }) => {
    try {
      return await productCategoryService.updateProductCategory({data, id});
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteProductCategory = createAsyncThunk(
  `prodCategory/deleteCategory/:id`,
  async (id, { rejectWithValue }) => {
    try {
      return await productCategoryService.deleteProductCategory(id);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  productCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

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
        state.message = action.payload;
      }) 
      .addCase(createProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.ProductCategoryCreated = action.payload;
      })
      .addCase(createProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.ProductCategoryUpdated = action.payload;
      })
      .addCase(updateProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.ProductCategoryDeleted = action.payload;
      })
      .addCase(deleteProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetProductCategoryState, () => initialState)
  },
});

export const { actions } = productCategorySlice
export default productCategorySlice.reducer;
