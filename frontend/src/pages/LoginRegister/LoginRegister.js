import React, {useState} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {Login} from '../../components/Login';
import {Register} from '../../components/Register';

function TabPanel(props) {
	const {children, value, index, ...other} = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}>
			{value === index && <Box p={2}>{children}</Box>}
		</Typography>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: '5%',
		backgroundColor: '#010b14',
		borderRadius: '8px',
		maxWidth: 500,
		margin: 'auto',
		color: '#fff',
		marginBottom: '20px',

		[theme.breakpoints.down('xs')]: {
			marginLeft: '5%',
			marginRight: '5%',
			marginTop: '15%',
		},
	},
	indicator: {
		height: '100%',
		zIndex: -1,
		backgroundColor: '#68dac7',
	},
	appbar: {
		backgroundColor: '#1b2630',
		color: '#fff',
	},
}));

export const LoginRegister = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		console.log(index);
		setValue(index);
	};

	return (
		<Paper className={classes.root} elevation={5}>
			<AppBar position="static" elevation={3} classes={{root: classes.appbar}}>
				<Tabs
					value={value}
					onChange={handleChange}
					variant="fullWidth"
					aria-label="full width tabs example"
					classes={{indicator: classes.indicator}}>
					<Tab
						disableFocusRipple
						disableRipple
						label="Sign In"
						{...a11yProps(0)}
						style={value === 0 ? {color: 'black'} : null}
					/>
					<Tab
						disableFocusRipple
						disableRipple
						label="Sign Up"
						{...a11yProps(1)}
						style={value === 1 ? {color: 'black'} : null}
					/>
				</Tabs>
			</AppBar>
			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				onChangeIndex={handleChangeIndex}>
				<TabPanel value={value} index={0} dir={theme.direction}>
					<Login />
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<Register />
				</TabPanel>
			</SwipeableViews>
		</Paper>
	);
};
