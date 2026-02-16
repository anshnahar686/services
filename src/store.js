import { configureStore, createSlice } from "@reduxjs/toolkit";

// Create a slice (a reducer + actions)
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; }
  }
});

// Export actions
export const { increment, decrement } = counterSlice.actions;
// Create store
const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});

export default store;
