import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    currentUser: undefined,
    isLoading: false,
};

export const UserRegister = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:3001/api/auth/register', {
            user: userData,
        });
        return response.data.user;
    } catch (error) {
        // Fix typo in error variable name (err instead of error)
        return thunkAPI.rejectWithValue(error.response.data.errors);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: builder => {
        builder
            .addCase(UserRegister.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(UserRegister.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload;
            })
            .addCase(UserRegister.rejected, (state, action) => {
                state.isLoading = false;
                console.error("Registration failed:", action.error); // Log the error message
            });
    },
});


export default authSlice.reducer;
