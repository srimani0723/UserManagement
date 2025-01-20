import UserSlice from "./UserSlice";

const apiStatusConstraints = {
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
  initial: "INITIAL",
};

const action = UserSlice.actions;

export const FetchUserData = async (dispatch) => {
  dispatch(action.setApiStatus(apiStatusConstraints.inProgress));
  const fetchdata = await fetch("https://jsonplaceholder.typicode.com/users");
  if (fetchdata.ok) {
    const data = await fetchdata.json();
    dispatch(action.setUserList(data));
    dispatch(action.setApiStatus(apiStatusConstraints.success));
  } else {
    dispatch(action.setApiStatus(apiStatusConstraints.failure));
  }
};
