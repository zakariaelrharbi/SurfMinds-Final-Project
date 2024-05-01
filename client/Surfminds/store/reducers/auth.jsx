// // authSlice.js

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//     currentUser: undefined,
//     isLoading: false,
//     error: null, // Add error field to store error messages
// };

// export const userRegister = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
//     try {
//         console.log(userData);
//         const response = await axios.post('http://localhost:3001/api/auth/register', userData);
//         console.log(response.data);
//         return response.data.user;
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response.data.errors);
//     }
// });

// export const userLogin = createAsyncThunk(
//     "auth/login",
//     async (userData, thunkAPI) => {
//         try {
//             const response = await axios.post(
//                 "http://localhost:3001/api/auth/login", userData,
//                 {
//                     withCredentials: true
//                 }
//             );
//             return response.data.user;
//         } catch (err) {
//             return thunkAPI.rejectWithValue(err.response.data.errors);
//         }
//     }
// );

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     extraReducers: builder => {
//         builder
//             .addCase(userRegister.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(userRegister.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.currentUser = action.payload;
//             })
//             .addCase(userRegister.rejected, (state, action) => {
//                 state.isLoading = false;
//                 console.error("Registration failed:", action.error);
//             })
//             .addCase(userLogin.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null; // Clear previous login errors
//             })
//             .addCase(userLogin.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.currentUser = action.payload;
//                 state.error = null; // Clear login error after successful login
//             })
//             .addCase(userLogin.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.payload; // Store login error in state
//             })
//     },
// });

// export default authSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: undefined,
  isLoading: false,
};

export const userRegister = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:3001/api/auth/register", userData,
      );
      return response.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login", userData,
        {
            withCredentials: true
        }
      );
      return response.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken") ?? "";
      const response = await axios.get("https://api.realworld.io/api/user", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("accessToken");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(userRegister.rejected, (state) => {
        state.isLoading = false;
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
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.currentUser = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.currentUser = null;
      });
  },
});

export default authSlice.reducer;