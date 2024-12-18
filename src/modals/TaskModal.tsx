import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { Board, Subtask as SubtaskType, TaskModalProps } from "../types";
import boardsSlice from "../redux/boardsSlice";
import DeleteModal from "./DeleteModal";
import AddEditTaskModal from "./AddEditTaskModal";
import ElipsisMenu from "../components/ElipsisMenu";
import Subtask from "../components/Subtask";

import elipsis from "../assets/icon-vertical-ellipsis.svg";

function TaskModal({
  colIndex,
  taskIndex,
  setIsTaskModalOpen,
}: TaskModalProps) {
  const [elipsisMenuOpen, setElipsisMenuOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [AddTaskModalOpen, setAddTaskModalOpen] = useState(false);

  const dispatch = useDispatch();
  const boards = useSelector((state: { boards: Board[] }) => state.boards);
  const board = boards.find((board: Board) => board.isActive === true);
  const columns = board?.columns || [];
  const col = columns[colIndex];
  const task = col?.tasks?.[taskIndex];

  const [status, setStatus] = useState(task?.status || "");
  const [newColIndex, setNewColIndex] = useState(
    columns.indexOf(col) !== -1 ? columns.indexOf(col) : 0
  );

  const setOpenEditModal = () => {
    setAddTaskModalOpen(true);
    setElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setElipsisMenuOpen(false);
    setDeleteModalOpen(true);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const handleOnClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    dispatch(
      boardsSlice.actions.setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      })
    );
  };

  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteTask({ taskIndex, colIndex }));
    setIsTaskModalOpen(false);
    setDeleteModalOpen(false);
  };

  if (!task) return null;
  const { subtasks } = task;
  const completed = subtasks.reduce(
    (count: number, subtask: SubtaskType) =>
      count + (subtask.isCompleted ? 1 : 0),
    0
  );

  return (
    <div
      className="fixed right-0 left-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 bottom-0 justify-center items-center flex bg-[#00000080]"
      onClick={handleOnClose}
    >
      <div className="scrollbar-hide overflow-y-scroll max-h-[95h] my-auto bg-white dark:bg-[2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <div className="relative flex justify-between w-full items-center">
          <h1 className="text-lg">{task.title}</h1>
          <img
            src={elipsis}
            className="cursor-pointer h-6"
            onClick={() => setElipsisMenuOpen((state) => !state)}
          />
          {elipsisMenuOpen && (
            <ElipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          )}
        </div>
        <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6">
          {task.description}
        </p>
        <p className="pt-6 text-gray-500 tracking-widest text-sm">
          Subtasks ({completed} of {subtasks.length})
        </p>
        <div className="mt-3 space-y-2">
          {subtasks.map((_, index) => (
            <Subtask
              index={index}
              taskIndex={taskIndex}
              colIndex={colIndex}
              key={index}
            />
          ))}
        </div>
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 focus:outline-[#635fc7] outline-none"
            value={status}
            onChange={handleOnChange}
          >
            {columns.map((column, index) => (
              <option className="status-option" key={index}>
                {column.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {deleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
          title={task.title}
          type="task"
        />
      )}

      {AddTaskModalOpen && (
        <AddEditTaskModal
          setOpenAddEditTask={setAddTaskModalOpen}
          type="edit"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}

export default TaskModal;
