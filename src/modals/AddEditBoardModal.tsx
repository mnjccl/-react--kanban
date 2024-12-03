import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";

import { AddEditBoardModalProps } from "../types";
import boardsSlice from "../redux/boardsSlice";

import crossIcon from "../assets/icon-cross.svg";

function AddEditBoardModal({
  setBoardModalOpen,
  type,
}: AddEditBoardModalProps) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [, setIsValid] = useState(true);
  const [newColumns, setNewColumns] = useState([
    {
      name: "Todo",
      task: [],
      id: uuidv4(),
    },
    {
      name: "Doing",
      task: [],
      id: uuidv4(),
    },
  ]);

  const onChange = (id: string, newValue: string): void => {
    setNewColumns((prev) => {
      const newState = [...prev];
      const column = newState.find((col) => col.id === id);
      if (column) column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id: string) => {
    setNewColumns((prev) => prev.filter((el) => el.id !== id));
  };

  const onSubmit = (type: string) => {
    setBoardModalOpen(false);
    if (type === "add") {
      dispatch(boardsSlice.actions.addBoard({ name, newColumns }));
    } else {
      dispatch(boardsSlice.actions.editBoard({ name, newColumns }));
    }
  };

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) return false;

    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  return (
    <div
      className="fixed scrollbar-hide right-0 left-0 top-0 bottom-0 px-2 py-4 overflow-scroll z-50 justify-center items-center flex bg-[#00000080]"
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setBoardModalOpen(false);
      }}
    >
      <div className="scrollbar-hide overflox-y-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <h3 className="text-lg">
          {type === "edit" ? "Edit" : "Add new"} Board
        </h3>

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">Board</label>
          <input
            className="bg-transparent px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#635fc7] outline-1 ring-0"
            placeholder="e.g Web Development"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Board Columns
          </label>
          {newColumns.map((column, index) => (
            <div className="flex items-center w-full" key={index}>
              <input
                className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#735fc7]"
                onChange={(e) => {
                  onChange(column.id, e.target.value);
                }}
                value={column.name}
                type="text"
              />
              <img
                src={crossIcon}
                className="cursor-pointer m-4"
                onClick={() => onDelete(column.id)}
              />
            </div>
          ))}
        </div>

        <div>
          <button
            className="w-full items-center hover:opacity-75 dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] py-2 mt-2 rounded-full"
            onClick={() => {
              setNewColumns((state) => [
                ...state,
                { name: "", task: [], id: uuidv4() },
              ]);
            }}
          >
            + Add New Column
          </button>

          <button
            className="w-full items-center hover:opacity-75 dark:text-white dark:bg-[#635fc7] mt-8 relative text-white bg-[#635fc7] py-2 rounded-full"
            onClick={() => {
              const isValid = validate();
              if (isValid === true) onSubmit(type);
            }}
          >
            {type === "add" ? "Create New Board" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
