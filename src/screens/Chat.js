import React, { useRef, useState } from "react";
import "../App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "../components/ChatMessage";
import { makeStyles, Box, Grid, Input } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    background: "#ffffff",
    borderRadius: "6px",
    margin: "2rem",
    padding: "2rem",
    justifyContent: "center",
    maxWidth: "1200px",
    width: "100%",
  },
  inputWrapper:{
    backgroundColor:'#1C294B',
    paddingLeft:'1rem',
  },
  input:{
    width:'100%',
    background:'#3F5180',
    border:'none',
    color:'#fff',
    height:'55px',
    borderRadius:'8px',
    paddingLeft:'20px',
    fontSize:'25px',
    [theme.breakpoints.down("sm")]: {
        fontSize:'18px',
      },
  },
   item:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
   },
   form:{
    position: 'fixed',
    bottom: 0,
    height: '6rem',
    width: '100%',
    maxWidth: 700,
    display: 'flex',
    fontSize: '1.5rem',
    backgroundColor: '#282c34',
   }
}));

export default function Chat() {
  const firestore = firebase.firestore();
  const auth = firebase.auth();
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const classes = useStyles();

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  console.log(auth.currentUser);
  return (
    <>
      <Box>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </Box>
      <form onSubmit={sendMessage} className={classes.form}>
        <Grid container className={classes.inputWrapper}>
            <Grid item xs={9} md={10} lg={10} className={classes.item}>
                <Input
                 className={classes.input}
                 disableUnderline
                 value={formValue}
                 onChange={(e) => setFormValue(e.target.value)}
                 placeholder="send a message"
                />
            </Grid>
            <Grid item xs={3} md={2} lg={2} className={classes.item}>
                <button type="submit" disabled={!formValue}>
                    <i className="fas fa-angle-right fa-2x"></i>
                </button>
            </Grid>
        </Grid>
      </form>
    </>
  );
}
