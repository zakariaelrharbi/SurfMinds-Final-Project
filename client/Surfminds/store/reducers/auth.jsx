import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    currentUser: undefined,
    isLoading: false,
};
export const register = createAsyncThunk('auth/register', async (userData) =>
{
    try {
        
    } catch (error) {
        
    }
})
const authSlice = createSlice({
    name: "auth",
    initialState,
    }
)

export default authSlice.reducer;