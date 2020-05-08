import React from 'react';
import {Sidenav} from '../../components/SideNav';
import {Editor} from '../../components/Editor';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import {GameCanvas} from '../../components/Game';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		// backgroundColor: '#2f323d',
		height: '100vh',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export function Home() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Sidenav />
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Grid container spacing={1}>
					<Grid item xs={5}>
						<Paper className={classes.paper}>
							<Editor />
						</Paper>
					</Grid>
					<Grid item xs={7} id="mydiv">
						<GameCanvas />
					</Grid>
				</Grid>
			</main>
		</div>
	);
}
