import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TAccount } from "../../models/account";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface AuthState {
  user: TAccount | null;
  error: string | null;
  loading: boolean;
}

export const AccountSlice = createSlice({
  name: "account",
  initialState: {
    user: null,
    error: "",
    loading: false,
  } as AuthState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<TAccount>) {
      state.user = action.payload;
    },
    setSignOut(state) {
      state.user = null;
      useLocalStorage("profile").removeItem();
    },
  },
});

export default AccountSlice.reducer;

export const { setCurrentUser, setSignOut } = AccountSlice.actions;
