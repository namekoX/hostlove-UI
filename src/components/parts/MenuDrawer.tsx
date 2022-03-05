import React, { ReactElement, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

type Props = {
  children: ReactElement;
  isDisplay?: boolean;
};

const MenuDrawer = (props: Props) => {
  const { children, isDisplay = true } = props;
  const [open, setopen] = useState(false);
  const toggleOpen = () => {
    setopen(!open);
  };
  const body = <div className={"menu-drawer"}>{children}</div>;

  return isDisplay ? (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={toggleOpen}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleOpen}>
        {body}
      </Drawer>
    </>
  ) : (
    <></>
  );
};
export default MenuDrawer;
