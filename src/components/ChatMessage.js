
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
export default function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const auth = firebase.auth();
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  const image = photoURL ? <img src={photoURL}/> : <AccountCircleIcon style={{ width: '70px',height: '70px', color:'#e5e5ea'}}/>
  
  return (
    <>
      <div className={`message ${messageClass}`}>
        {image}
        <p>{text}</p>
      </div>
    </>
  );
}
