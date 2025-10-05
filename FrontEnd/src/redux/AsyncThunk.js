import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';

// SIGNUP
export const signup = createAsyncThunk(
  'auth/signup',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/signup', payload);
      return data; // { success, message, user }
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Signup failed' });
    }
  }
);

// LOGIN
export const login = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/signin', payload);
      return data; // { success, message, user }
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Login failed' });
    }
  }
);
