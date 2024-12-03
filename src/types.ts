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

export interface Board {
  id: string;
  isActive: boolean;
  name: string;
}

// ADD EDIT BOARD MODAL

export interface AddEditBoardModalProps {
  setBoardModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}
