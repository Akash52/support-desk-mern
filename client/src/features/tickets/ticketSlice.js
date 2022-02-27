import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService';

//Our initial state

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
  error: null,
};

//Here we create our ticket slice

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    //Here we create our reset reducer
    reset: (state) => initialState,
  },
  //Extra reducers is where we define our actions
  extraReducers: (builder) => {},
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
