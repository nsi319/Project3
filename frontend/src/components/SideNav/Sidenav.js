import React, {useState} from 'react';
import clsx from 'clsx';
import {useHistory, useLocation} from 'react-router-dom';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountBox from '@material-ui/icons/AccountBoxSharp';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {menuList} from './menuList';

const drawerWidth = 240;
const scrollButton = (theme, selected) => ({
	display: 'inline',
	fill: selected ? '#fff' : '#fff',
	width: 26,
	height: 26,
});

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		color: 'white',
		backgroundColor: '#333',
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		backgroundColor: '#212121',
		color: '#fff',
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
		backgroundColor: '#212121',
		color: '#fff',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	list: {
		paddingTop: 0,
	},
	ListItem: {
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: '#33363d',
		},
	},

	activeListItem: {
		cursor: 'pointer',
		fontWeight: 'bold',
		backgroundColor: '#00ACC1',
		color: '#fff',
		'&:hover': {
			backgroundColor: '#00ACC1',
		},
	},
	listItemText: {
		paddingLeft: '16px',
		color: '#fff',
	},
	activeListItemText: {
		paddingLeft: '16px',
		color: '#fff',
	},
	scrollButton: {
		...scrollButton(theme, false),
	},
	selectedScrollButton: {
		...scrollButton(theme, true),
	},
	welcome: {
		fontSize: '20px',
		fontWeight: '500',
		paddingLeft: '20px',
	},
}));

export function Sidenav() {
	const classes = useStyles();
	const theme = useTheme();
	const history = useHistory();
	const location = useLocation();
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const getIcon = (name, active) => {
		switch (name) {
			case 'DashboardIcon':
				return <DashboardIcon className={active ? classes.selectedScrollButton : classes.scrollButton} />;
			case 'AccountBox':
				return <AccountBox className={active ? classes.selectedScrollButton : classes.scrollButton} />;
			case 'SportsEsportsIcon':
				return <SportsEsportsIcon className={active ? classes.selectedScrollButton : classes.scrollButton} />;
			case 'SupervisorAccountIcon':
				return (
					<SupervisorAccountIcon className={active ? classes.selectedScrollButton : classes.scrollButton} />
				);
			case 'ExitToAppIcon':
				return <ExitToAppIcon className={active ? classes.selectedScrollButton : classes.scrollButton} />;
			default:
				return null;
		}
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}>
						<MenuOpenIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Code Fight
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}>
				<div className={classes.toolbar}>
					<span className={classes.welcome}>Coming soon</span>
					<IconButton onClick={handleDrawerClose} style={{color: '#fff'}}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</div>
				<Divider />
				<List className={classes.list}>
					{menuList.map((item) => {
						return (
							<ListItem
								button
								key={item.link}
								onClick={() => {
									item.onClick ? item.onClick() : history.push(item.link);
								}}
								className={`${
									location.pathname === item.link ? classes.activeListItem : classes.ListItem
								}`}>
								<ListItemIcon>{getIcon(item.icon, location.pathname === item.link)}</ListItemIcon>
								<ListItemText
									primary={item.name}
									className={
										location.pathname === item.link
											? classes.activeListItemText
											: classes.listItemText
									}
								/>
							</ListItem>
						);
					})}
				</List>
				<Divider />
			</Drawer>
		</React.Fragment>
	);
}
