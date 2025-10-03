import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    username: string;
}

const initialState: UserState = {
    username: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUsers(state) {
            state.username;
        },
    },
});

export const { getUsers } = userSlice.actions;
export default userSlice.reducer;
