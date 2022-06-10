import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  isAuthenticated: boolean;
  user?: any;
  sessionHasBeenFetched: boolean;
};

const keyName = 'AUTHENITCATION';

export const initialState: AuthState = {
  isAuthenticated: false,
  sessionHasBeenFetched: false,
  user: null,
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
        user: action.payload,
      };
      const { sessionHasBeenFetched, ...toStore } = authState;
      window.localStorage.setItem(keyName, JSON.stringify(toStore));
      return authState;
    },
    logout: (state) => {
      window.localStorage.removeItem(keyName);
      return {
        ...state,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
        user: null,
      };
    },
    getSession: (state) => {
      console.log('getting seestion');
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return {
          ...state,
          ...JSON.parse(value),
          sessionHasBeenFetched: true,
        };
      } else
        return {
          ...initialState,
          sessionHasBeenFetched: true,
        };
    },
  },
});

export const { login, logout, getSession } = authenticationSlice.actions;
export default authenticationSlice.reducer;
