import { createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = () => {
  try {
    const serializedUser = localStorage.getItem("user");
    const serializedLoginTime = localStorage.getItem("loginTime");

    if (serializedUser == null) return { user: null, loginTime: null };

    const user = JSON.parse(serializedUser);
    const loginTime = serializedLoginTime
      ? parseInt(serializedLoginTime)
      : null;

    return { user, loginTime };
  } catch (error) {
    console.log(error);
    return { user: null, loginTime: null };
  }
};

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.loginTime = new Date().getTime();
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("loginTime", state.loginTime.toString());
    },
    logout: (state) => {
      state.user = null;
      state.loginTime = null;
      localStorage.removeItem("user");
      localStorage.removeItem("loginTime");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
