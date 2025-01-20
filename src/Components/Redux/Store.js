import { configureStore } from "@reduxjs/toolkit";
import ThemeSlice from "./ThemeSlice";
import UserSlice from "./UserSlice";

const Store = configureStore({
  reducer: {
    ThemeState: ThemeSlice.reducer,
    UserState: UserSlice.reducer,
  },
});

export default Store;
