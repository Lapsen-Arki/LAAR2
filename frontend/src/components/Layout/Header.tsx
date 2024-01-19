import * as React from 'react';
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
				<AppBar position='fixed' sx={{ width: '100%' }}>
					<Toolbar>
						<Typography
							variant='h6'
							component={Link}
							to='/'
							sx={{ flexGrow: 1, textDecoration: 'none' }}
						>
							LAAR
						</Typography>
						<IconButton
							size='large'
							edge='start'
							color='inherit'
							aria-label='menu'
							onClick={handleMenu}
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
						{auth ? (
							<div>
								<Menu
									id='menu-appbar'
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right'
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right'
									}}
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<MenuItem onClick={handleClose}>Kauppa</MenuItem>
								</Menu>
								<IconButton
									size='large'
									component={Link}
									to='/profile'
									color='inherit'
								>
									<AccountCircle />
								</IconButton>
							</div>
						) : (
							<IconButton
								size='large'
								component={Link}
								to='/login'
								color='inherit'
							>
								<LoginIcon />
							</IconButton>
						)}
					</Toolbar>
				</AppBar>
			</Box>
		</header>
	);
}
