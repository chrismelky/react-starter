import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../utils/utils';

type AuthState = {
  isAuthenticated: boolean;
  user?: any;
  sessionHasBeenFetched: boolean;
  menus: any;
};

export const initialState: AuthState = {
  isAuthenticated: false,
  sessionHasBeenFetched: false,
  user: null,
  menus: [],
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      const authState = {
        ...state,
        isAuthenticated: true,
        sessionHasBeenFetched: true,
        user: action?.payload?.user,
        menus: action?.payload?.menus,
      };
      window.localStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify(action?.payload?.user),
      );
      window.localStorage.setItem(
        TOKEN_STORAGE_KEY,
        action?.payload?.access_token,
      );
      return authState;
    },
    logout: (state) => {
      window.localStorage.removeItem(USER_STORAGE_KEY);
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
      return {
        ...state,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
        user: null,
      };
    },
    getSession: (state) => {
      const value = window.localStorage.getItem(USER_STORAGE_KEY);
      if (value) {
        return {
          ...initialState,
          user: JSON.parse(value),
          isAuthenticated: true,
          sessionHasBeenFetched: true,
        };
      } else
        return {
          ...initialState,
          isAuthenticated: false,
          sessionHasBeenFetched: true,
        };
    },
  },
});

export const { login, logout, getSession } = authenticationSlice.actions;
export default authenticationSlice.reducer;
