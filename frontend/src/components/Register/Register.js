import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useToasts} from 'react-toast-notifications';
import {dataFetch} from '../../utils/dataFetch';

function removeAscii(string) {
    return string.replace(/[^\x00-\x7F]/g, '');
}

function validate(name,username, email, password, repeat, phoneNumber) {
	let errors = [];
	if (!name) {
        errors.push('Name field is empty');
    }
    if (!username) {
        errors.push('Username field is empty');
    }
    if (username.length < 5 || username.length > 25) {
        errors.push('Username field should be between 5 and 25 characters long');
    }
    if (!email) {
        errors.push('Email field is empty');
    }
    if (!password) {
        errors.push('Password field is empty');
    }
    if (!repeat && password) {
        errors.push('Confirm password field is empty');
    }
    if (!phoneNumber) {
        errors.push('Contact Number field is empty');
    }
    if (repeat !== password && password) {
        errors.push('Passwords do not match');
    }
    let re = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$/;
    if (!re.test(email) && email && email !== removeAscii(email)) {
        errors.push('Incorrect email address');
    }
    re = /^(\+91)?[0-9 ]{10}/;
    if (!re.test(phoneNumber) && phoneNumber && phoneNumber !== removeAscii(phoneNumber)) {
        errors.push('Incorrect contact number');
    }
    re = /^(?=.*\d)(?!.*\s).{6,32}$/;
    if (!re.test(password) && password) {
        errors.push('Make your password more secure');
    }
    if (username !== removeAscii(username)) {
        errors.push('Incorrect username');
    }
    if (errors.length > 0) {
        return errors;
    }
    return true;
}

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
		marginTop: theme.spacing(3),
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

export const Register = () => {
	const classes = useStyles();
	const [name, setName] = useState('');
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [phno, setPhno] = useState('');
	const [password, setPassword] = useState('');
	const [repeat, setRepeat] = useState('');
	const {addToast} = useToasts();

	const onSubmit = () => {
		let validation = validate(name,userName,email,password,repeat,phno)
		if( Array.isArray(validation) ){
			addToast(validation[0], {
				appearance: 'error',
				autoDismiss: true,
				autoDismissTimeout: 2000,
			});
			return
		}
		dataFetch('user/register', {
			name: name,
			userName: userName,
			email: email,
			password: password,
			phoneNumber: phno,
		})
			.then((response) => {
				if (response.status_code === 200) {
					addToast(response.message, {
						appearance: 'success',
						autoDismiss: true,
						autoDismissTimeout: 2000,
					});
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
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<AccountCircleIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<CssTextField
								autoComplete="name"
								name="name"
								variant="outlined"
								required
								fullWidth
								id="name"
								label="Name"
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<CssTextField
								autoComplete="name"
								name="name"
								variant="outlined"
								required
								fullWidth
								id="username"
								label="Username"
								onChange={(e) => {
									setUserName(e.target.value);
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<CssTextField
								variant="outlined"
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
						</Grid>
						<Grid item xs={12}>
							<CssTextField
								variant="outlined"
								required
								fullWidth
								id="phno"
								label="Phone Number"
								name="phno"
								autoComplete="phone number"
								onChange={(e) => {
									setPhno(e.target.value);
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<CssTextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								autoComplete="current-password"
							/>
						</Grid>
						<Grid item xs={12}>
							<CssTextField
								variant='outlined'
								required
								fullWidth
								name='repeat'
								label='Confirm Password'
								type='password'
								id='repeat'
								onChange={e => {
									setRepeat(e.target.value);
								}}
								autoComplete='current-repeat'
							/>
						</Grid>
					</Grid>
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
						Sign Up
					</Button>
				</form>
			</div>
		</Container>
	);
};
