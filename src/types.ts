//HEADER DROPDOWN

export interface HeaderDropdownProps {
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Board {
  isActive: boolean;
  name: string;
}
