import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ParsedUserInfo } from "../models/common";
import DyBaseUrlConfigurator from "../shared/dyBaseUrlConfigurator";
import { isPropEmpty } from "../shared/utilfunctions";

interface GlobalUserVariables {
  userLoggedIn: boolean;
  parsedUserInfo: ParsedUserInfo | undefined;
}

const dyBaseConfigurator = new DyBaseUrlConfigurator();

const globalUserVariables: GlobalUserVariables = {
  userLoggedIn: !isPropEmpty(dyBaseConfigurator.jwtAccesToken),
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
