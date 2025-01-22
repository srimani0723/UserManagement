import { configureStore } from "@reduxjs/toolkit";
import ThemeSlice from "./ThemeSlice";
import UserSlice from "./UserSlice";
import UserDetailsSlice from "./UserDetailsSlice";

const Store = configureStore({
  reducer: {
    ThemeState: ThemeSlice.reducer,
    UserState: UserSlice.reducer,
    UserDetailsState: UserDetailsSlice.reducer,
  },
});

export default Store;
