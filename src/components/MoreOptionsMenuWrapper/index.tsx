import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { IconButton, Menu } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

export default function MoreOptionsMenuWrapper({ children }: any): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const uniqueCompId = nanoid();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id={`menu-button-${uniqueCompId}`}
        aria-controls={open ? `menu-${uniqueCompId}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id={`menu-${uniqueCompId}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": `menu-button-${uniqueCompId}`,
        }}
      >
        {children}
      </Menu>
    </>
  );
}
