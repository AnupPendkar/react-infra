import { GlobalUserVariables } from "@models/redux";
import { createReducer } from "@reduxjs/toolkit";
import {
  userActiveAction,
  userDetailsAction,
} from "@redux/actions/userInfoActions";

const globalUserVariables: GlobalUserVariables = {
  userLoggedIn: false,
  parsedUserInfo: undefined,
};

const userInfoReducer = createReducer(globalUserVariables, (actions) => {
  actions
    .addCase(userActiveAction, (state, action) => {
      state.userLoggedIn = action?.payload;
    })

    .addCase(userDetailsAction, (state, action) => {
      state.userLoggedIn = true;
      state.parsedUserInfo = action?.payload;
    });
});

export default userInfoReducer;
