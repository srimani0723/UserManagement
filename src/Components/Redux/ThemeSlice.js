import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice = createSlice({
  name: "ThemeSlice",
  initialState: {
    darkTheme: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export default ThemeSlice;
