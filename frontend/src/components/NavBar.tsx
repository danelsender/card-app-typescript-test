import { NavLink } from "react-router-dom";

import SettingsIcon from "@mui/icons-material/Settings";
import { Switch } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import React, { useState } from "react";

import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NavBar() {
  //   const [toggleDarkMode, setToggleDarkMode] = useState(false);

  //   const toggleDarkTheme = () => {
  //     document.documentElement.classList.toggle("dark");
  //     setToggleDarkMode(!toggleDarkMode);
  //   };

  //   const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  return (
    <nav className="flex justify-between items-center p-4">
      <div className="navbar-left">
        <Settings />
      </div>
      <div className="navbar-center">
        <NavLink
          className="m-3 p-4 text-xl bg-blue-400 dark:bg-green-800 hover:bg-blue-500 dark:hover:bg-green-600 rounded-md font-medium text-white"
          to={"/"}
        >
          All Entries
        </NavLink>
        <NavLink
          className="m-3 p-4 text-xl bg-blue-400 dark:bg-green-800 hover:bg-blue-500 dark:hover:bg-green-600 rounded-md font-medium text-white"
          to={"/create"}
        >
          New Entry
        </NavLink>
      </div>
      <div className="navbar-right"></div>
    </nav>
  );
}

export function Settings() {
  const [toggleDarkMode, setToggleDarkMode] = useState(false);

  const toggleDarkTheme = () => {
    document.documentElement.classList.toggle("dark");
    setToggleDarkMode(!toggleDarkMode);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className="m-3 p-4" onClick={handleClickOpen}>
        <SettingsIcon />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Settings"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Dark Mode <Switch onChange={toggleDarkTheme} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
