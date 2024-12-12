import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Column({ colIndex }: { colIndex: number }) {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sky-500",
  ];
  const [color, setColor] = useState("");

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const col = board;
  return <div>Column</div>;
}

export default Column;
