
import React from 'react';
import { AppBar, Toolbar, Typography ,Button} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { useStyles } from './styles';
import Logo from "../../logo.svg";

const Header = () => {

	const { header, logo , toolbar, menuButton, headerChildren } = useStyles();

	const history = useHistory();

	return(
		<div>
			<AppBar className={header}>
			<Toolbar className={toolbar}>
			<Typography variant="h6" component="h1" className={logo} onClick={() => history.push('/')}>
				<img src={Logo} alt="logo" height="50" width="50"/> Certy
			</Typography>
			<div className={headerChildren}>
				<Button color="inherit" variant="text" className={menuButton} onClick={() => history.push('/home')}>Templates</Button>
				<Button color="inherit" variant="text" className={menuButton} onClick={() => history.push(`${history.location.pathname}#about`)}>About Us</Button>
			</div>
			</Toolbar>
			</AppBar>
		</div>
	)
}

export default Header;