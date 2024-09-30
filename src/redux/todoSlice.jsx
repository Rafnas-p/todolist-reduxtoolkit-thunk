import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state for the todos
const initialState = {
  todos: [],
  status: 'idle',
  error: null,
};

// Thunk to fetch dummy todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        { id: 1, text: 'Learn Redux' },
        { id: 2, text: 'Practice React' },
        { id: 3, text: 'Build a project' }
      ]);
    }, 5000)
  );
  return response;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Add new todo
    addTodo: (state, action) => {
      state.todos.push({ id: Date.now(), text: action.payload });
    },
    // Delete todo
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
