import React from 'react';
import { Sidenav } from '../../components/Sidenav';
import { Editor } from '../../components/Editor';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
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

  
export function Home(){
    const classes = useStyles();

    return(
        <div className={classes.root}>
        <Sidenav/>
        <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={1}>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <Editor/>
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper className={classes.paper}>Coming soon!!</Paper>
        </Grid>
        </Grid>
        
      </main>
        </div>

    );
}