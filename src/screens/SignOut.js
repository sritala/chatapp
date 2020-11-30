import firebase from "firebase/app";
import "firebase/auth";
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    button:{
      fontWeight:600
    },
  }));

  export default function SignOut() {
  const auth = firebase.auth();
  const classes = useStyles();

  return (
    auth.currentUser && (
      <Button variant={'contained'} className={classes.button} onClick={() => auth.signOut()}>
        Sign Out
      </Button>
    )
  );
}
