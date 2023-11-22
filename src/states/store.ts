import { configureStore } from "@reduxjs/toolkit";
import { TaskAPI } from "../services/api/task-api";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AccountAPI } from "../services/api/account-api";
import { AccountSlice } from "./slice/account-slice";
import { ProjectAPI } from "../services/api/project-api";

export const store = configureStore({
  reducer: {
    [TaskAPI.reducerPath]: TaskAPI.reducer,
    [ProjectAPI.reducerPath]: ProjectAPI.reducer,
    [AccountAPI.reducerPath]: AccountAPI.reducer,

    account: AccountSlice.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare()
      .concat(TaskAPI.middleware)
      .concat(ProjectAPI.middleware)
      .concat(AccountAPI.middleware),
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
