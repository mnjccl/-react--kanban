import { useDispatch, useSelector } from "react-redux";

import { Board } from "../types";
import boardsSlice from "../redux/boardsSlice";

function Subtask({
  index,
  taskIndex,
  colIndex,
}: {
  index: number;
  taskIndex: number;
  colIndex: number;
}) {
  const dispatch = useDispatch();
  const boards = useSelector((state: { boards: Board[] }) => state.boards);
  const board = boards.find((board: Board) => board.isActive === true);
  const columns = board?.columns;
  const col = columns?.find((_, i) => i === colIndex);
  const task = col?.tasks.find((_, i) => i === taskIndex);
  const subtask = task?.subtasks.find((_, i) => i === index);
  const checked = subtask?.isCompleted;

  const handleOnChange = () => {
    dispatch(
      boardsSlice.actions.setSubtaskCompleted({ index, taskIndex, colIndex })
    );
  };

  return (
    <div className="w-full flex hover:bg-[#635fc740] dark:hover:bg-[#635fc740] rounded-md relative items-center justify-start dark:bg-[#20212c] p-3 gap-4 bg-[#f4f7fd]">
      <input
        type="checkbox"
        className="w-4 h-4 accent-[#635fc7] cursor-pointer"
        checked={checked}
        onChange={handleOnChange}
      />
      <p className={`${checked ? "line-through opacity-30" : ""}`}>
        {subtask?.title}
      </p>
    </div>
  );
}

export default Subtask;
