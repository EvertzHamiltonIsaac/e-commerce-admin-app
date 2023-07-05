import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const data = {
  id: 0,
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
}

const getUserDataFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const userDefaultState = {
  message: null,
  data: getUserDataFromLocalStorage,
  sessionToken: null,
};

const initialState = {
  user: userDefaultState,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const signIn = createAsyncThunk(
  "auth/login/admin",
  async (user, thunkAPI) => {
    try {
      return await authService.signIn(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default authSlice.reducer;
