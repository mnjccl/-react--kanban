import { useSelector } from "react-redux";
import { useState } from "react";

import { Board, Subtask } from "../types";
import TaskModal from "../modals/TaskModal";

function Task({
  taskIndex,
  colIndex,
}: {
  taskIndex: number;
  colIndex: number;
}) {
  const boards = useSelector((state: { boards: Board[] }) => state.boards);
  const board = boards.find((board: Board) => board.isActive === true);
  const col = board?.columns.find((_, i) => i === colIndex);
  const task = col?.tasks.find((_, i) => i === taskIndex);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  if (!task) return null;

  const { subtasks } = task;
  const completed = subtasks.reduce(
    (count: number, subtask: Subtask) => count + (subtask.isCompleted ? 1 : 0),
    0
  );

  return (
    <div>
      <div
        onClick={() => setIsTaskModalOpen(true)}
        className="w-[280px] first:my-5 rounded-lg bg-white dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-poineter"
      >
        <p className="font-bold tracking-wide">{task.title}</p>
        <p className="font-bold text-xs tracking-tighter mt-2 text-gray-500">
          {completed} of {subtasks.length} completed tasks
        </p>
      </div>
      {isTaskModalOpen && <TaskModal />}
    </div>
  );
}

export default Task;
