import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../reducers/authentication';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
