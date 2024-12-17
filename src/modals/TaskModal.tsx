import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { Board, Subtask, TaskModalProps } from "../types";

import elipsis from "../assets/icon-vertical-ellipsis.svg";
import ElipsisMenu from "../components/ElipsisMenu";

function TaskModal({
  colIndex,
  taskIndex,
  setIsTaskModalOpen,
}: TaskModalProps) {
  const [elipsisMenuOpen, setElipsisMenuOpen] = useState(false);

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

  const setOpenEditModal = () => {};
  const setOpenDeleteModal = () => {};

  if (!task) return null;
  const { subtasks } = task;
  const completed = subtasks.reduce(
    (count: number, subtask: Subtask) => count + (subtask.isCompleted ? 1 : 0),
    0
  );

  return (
    <div className="fixed right-0 left-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 bottom-0 justify-center items-center flex bg-[#00000080]">
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
      </div>
    </div>
  );
}

export default TaskModal;
