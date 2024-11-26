import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../../init";

const INITIAL_STATE = {
  user: null,
  isLoggedIn: false,
  isLoading: false, // Add isLoading here
  error: null,
};

export const userRegister = createAsyncThunk(
  "user/register",
  async (user, thunkApi) => {
    try {
      const snapshot = await getDocs(collection(db, "Users"));
      const userExists = snapshot.docs.find(
        (doc) => doc.data().email === user.email
      );

      if (!userExists) {
        const newUser = {
          name: user.name,
          email: user.email,
          password: user.password,
          cart: [],
          order: [],
        };
        await addDoc(collection(db, "Users"), newUser);
        return {
          user: newUser,
          isLoggedIn: true, // Set isLoggedIn to true on successful registration
        };
      } else {
        return thunkApi.rejectWithValue(
          `User with email ${user.email} already exists`
        );
      }
    } catch (error) {
      return thunkApi.rejectWithValue(
        `Error in registering user. Please try again later.`
      );
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async (user, thunkApi) => {
    try {
      const snapshot = await getDocs(collection(db, "Users"));
      const userExists = snapshot.docs.find(
        (doc) =>
          doc.data().email === user.email &&
          doc.data().password === user.password
      );

      if (userExists) {
        return {
          user: { id: userExists.id, ...userExists.data() },
          isLoggedIn: true,
        };
      } else {
        return thunkApi.rejectWithValue("Invalid Credentials");
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = action.payload.isLoggedIn;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Directly set the error from payload
      })
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.user = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Directly set the error from payload
      });
  },
});

export const userLoginReducer = userSlice.reducer;
export const { login, logout } = userSlice.actions;
export const userLoginSelector = (state) => state.userLoginReducer;
