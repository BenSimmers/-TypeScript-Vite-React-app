import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { todoSlice } from './todoSlice';
import { counterSlice } from './counterSlice';

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    counter: counterSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
