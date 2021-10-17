
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography ,Button} from '@material-ui/core';
import { useHistory , Link} from 'react-router-dom';

import { useStyles } from './styles';

import Logo from "../../logo.svg";

const headercontent= [
        {
          label: "Listings",
          href: "/listings",
        },
        {
          label: "Mentors",
          href: "/mentors",
        },
        {
          label: "My Account",
          href: "/account",
        },
        {
          label: "Log Out",
          href: "/logout",
        },
];

const Header = () => {

    const { header, logo , toolbar, menuButton} = useStyles();

    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    }

    const getMenuButtons = () => {
        return headercontent.map(({ label, href }) => {
          return (
            <Button
              {...{
                key: label,
                color: "inherit",
                to: href,
                component: Link,
                className: menuButton
              }}
            >
              {label}
            </Button>
          );
        });
      };


    return(
    <div>
        <AppBar className={header}>
        <Toolbar className={toolbar}>
        <Typography variant="h6" component="h1" className={logo}>
        <img src={Logo} height="50" width="50"/> Certy Website 
        <div>{getMenuButtons()}</div>
        </Typography>
        </Toolbar>
        </AppBar>
    </div>
    )
}

export default Header;