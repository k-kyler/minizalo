import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FriendType } from "../typings/FriendType";
import axios from "axios";
import { RootState } from "./store";

interface FriendsState {
  friends: FriendType[];
  isFetching: boolean;
  isSearching: boolean;
  searchKeyword: string;
  searchResults: FriendType[];
  error: boolean;
}

interface AddFriendData {
  friendId: string;
  userRefId: string;
}

const initialState: FriendsState = {
  friends: [],
  isFetching: false,
  isSearching: false,
  searchKeyword: "",
  searchResults: [],
  error: false,
};

export const searchForFriends = createAsyncThunk(
  "friends/search",
  async (keyword: string) => {
    const {
      data: { code, results },
    } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/friend/search`,
      {
        keyword,
      },
      {
        withCredentials: true,
      }
    );

    return {
      code,
      results,
    };
  }
);

export const fetchFriendsList = createAsyncThunk(
  "friends/fetchFriendsList",
  async () => {
    const {
      data: { friends },
    } = await axios.get(`${import.meta.env.VITE_API_URL}/api/friend`, {
      withCredentials: true,
    });

    return friends;
  }
);

export const addFriend = createAsyncThunk(
  "friends/add",
  async (addFriendData: AddFriendData) => {
    const {
      data: { code, message },
    } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/friend/add`,
      addFriendData,
      {
        withCredentials: true,
      }
    );

    return {
      code,
      message,
    };
  }
);

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Search for friends
      .addCase(searchForFriends.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(searchForFriends.fulfilled, (state, action) => {
        if (action.payload.code === "success") {
          state.searchResults = action.payload.results;
          state.isSearching = false;
        }
      })
      .addCase(searchForFriends.rejected, (state) => {
        state.error = true;
      })

      // Fetch friends list
      .addCase(fetchFriendsList.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(
        fetchFriendsList.fulfilled,
        (state, action: PayloadAction<FriendType[]>) => {
          state.friends = action.payload;
          state.isFetching = false;
        }
      )
      .addCase(fetchFriendsList.rejected, (state) => {
        state.error = true;
      });
  },
});

export const selectedFriends = (state: RootState) => state.friends;
export default friendsSlice.reducer;
