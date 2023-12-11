import { GlobalUserVariables } from "@models/redux";
import { createReducer } from "@reduxjs/toolkit";
import {
  userActiveAction,
  userDetailsAction,
  userSocketConnection,
} from "@redux/actions/userInfoActions";

const globalUserVariables: GlobalUserVariables = {
  userLoggedIn: false,
  parsedUserInfo: undefined,
  isSocketConnected: false,
};

const userInfoReducer = createReducer(globalUserVariables, (actions) => {
  actions
    .addCase(userActiveAction, (state, action) => {
      state.userLoggedIn = action?.payload;
    })

    .addCase(userDetailsAction, (state, action) => {
      state.userLoggedIn = true;
      state.parsedUserInfo = action?.payload;
    })

    .addCase(userSocketConnection, (state, action) => {
      state.isSocketConnected = action?.payload;
    });
});

export default userInfoReducer;
