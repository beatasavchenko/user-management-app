import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/users/user-api-slice";

export const store = configureStore({
    reducer: {
        [userSlice.reducerPath]: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(userSlice.middleware);
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
