import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Board } from "./types";
import boardsSlice from "./redux/boardsSlice";
import Header from "./components/Header";
import Center from "./components/Center";
import EmptyBoard from "./components/EmptyBoard";

function App() {
  const dispatch = useDispatch();
  const [boardModalOpen, setBoardModalOpen] = useState(false);

  const boards = useSelector((state: { boards: Board[] }) => state.boards);
  const activeBoard = boards.find((board: Board) => board.isActive);

  if (!activeBoard && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));

  return (
    <div className="overflow-hidden overflow-x-scroll scrollbar-hide">
      <>
        {boards.length > 0 ? (
          <>
            <Header
              boardModalOpen={boardModalOpen}
              setBoardModalOpen={setBoardModalOpen}
            />
            <Center
              boardModalOpen={boardModalOpen}
              setBoardModalOpen={setBoardModalOpen}
            />
          </>
        ) : (
          <>
            <EmptyBoard type="add" />
          </>
        )}
      </>
    </div>
  );
}

export default App;
