import { useState } from "react";
import { useSelector } from "react-redux";

import { BoardsProps, HeaderProps } from "../types";
import HeaderDropdown from "./HeaderDropdown";
import AddEditBoardModal from "../modals/AddEditBoardModal";

import logo from "../assets/logo-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import ElipsisMenu from "./ElipsisMenu";

function Header({ boardModalOpen, setBoardModalOpen }: HeaderProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [, setIsDeleteModalOpen] = useState(false);
  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [isElipsisOpen, setIsElipsisOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const boards = useSelector((state: BoardsProps) => state.boards);
  const board = boards.find((board) => board.isActive);

  const setOpenEditModal = () => {
    setBoardModalOpen(true);
    setIsElipsisOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisOpen(false);
  };

  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      <header className="flex justify-between dark:text-white items-center">
        <div className="flex items-center space-x-2 md:space-x-4">
          <img src={logo} alt="logo" className="h-6 w-6" />
          <h3 className="hidden md:inline-block font-bold font-sans md:text-4xl">
            Kanban
          </h3>
          <div className="flex items-center">
            <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
              {board?.name}
            </h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt="dropdown icon"
              className="w-3 ml-2 md:hidden cursor-pointer"
              onClick={() => setOpenDropdown((state) => !state)}
            />
          </div>
        </div>

        <div className="flex space-x-4 items-center md:space-x-6">
          <button className="hidden md:block button">+ Add New Task</button>
          <button
            onClick={() => setOpenAddEditTask((state) => !state)}
            className="button py-1 px-3 md:hidden"
          >
            +
          </button>
          <img
            src={elipsis}
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false);
              setIsElipsisOpen((state) => !state);
            }}
            alt="elipsis"
            className="cursor-pointer h-6"
          />
          {isElipsisOpen && (
            <ElipsisMenu
              type="Boards"
              setOpenDeleteModal={setOpenDeleteModal}
              setOpenEditModal={setOpenEditModal}
            />
          )}
        </div>
      </header>

      {openDropdown && (
        <HeaderDropdown
          setBoardModalOpen={setBoardModalOpen}
          setOpenDropdown={setOpenDropdown}
        />
      )}

      {boardModalOpen && (
        <AddEditBoardModal
          type={boardType}
          setBoardModalOpen={setBoardModalOpen}
        />
      )}

      {openAddEditTask && (
        <AddEditTaskModal
          setOpenAddEditTask={setOpenAddEditTask}
          device="mobile"
          type="add"
        />
      )}
    </div>
  );
}

export default Header;
