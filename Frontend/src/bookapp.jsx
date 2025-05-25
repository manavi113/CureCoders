// src/redux/slices/appointmentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to create a new appointment
export const createAppointment = createAsyncThunk(
  "appointment/new",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // required if you're using cookies for auth
      };

      const { data } = await axios.post(
        "/api/v1/appointment/new",
        appointmentData,
        config
      );

      return data.appointment;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create appointment");
    }
  }
);
export const fetchMyAppointments = createAsyncThunk(
  "appointments/fetchMyAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/appointments/me");
      return data.appointments;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    loading: false,
    appointment: null,
    error: null,
        myAppointments: [],
  },
  reducers: {
        clearErrors: (state) => {
      state.error = null;
    },
    clearAppointmentErrors: (state) => {
      state.error = null;
    },
    resetAppointment: (state) => {
      state.appointment = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment = action.payload;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.myAppointments = action.payload;
      })
      .addCase(fetchMyAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});

export const { clearErrors, clearAppointmentErrors, resetAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
