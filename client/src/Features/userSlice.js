import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    users: {}, // Initialize users as null when no user is logged in
    userStatus: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const newUser = {
                id: nanoid(),
                name: action.payload.name,
                email: action.payload.email,
                age: action.payload.age,
                genres: action.payload.genres,
            };

            // If there were no users (users is null), initialize the users object
            if (state.users === null) {
                state.users = {};
            }

            // Update the users object with new data
            state.users = { ...state.users, ...newUser };

            // Update userStatus based on whether a user is logged in or not
            state.userStatus = true; // Set to true for simplicity; adjust based on your logic
        },
        removeUser: (state) => {
            // Reset users to null and set userStatus to falsek
            state.users = null;
            state.userStatus = false;
        },
    },
});

export const { addUser, removeUser } = userSlice.actions;

export const selectUsers = (state) => state.user.users;
export const selectUserStatus = (state) => state.user.userStatus;

export default userSlice.reducer;
