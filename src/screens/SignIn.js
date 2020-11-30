import firebase from "firebase/app";
import "firebase/auth";
import { Box } from "@material-ui/core";
export default function SignIn() {
  const auth = firebase.auth();

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <Box style={{display:'flex',alignItems:'center', height:'100%'}}>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </Box>
  );
}
