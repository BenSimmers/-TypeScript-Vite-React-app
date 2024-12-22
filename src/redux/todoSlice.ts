import { createSlice, createAsyncThunk, createEntityAdapter, SerializedError } from '@reduxjs/toolkit';
import { RootState } from './store';
import { StatusEnum } from './common/statusEnum';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoState {
  status: StatusEnum;
  error: SerializedError | null;
}

const todosAdapter = createEntityAdapter<Todo>({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const fetchTodos = createAsyncThunk<Todo[], void>('todos/fetchTodos', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch todos: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Initial State
const initialState = todosAdapter.getInitialState<TodoState>({
  status: StatusEnum.Idle,
  error: null,
});

// Slice
export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: todosAdapter.addOne,
    updateTodo: todosAdapter.updateOne,
    removeTodo: todosAdapter.removeOne,
    resetFetchStatus: (state) => {
      state.status = StatusEnum.Idle;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = StatusEnum.Loading;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = StatusEnum.Succeeded;
        todosAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = StatusEnum.Failed;
        state.error = action.payload as SerializedError | null;
      });
  },
});

// Actions
export const { addTodo, updateTodo, removeTodo, resetFetchStatus } = todoSlice.actions;

// Selectors
export const {
  selectAll: selectTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds,
} = todosAdapter.getSelectors((state: RootState) => state.todos);

export const selectStatus = (state: RootState): StatusEnum => state.todos.status;
export const selectError = (state: RootState): SerializedError | null => state.todos.error;

// Export Reducer
export default todoSlice.reducer;
