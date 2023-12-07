import { ParsedUserInfo } from "@models/common";
import { createAction } from "@reduxjs/toolkit";

export const userActiveAction = createAction<boolean>("USER_STATUS");
export const userDetailsAction = createAction<ParsedUserInfo>("USER_DETAILS");