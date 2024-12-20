import { DragEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shuffle } from "lodash";

import { Board } from "../types";
import Task from "./Task";
import boardsSlice from "../redux/boardsSlice";

function Column({ colIndex }: { colIndex: number }) {
  const colors = useMemo(
    () => [
      "bg-red-500",
      "bg-orange-500",
      "bg-blue-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-indigo-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-sky-500",
    ],
    []
  );
  const [color, setColor] = useState("");

  const dispatch = useDispatch();
  const boards = useSelector((state: { boards: Board[] }) => state.boards);
  const board = boards.find((board: Board) => board.isActive);
  const columns = board?.columns;
  const col = columns?.find((_, index) => index === colIndex);

  useEffect(() => {
    const shuffledColor = shuffle(colors).pop() || "";
    setColor(shuffledColor);
  }, [dispatch, colors]);

  const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );
    if (colIndex !== prevColIndex)
      dispatch(
        boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
      );
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="scrollbar-hide mx-5 pt-[90px] min-w-[280px]"
    >
      <div className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
        <div className={`rounded-full w-4 h-4 ${color}`} /> {col?.name}{" "}
        {col?.tasks.length}
      </div>
      {col?.tasks.map((_, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}

export default Column;
