import { createSlice } from "@reduxjs/toolkit";
import data from "../data/data.json";

const boardsSlice = createSlice({
  name: "boards",
  initialState: data.boards,
  reducers: {
    addBoard: (state, action) => {
      const isActive = state.length > 0 ? false : true;
      const payload = action.payload;
      const board = {
        name: payload.name,
        isActive,
        columns: [],
      };
      board.columns = payload.newColumns;
      state.push(board);
    },
    editBoard: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      if (board) {
        board.name = payload.name;
        board.columns = payload.newColumns;
      }
    },
    deleteBoard: (state) => {
      const board = state.find((board) => board.isActive);
      if (board) state.splice(state.indexOf(board), 1);
    },
    setBoardActive: (state, action) => {
      state.forEach((board, index) => {
        board.isActive = index === action.payload.index;
      });
    },
    addTask: (state, action) => {
      const { title, status, description, subtasks, newColIndex } =
        action.payload;
      const task = { title, description, subtasks, status };
      const board = state.find((board) => board.isActive);
      const column = board?.columns.find((_, index) => index === newColIndex);
      column?.tasks.push(task);
    },
    editTask: (state, action) => {
      const {
        title,
        status,
        description,
        subtasks,
        prevColIndex,
        newColIndex,
        taskIndex,
      } = action.payload;
      const board = state.find((board) => board.isActive);
      const column = board?.columns.find((_, index) => index === prevColIndex);
      if (!column) return;

      const task = column?.tasks.find((_, index) => index === taskIndex);
      if (!task) return;
      task.title = title;
      task.status = status;
      task.description = description;
      task.subtasks = subtasks;

      if (prevColIndex === newColIndex) return;
      column.tasks = column?.tasks.filter((_, index) => index !== taskIndex);
      const newCol = board?.columns.find((_, index) => index === newColIndex);
      newCol?.tasks.push(task);
    },
    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const board = state.find((board) => board.isActive);
      const prevCol = board?.columns.find((_, i) => i === prevColIndex);
      const task = prevCol?.tasks.splice(taskIndex, 1)[0];
      if (task) board?.columns.find((_, i) => i === colIndex)?.tasks.push(task);
    },
    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      if (!board) return;
      const col = board.columns.find((_, i) => i === payload.colIndex);
      if (!col) return;
      const task = col.tasks.find((_, i) => i === payload.taskIndex);
      if (!task) return;
      const subtask = task.subtasks.find((_, i) => i === payload.index);
      if (!subtask) return;
      subtask.isCompleted = !subtask.isCompleted;
    },
    setTaskStatus: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      if (!board) return;
      const columns = board.columns;
      const col = columns.find((_, i) => i === payload.colIndex);
      if (!col) return;
      if (payload.colIndex === payload.newColIndex) return;
      const task = col.tasks.find((_, i) => i === payload.taskIndex);
      if (!task) return;
      task.status = payload.status;
      col.tasks = col.tasks.filter((_, i) => i !== payload.taskIndex);
      const newCol = columns.find((_, i) => i === payload.newColIndex);
      if (!newCol) return;
      newCol.tasks.push(task);
    },
    deleteTask: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      if (!board) return;
      const col = board.columns.find((_, i) => i === payload.colIndex);
      if (!col) return;
      col.tasks = col.tasks.filter((_, i) => i !== payload.taskIndex);
    },
  },
});

export default boardsSlice;
