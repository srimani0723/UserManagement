import UserDetailsSlice from "./UserDetailsSlice";
import UserSlice from "./UserSlice";

const apiStatusConstraints = {
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
  initial: "INITIAL",
};

const action1 = UserSlice.actions;

export const FetchUserData = async (dispatch) => {
  dispatch(action1.setApiStatus(apiStatusConstraints.inProgress));
  const fetchdata = await fetch("https://jsonplaceholder.typicode.com/users");
  if (fetchdata.ok) {
    const data = await fetchdata.json();
    dispatch(action1.setUserList(data));
    dispatch(action1.setApiStatus(apiStatusConstraints.success));
  } else {
    dispatch(action1.setApiStatus(apiStatusConstraints.failure));
  }
};

const action2 = UserDetailsSlice.actions;

export const FetchUserDetailsData = (userId) => async (dispatch) => {
  dispatch(action2.setApiStatus(apiStatusConstraints.inProgress));
  const fetchdata = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  if (fetchdata.ok) {
    const data = await fetchdata.json();
    dispatch(action2.setUserDetailsObj(data));
    dispatch(action2.setApiStatus(apiStatusConstraints.success));
  } else {
    dispatch(action2.setApiStatus(apiStatusConstraints.failure));
  }
};
