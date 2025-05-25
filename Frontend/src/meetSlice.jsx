// src/features/meeting/meetingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to create a meeting room
export const createMeetingRoom = createAsyncThunk(
  'meeting/createMeetingRoom',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/api/meetings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to create meeting');
      const data = await response.json();
      return data.roomId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const meetingSlice = createSlice({
  name: 'meeting',
  initialState: {
    roomId: null,
    loading: false,
    error: null,
  },
  reducers: {
    // optional: add reducers for resetting room etc.
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMeetingRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMeetingRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.roomId = action.payload;
      })
      .addCase(createMeetingRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default meetingSlice.reducer;
