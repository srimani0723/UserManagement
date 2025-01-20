import { createSlice } from "@reduxjs/toolkit";

const apiStatusConstraints = {
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
  initial: "INITIAL",
};

const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {
    userList: null,
    filteredList: null,
    apiStatus: apiStatusConstraints.initial,
    userDetailsView: null,
    inputValue: "",
    initialSort: "relevant",
    pageNumber: 1,
  },
  reducers: {
    setUserList: (state, action) => {
      state.userList = action.payload;
      state.filteredList = action.payload;
    },
    setApiStatus: (state, action) => {
      state.apiStatus = action.payload;
    },
    setUserDetailsView: (state, action) => {
      state.userDetailsView = action.payload;
    },
    getInputValue: (state, action) => {
      state.inputValue = action.payload;
      state.pageNumber = 1;
    },
    setSort: (state, action) => {
      state.initialSort = action.payload;
      if (state.initialSort === "A-Z") {
        state.filteredList = state.filteredList.sort((x, y) =>
          x.name.localeCompare(y.name)
        );
      } else if (state.initialSort === "Z-A") {
        state.filteredList = state.filteredList.sort((x, y) =>
          y.name.localeCompare(x.name)
        );
      } else {
        state.filteredList = state.userList;
      }
    },
    pageIncrement: (state, action) => {
      state.pageNumber += 1;
    },
    pageDecrement: (state, action) => {
      state.pageNumber -= 1;
    },
  },
});

export default UserSlice;
