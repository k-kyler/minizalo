import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { FriendType } from "@typings/friend.type";
import { UserType } from "@typings/user.type";
import { RootState } from "./store";

interface FriendsState {
  friends: FriendType[];
  isFetching: boolean;
  isSearching: boolean;
  sendingFriendRequest: boolean;
  searchKeyword: string;
  searchResults: UserType[];
  error: boolean;
}

interface AddFriendData {
  friendId: string;
  userRefId: string;
}

interface RemoveSearchResult {
  userId: string;
}

const initialState: FriendsState = {
  friends: [],
  isFetching: false,
  isSearching: false,
  sendingFriendRequest: true,
  searchKeyword: "",
  searchResults: [],
  error: false,
};

export const searchForFriends = createAsyncThunk(
  "friends/search",
  async (searchKeyword: string) => {
    const {
      data: { code, results },
    } = await axios.post(
      `${
        import.meta.env.VITE_API_URL
      }/api/friend/search?keyword=${searchKeyword}`,
      {},
      {
        withCredentials: true,
      }
    );

    return {
      code,
      results,
      searchKeyword,
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
  reducers: {
    removeSearchResult: (state, action: PayloadAction<RemoveSearchResult>) => {
      const { userId } = action.payload;
      const existingResult = state.searchResults.find(
        (result) => result.userId === userId
      );

      if (existingResult) {
        state.searchResults = state.searchResults.filter(
          (result) => result.userId !== userId
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Search for friends
      .addCase(searchForFriends.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(searchForFriends.fulfilled, (state, action) => {
        if (action.payload.code === "success") {
          state.searchKeyword = action.payload.searchKeyword;
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
      })

      // Add friend
      .addCase(addFriend.pending, (state) => {
        state.sendingFriendRequest = true;
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        if (action.payload.code === "success") {
          state.sendingFriendRequest = false;
        }
      })
      .addCase(addFriend.rejected, (state) => {
        state.error = true;
      });
  },
});

export const { removeSearchResult } = friendsSlice.actions;
export const selectFriends = (state: RootState) => state.friends;
export default friendsSlice.reducer;
