import * as React from 'react';
import { headingTheme } from './themeMUI';
import { Link } from 'react-router-dom';
import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	IconButton,
	MenuItem,
	Menu
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ThemeProvider } from '@mui/material/styles';

export default function Header() {
	const [auth] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	
	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<header>
			<Box sx={{ flexGrow: 1 }}>
				<ThemeProvider theme={headingTheme}>
					<AppBar position='fixed' sx={{ width: '100%' }}>
						<Toolbar>
							<Typography variant='h6' component={Link} to='/' sx={{ flexGrow: 1, textDecoration: 'none' }}>
								LAAR
							</Typography>
							<Box sx={{ display: { xs: 'block', md: 'none' } }}>
								<IconButton size='large' edge='start' color='inherit' aria-label='menu' onClick={handleMenu} sx={{ mr: 2 }}>
									<MenuIcon />
								</IconButton>
								<Menu id='menu-appbar' anchorEl={anchorEl} anchorOrigin={{vertical: 'top', horizontal: 'right',}} keepMounted transformOrigin={{vertical: 'top', horizontal: 'right',}} open={Boolean(anchorEl)} onClose={handleClose}>
									<MenuItem>
										<Typography variant='h6'component={Link} to='/' sx={{ flexGrow: 1, textDecoration: 'none', fontWeight: 'normal', color: 'black' }}>
											Kauppa
										</Typography>
									</MenuItem>
								</Menu>
							</Box>

							<Box sx={{ display: { xs: 'none', md: 'block' } }}>
								<Typography variant='h6'component={Link} to='/' sx={{ flexGrow: 1, textDecoration: 'none', fontWeight: 'normal' }}>
									Kauppa
								</Typography>
							</Box>

							{auth ? (
								<div>
									<IconButton size='large' component={Link} to='/profile' color='inherit'>
										<AccountCircle />
									</IconButton>
								</div>
							) : (
								<div>
									<IconButton size='large' component={Link} to='/login' color='inherit'>
										<LoginIcon />
									</IconButton>
								</div>
							)}
						</Toolbar>
					</AppBar>
				</ThemeProvider>
			</Box>
		</header>
	);
}
