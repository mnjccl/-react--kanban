////////////////////////////////////////
// SORTED BY COMPONENTS
///////////////////////////////////////

// ADD EDIT BOARD MODAL

export interface AddEditBoardModalProps {
  setBoardModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}

// ADD EDIT TASK MODAL

export interface AddEditTaskModalProps {
  type: string;
  device: string;
  setOpenAddEditTask: React.Dispatch<React.SetStateAction<boolean>>;
  prevColIndex?: number;
  taskIndex?: number;
}

export interface Subtask {
  title: string;
  isCompleted: boolean;
  id: string;
}

// DELETE MODAL

export interface DeleteModalProps {
  type: string;
  title: string | undefined;
  onDeleteBtnClick: () => void;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// TASK MODAL

export interface TaskModalProps {
  colIndex: number;
  taskIndex: number;
  setIsTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// HEADER

export interface HeaderProps {
  boardModalOpen: boolean;
  setBoardModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface BoardsProps {
  boards: Board[];
}

// HEADER DROPDOWN

export interface HeaderDropdownProps {
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setBoardModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Column {
  name: string;
  id: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  status: string;
  title: string;
  description?: string;
  subtasks: Subtask[];
}

export interface Board {
  columns: Column[];
  id: string;
  isActive: boolean;
  name: string;
}

// ELIPSIS MENU

export interface ElipsisMenuProps {
  type: string;
  setOpenEditModal: () => void;
  setOpenDeleteModal: () => void;
}

// CENTER

export interface CenterProps {
  boardModalOpen: boolean;
  setBoardModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
