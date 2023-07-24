import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";

export const resetEnquiryState = createAction("resetEnquiryState");

export const getEnquiries = createAsyncThunk("enquiry/", async (thunkAPI) => {
  try {
    return await enquiryService.getEnquiries();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateEnquiry = createAsyncThunk(
  `enquiry/update/:id`,
  async ({data, id}, { rejectWithValue }) => {
    try {
      return await enquiryService.updateEnquiry(data, id);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteEnquiry = createAsyncThunk(
  `enquiry/delete/:id`,
  async (id, { rejectWithValue }) => {
    try {
      return await enquiryService.deleteEnquiry(id);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  enquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const enquirySlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.EnquiryDeleted = action.payload;
      })
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.EnquiryUpdated = action.payload;
      })
      .addCase(updateEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetEnquiryState, () => initialState);
  },
});

export default enquirySlice.reducer;
