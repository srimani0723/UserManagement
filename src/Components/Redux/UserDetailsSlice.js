import { createSlice } from "@reduxjs/toolkit";

const apiStatusConstraints = {
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
  initial: "INITIAL",
};

const UserDetailsSlice = createSlice({
  name: "UserDetailsSlice",
  initialState: {
    userDetails: null,
    apiStatus: apiStatusConstraints.initial,
  },
  reducers: {
    setUserDetailsObj: (state, action) => {
      state.userDetails = action.payload;
    },
    setApiStatus: (state, action) => {
      state.apiStatus = action.payload;
    },
  },
});

export default UserDetailsSlice;
