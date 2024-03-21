import "./Login.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";

function Login() {
  async function loginHandler() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
  }

  return (
    <div className="login-container">
      <div className="button-container">
        <button className="login-button" onClick={loginHandler}>
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
