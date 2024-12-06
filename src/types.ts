////////////////////////////////////////
// SORTED BY COMPONENTS
///////////////////////////////////////

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
interface Column {
  name: string;
  id: string;
}

export interface Board {
  columns: Column[];
  id: string;
  isActive: boolean;
  name: string;
}

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
  isComplited: boolean;
  id: string;
}

// ELIPSIS MENU

export interface ElipsisMenuProps {
  type: string;
  setOpenEditModal: () => void;
  setOpenDeleteModal: () => void;
}
