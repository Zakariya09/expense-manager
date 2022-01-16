import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth-slice";

const headersData = [
  {
    label: "Manage Expense",
    href: "/manageExpense",
  },
  {
    label: "Halal Check",
    href: "/halalCheck",
  },
  {
    label: "Logout",
    href: "/logout",
  },
];

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#400CCC",
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
}));

export default function Header() {
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();
  let history = useHistory();
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
    isLoggedIn: false,
  });
  const dispatch = useDispatch();
  const userObj = useSelector((state) => state.auth.userObj);

  useEffect(async () => {
    await setState((prevState) => ({
      ...prevState,
      isLoggedIn: Object.keys(userObj).length !== 0,
    }));
  }, [userObj]);
  const { mobileView, drawerOpen, isLoggedIn } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      console.log("window.innerWidth");
      console.log(window.innerWidth);
      return window.innerWidth < 700
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {femmecubatorLogo}
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div>{femmecubatorLogo}</div>
      </Toolbar>
    );
  };
  const logoutApp = (data) => {
    console.log("data");
    console.log(data);
    if (data === "Logout") {
      localStorage.clear("userObj");
      dispatch(logout());
      history.push("/login");
    } else if (data !== undefined) {
      history.push(`/${data.toLowerCase().replace(/\s/g, "-")}`);
    }
  };
  const getDrawerChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <div
          {...{
            component: RouterLink,
            to: href,
            color: "inherit",
            style: { textDecoration: "none" },
            key: label,
          }}
        >
          {Object.keys(userObj).length !== 0 ? (
            <MenuItem onClick={() => logoutApp(label)}>{label}</MenuItem>
          ) : null}
        </div>
      );
    });
  };

  const femmecubatorLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      Halal Check
    </Typography>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return Object.keys(userObj).length !== 0 ? (
        <Button
          {...{
            key: label,
            color: "inherit",
            className: menuButton,
          }}
          onClick={() => logoutApp(label)}
        >
          {label}
        </Button>
      ) : null;
    });
  };

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
