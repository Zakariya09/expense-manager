import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
  Drawer,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth-slice";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import DonutSmallIcon from "@material-ui/icons/DonutSmall";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
const headersData = [
  {
    label: "Manage Expense",
    href: "/manageExpense",
    icon: <AccountBalanceWalletIcon />,
  },
  {
    label: "Manage Salary",
    href: "/manage-salary",
    icon: <MonetizationOnIcon />,
  },
  {
    label: "Halal Check",
    href: "/halalCheck",
    icon: <AssignmentTurnedInIcon />,
    active: true,
  },
  {
    label: "Manage Journal",
    href: "/manage-journal",
    icon: <MenuBookIcon />,
  },
  {
    label: "Manage Equity",
    href: "/manage-equity",
    icon: <DonutSmallIcon />,
  },
  {
    label: "Manage Holding",
    href: "/manage-holding",
    icon: <AssessmentIcon />,
  },
  {
    label: "Logout",
    href: "/logout",
    icon: <ExitToAppIcon />,
  },
];

const useStyles = makeStyles(() => ({
  header: {
    background: '#780206',
    background: '-webkit-linear-gradient(to left, #061161, #780206)',
    background: 'linear-gradient(to left, #780206, #061161)',

    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
    textTransform: "capitalize",
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
    padding: "5px 13px",
  },
  drawerCloseIcon: {
    display: "flex",
    justifyContent: "end",
  },
  alignLabel: {
    marginLeft: "12px",
  },
  activeLink: {
    textDecoration: "none",
    background: "#061161",
    color: "white",
    fontWeight: "bold",
    borderRadius: "5px",
    "&:hover": {
      background: "#5f3fb3",
    },
  },
  paper: {
    color: 'white',
    background: '#780206',
    background: '-webkit-linear-gradient(to left, #061161, #780206)',
    background: 'linear-gradient(to left, #780206, #060a29)',
  }
}));

export default function Header() {
  const {
    header,
    logo,
    menuButton,
    toolbar,
    drawerContainer,
    drawerCloseIcon,
    alignLabel,
    activeLink,
    paper
  } = useStyles();
  let navigate = useNavigate();
  const [state, setState] = useState({
    drawerOpen: false,
    isLoggedIn: false,
    pageTitle: "",
  });
  const dispatch = useDispatch();
  const userObj = useSelector((state) => state.auth.userObj);

  const isLoggedIn =
    localStorage.getItem("userObject") &&
    Object.keys(JSON.parse(localStorage.getItem("userObject"))).length !== 0;

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isLoggedIn: Object.keys(userObj).length !== 0,
    }));
  }, [userObj]);
  const { drawerOpen } = state;

  useEffect(() => {
    let url = window.location.href;
    let pageTitle = url.split("/").reverse()[0].replace("-", " ");
    setState((prevState) => ({
      ...prevState,
      pageTitle: pageTitle,
    }));
  }, [window.location.href]);

  const displayDrawer = () => {
    const handleDrawerOpen = () => {
      setState((prevState) => ({ ...prevState, drawerOpen: true }))
    };

    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return <React.Fragment>
      {localStorage.getItem("userObject") ? <Toolbar>
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
          classes={{
            paper: paper
          }}
        >
          <div className={drawerContainer}>
            <div onClick={handleDrawerClose} className={drawerCloseIcon}>
              <ChevronLeftIcon />
            </div>
            {getDrawerChoices()}
          </div>
        </Drawer>

        <div>{title}</div>
      </Toolbar>
        :
        null
      }
    </React.Fragment>
  };
  const logoutApp = (data, linkIndex) => {
    headersData.map((item, index) => {
      if (index === linkIndex) {
        item.active = true;
      } else {
        item.active = false;
      }
    });

    console.log(data)
    if (data === "Logout") {
      localStorage.clear("userObj");
      localStorage.clear("userObject");
      dispatch(logout());
      navigate("/login");
    } else if (data !== undefined) {
      navigate(`/${data.toLowerCase().replace(/\s/g, "-")}`);
    }
    setState((prevState) => ({ ...prevState, drawerOpen: false }));
  };
  const getDrawerChoices = () => {
    return headersData.map(({ label, icon, href, active }, index) => {
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
          {isLoggedIn ? (
            <MenuItem
              className={active ? activeLink : ""}
              onClick={() => logoutApp(label, index)}
            >
              {icon}
              <span className={alignLabel}> {label}</span>
            </MenuItem>
          ) : null}
        </div>
      );
    });
  };

  const title = (
    <Typography variant="h6" component="h1" className={logo}>
      {state.pageTitle}
    </Typography>
  );

  return (
    <header>
      <AppBar className={header}>{displayDrawer()}</AppBar>
    </header>
  );
}
