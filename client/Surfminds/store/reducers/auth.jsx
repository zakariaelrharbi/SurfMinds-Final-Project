import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    currentUser: undefined,
    isLoading: false,
};

export const userRegister = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        console.log(userData);
        const response = await axios.post('http://localhost:3001/api/auth/register', userData
        );
        console.log(response.data);
        return response.data.user;
    } catch (error) {
        // Fix typo in error variable name (err instead of error)
        return thunkAPI.rejectWithValue(error.response.data.errors);
    }
});

export const userLogin = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login", userData
      );
      return response.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: builder => {
        builder
            .addCase(userRegister.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload;
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.isLoading = false;
                console.error("Registration failed:", action.error); // Log the error message
            })
               .addCase(userLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload;
            })
            .addCase(userLogin.rejected, (state) => {
                state.isLoading = false;
            })
    },
});


export default authSlice.reducer;
