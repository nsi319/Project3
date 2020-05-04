import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useToasts} from 'react-toast-notifications';
import {dataFetch} from '../../utils/dataFetch';

const CssTextField = withStyles({
	root: {
		'& label.Mui-focused': {
			color: 'white',
		},
		'& label': {
			color: 'white',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: 'white',
		},
		'& .MuiOutlinedInput-root': {
			color: 'white',
			'& fieldset': {
				borderColor: 'white',
			},
			'&:hover fieldset': {
				borderColor: 'white',
			},
			'&.Mui-focused fieldset': {
				borderColor: 'white',
			},
		},
	},
})(TextField);

const useStyles = makeStyles((theme) => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: '#03dac5',
		color: 'black',
		'&:hover': {
			backgroundColor: '#03dac5',
			opacity: 0.7,
		},
	},
}));

export const Login = () => {
	const classes = useStyles();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const {addToast} = useToasts();

	const onSubmit = () => {
		dataFetch('user/login', {
			email: email,
			password: password,
		})
			.then((response) => {
				console.log(response);
				if (response.status_code === 200) {
					addToast('Success', {
						appearance: 'success',
						autoDismiss: true,
						autoDismissTimeout: 2000,
					});
					localStorage.setItem('userId', response.message.id);
					localStorage.setItem('token', response.message.apiToken);
				} else {
					addToast(response.message, {
						appearance: 'error',
						autoDismiss: true,
						autoDismissTimeout: 2000,
					});
				}
			})
			.catch((err) => {
				addToast('Error', {
					appearance: 'error',
					autoDismiss: true,
					autoDismissTimeout: 2000,
				});
				console.log(err);
			});
	};

	return (
		<Container>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
					<CssTextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<CssTextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={(e) => {
							e.preventDefault();
							onSubmit();
						}}
						className={classes.submit}>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<a
								href="/home"
								style={{
									color: '#4ea2ed',
									textDecoration: 'none',
									border: 'none',
								}}>
								Forgot password?
							</a>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};
