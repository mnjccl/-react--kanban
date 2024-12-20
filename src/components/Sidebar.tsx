import { useState } from "react";
import useDarkMode from "../hooks/useDarkMode";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";

import { Board, SidebarProps } from "../types";
import boardsSlice from "../redux/boardsSlice";

import boardIcon from "../assets/icon-board.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import AddEditBoardModal from "../modals/AddEditBoardModal";

function Sidebar({ setIsSidebarOpen, isSidebarOpen }: SidebarProps) {
  const dispatch = useDispatch();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked: boolean) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state: { boards: Board[] }) => state.boards);

  return (
    <div>
      <div
        className={
          isSidebarOpen
            ? "min-w-[261px] bg-white dark:bg-[#2b2c37] fixed top-[72px] h-screen items-center left-0 z-20"
            : "bg-[#635fc7] dark:bg-[#2b2c37] dark:hover:bg-[#635fc7] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer p-0 transition duration-300 transform fixed w-[#56px] h-[#48px] rounded-r-full"
        }
      >
        <div>
          {isSidebarOpen && (
            <div className="bg-white dark:bg-[#2b2c37] w-full py-4 rounded-xl">
              <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
                ALL BOARDS ({boards?.length})
              </h3>
              <div className="flex flex-col h-[70vh] justify-between">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={`flex items-baseline space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover-text-[#635fc7] dark:text-white ${
                        board.isActive &&
                        "bg-[#635fc7] rounded-r-full text-white mr-8"
                      }`}
                      key={index}
                      onClick={() => {
                        dispatch(boardsSlice.actions.setBoardActive({ index }));
                      }}
                    >
                      <img src={boardIcon} className="h-4" />
                      <p className="text-lg font-bold">{board.name}</p>
                    </div>
                  ))}
                  <div
                    onClick={() => setIsBoardModalOpen(true)}
                    className="flex items-baseline space-x-2 mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#635fc7] px-5 py-4 hover:bg-[#635fc71a] hover-text-[#635fc7] dark:hover:bg-white"
                  >
                    <img src={boardIcon} className="h-4" />
                    <p className="text-lg font-bold">Create New Board</p>
                  </div>
                </div>

                <div className="mx-2 p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
                  <img src={lightIcon} />
                  <Switch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    className={`${
                      darkSide ? "bg-[#635fc7]" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        darkSide ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                  <img src={darkIcon} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isBoardModalOpen && (
        <AddEditBoardModal type="add" setBoardModalOpen={setIsBoardModalOpen} />
      )}
    </div>
  );
}

export default Sidebar;
