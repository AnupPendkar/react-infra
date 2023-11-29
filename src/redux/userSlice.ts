import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ParsedUserInfo } from "@models/common";
interface GlobalUserVariables {
  userLoggedIn: boolean;
  parsedUserInfo: ParsedUserInfo | undefined;
}

const globalUserVariables: GlobalUserVariables = {
  userLoggedIn: false,
  parsedUserInfo: undefined,
};

const userSlice = createSlice({
  name: "userVaribles",
  initialState: globalUserVariables,
  reducers: {
    setUserInfo: (
      state,
      action: PayloadAction<{ status: boolean; info?: ParsedUserInfo }>
    ) => {
      state.userLoggedIn = action?.payload?.status;
      state.parsedUserInfo = action.payload?.info;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
