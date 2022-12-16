import { createSlice } from "@reduxjs/toolkit";
import { IClientProps } from "../../lib/api/auth";
import {
  SessionBookingResponse,
  StudioSessionProps,
} from "./../../lib/api/studioSessions";

const merchantSlice = createSlice({
  name: "studio",
  initialState: {
    isLoading: false,
    isSearching: false,
    studio: {} as IClientProps,
    bookings: {} as SessionBookingResponse,
    sessions: [] as StudioSessionProps[],
  },
  reducers: {
    updateStudios: (state, action) => {
      state.studio = action.payload;
    },
    updateSessions: (state, action) => {
      state.sessions = action.payload;
    },
    updateBookings: (state, action) => {
      state.bookings = action.payload;
    },
    updateLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
    updateSearchingState: (state, action) => {
      state.isSearching = action.payload;
    },
  },
});

export const {
  updateStudios,
  updateSessions,
  updateBookings,
  updateLoadingState,
  updateSearchingState,
} = merchantSlice.actions;

export default merchantSlice.reducer;
