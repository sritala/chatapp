import React, { useRef, useState } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import Chat from './screens/Chat';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import SignIn from './screens/SignIn';
import SignOut from './screens/SignOut';
import {makeStyles,Box,Typography, Grid} from "@material-ui/core";


firebase.initializeApp({
  apiKey: "AIzaSyCOSdeAIRGTo5WlWDVW6wtusKLOEdqlE6I",
  authDomain: "chatapp-e54c9.firebaseapp.com",
  databaseURL: "https://chatapp-e54c9.firebaseio.com",
  projectId: "chatapp-e54c9",
  storageBucket: "chatapp-e54c9.appspot.com",
  messagingSenderId: "601155090044",
  appId: "1:601155090044:web:adf38fb1d9eb9878e77bf9",
  measurementId: "G-C38WHFQ530",
});

const useStyles = makeStyles(() => ({
    root:{
      height:'3rem',
      background:'white',
      textAlign: 'center',
      maxWidth: '700px',
      margin: '0 auto',
      background:'#1C294B',
      height:'100vh',
      borderRadius:'5%',
    },
    header: {
      padding:'2rem'
    },
    chat:{
      backgroundColor:'#3F5180',
      borderRadius:'20px',
      height:'100%',
    },
    titleWrapper:{
      display:'flex',
      justifyContent:'flex-start'
    },
    title:{
      color:'#fff',
    },
    buttonWrapper:{
      display:'flex',
      justifyContent:'flex-end'
    }
  }));

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container className={classes.header}>
          <Grid item xs={6} sm={6} md={6} lg={6} className={classes.titleWrapper}>
            <Typography variant={'h4'} className={classes.title}>Chatapp</Typography>
          </Grid>
          <Grid item className={classes.buttonWrapper} xs={6} sm={6} md={6} lg={6}>
            <SignOut />
          </Grid>
      </Grid>
        <Box className={classes.chat}>{user ? <Chat /> : <SignIn />}</Box>
    </Box>
  );
}


export default App;
