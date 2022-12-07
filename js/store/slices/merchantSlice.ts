import { createSlice } from "@reduxjs/toolkit";
import { IClientProps } from "../../lib/api/auth";

const merchantSlice = createSlice({
  name: "studio",
  initialState: {
    isLoading: false,
    isSearching: false,
    studio: {} as IClientProps,
  },
  reducers: {
    fetchStudios: (state, action) => {
      state.studio = action.payload;
    },
    updateLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
    updateSearchingState: (state, action) => {
      state.isSearching = action.payload;
    },
  },
});

export const { fetchStudios, updateLoadingState, updateSearchingState } =
  merchantSlice.actions;

export default merchantSlice.reducer;
