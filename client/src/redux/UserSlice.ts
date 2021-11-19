import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { UserType } from "../typings/UserType";
import axios from "axios";
import { SignUpType } from "../typings/SignUpType";
import { SignInType } from "../typings/SignInType";

interface UserState {
  user: UserType;
  isFetching: boolean;
  isSignUp: boolean;
  isSignIn: boolean;
  isSignOut: boolean;
  error: boolean;
}

const initialState: UserState = {
  user: {
    userId: "",
    userName: "",
    avatar: "",
    email: "",
    createdAt: "",
  },
  isFetching: true,
  isSignUp: false,
  isSignIn: false,
  isSignOut: false,
  error: false,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/auth/user`,
    { withCredentials: true }
  );

  return data;
});

export const signInUser = createAsyncThunk(
  "user/signIn",
  async (signInInput: SignInType) => {
    const {
      data: { code, message },
    } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/signin`,
      {
        email: signInInput.email,
        password: signInInput.password,
      },
      { withCredentials: true }
    );

    return {
      code,
      message,
    };
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUp",
  async (signUpInput: SignUpType) => {
    const {
      data: { code, message },
    } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
      email: signUpInput.email,
      userName: signUpInput.userName,
      password: signUpInput.password,
    });

    return {
      code,
      message,
    };
  }
);

export const signOutUser = createAsyncThunk("user/signOut", async () => {
  const {
    data: { code },
  } = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/signout`, {
    withCredentials: true,
  });

  return code;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch user
      .addCase(fetchUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;

        if (state.user.userId) state.isFetching = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.error = true;
        state.user = initialState.user;
      })

      // Sign in user
      .addCase(signInUser.pending, (state) => {
        state.isSignIn = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        if (action.payload.code === "success") {
          state.isSignIn = false;
        }
      })
      .addCase(signInUser.rejected, (state) => {
        state.error = true;
      })

      // Sign up user
      .addCase(signUpUser.pending, (state) => {
        state.isSignUp = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        if (action.payload.code === "success") {
          state.isSignUp = false;
        }
      })
      .addCase(signUpUser.rejected, (state) => {
        state.error = true;
      })

      // Sign out user
      .addCase(signOutUser.pending, (state) => {
        state.isSignOut = true;
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        if (action.payload === "success") {
          state.user = initialState.user;
          state.isSignOut = false;
        }
      })
      .addCase(signOutUser.rejected, (state) => {
        state.error = true;
      });
  },
});

export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
