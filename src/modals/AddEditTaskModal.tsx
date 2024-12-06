import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { AddEditTaskModalProps, Board, Subtask } from "../types";
import boardsSlice from "../redux/boardsSlice";

import crossIcon from "../assets/icon-cross.svg";

function AddEditTaskModal({
  type,
  device,
  taskIndex,
  setOpenAddEditTask,
  prevColIndex = 0,
}: AddEditTaskModalProps) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [, setIsValid] = useState(true);
  const [subtasks, setSubtasks] = useState<Subtask[]>([
    {
      title: "",
      isComplited: false,
      id: uuidv4(),
    },
  ]);

  const boards = useSelector((state: { boards: Board[] }) => state.boards);
  const board = boards.find((board: Board) => board.isActive);
  const columns = board?.columns;
  const col = columns?.find((col, index) => index === prevColIndex);
  const [status, setStatus] = useState(
    columns && columns[prevColIndex] ? columns[prevColIndex].name : ""
  );
  const [newColIndex, setNewColIndex] = useState(prevColIndex);

  const onDelete = (id: string) => {
    setSubtasks((prev) => prev.filter((el) => el.id !== id));
  };

  const onChange = (id: string, newValue: string): void => {
    setSubtasks((prev) => {
      const newState = [...prev];
      const subtask = newState.find((subtask) => subtask.id === id);
      if (subtask) subtask.title = newValue;
      return newState;
    });
  };

  const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onSubmit = (type: string) => {
    if (type === "add")
      dispatch(
        boardsSlice.actions.addTask({
          title,
          desc,
          subtasks,
          status,
          newColIndex,
        })
      );
    else
      dispatch(
        boardsSlice.actions.editTask({
          title,
          desc,
          subtasks,
          status,
          taskIndex,
          newColIndex,
        })
      );
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) return false;

    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setOpenAddEditTask(false);
      }}
      className={
        device === "mobile"
          ? "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080]"
          : "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-0 top-0 bg-[#00000080]"
      }
    >
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <h3 className="text-lg">{type === "edit" ? "Edit" : "Add New"} Task</h3>

        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Task Name
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-black bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] ring-0"
            placeholder="e.g Take coffee break"
          />
        </div>

        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Description
          </label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="text-black bg-transparent px-4 py-2 outline-none focus:border-0 min-h-[100px] rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] ring-0"
            placeholder="e.g It's always good to take a break. This 15 minute break will recharge the batteries a little."
          />
        </div>

        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Subtasks
          </label>
          {subtasks.map((subtask, index) => {
            return (
              <div key={index} className="flex items-center w-full">
                <input
                  onChange={(e) => {
                    onChange(subtask.id, e.target.value);
                  }}
                  type="text"
                  value={subtask.title}
                  className="bg-transparent outline-none focus:border-0 border flex-grow px-4 py-2 rounded-md text-sm border-gray-600 focus:outline-[#635fc7]"
                  placeholder="e.g Take coffee break"
                />
                <img
                  onClick={() => {
                    onDelete(subtask.id);
                  }}
                  src={crossIcon}
                  className="m-4 cursor-pointer"
                />
              </div>
            );
          })}

          <button
            onClick={() => {
              setSubtasks((state) => [
                ...state,
                {
                  title: "",
                  isComplited: false,
                  id: uuidv4(),
                },
              ]);
            }}
            className="w-full items-center dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] py-2 rounded-full"
          >
            + Add New Subtask
          </button>
        </div>

        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            value={status}
            onChange={(e) => onChangeStatus(e)}
            className="select-status flex felx-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {columns?.map((column, index) => (
              <option value={column.name} key={index}>
                {column.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
                setOpenAddEditTask(false);
              }
            }}
            className="w-full items-center text-white bg-[#635fc7] py-2 rounded-full"
          >
            {type === "edit" ? "Save Edit" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditTaskModal;
