import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./component/Profile/Profile";
import Navbar from "./component/Navbar/Navbar";

function App() {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
 
  return (
    <div>
      <Navbar />
      {isAuthenticated ? (
        <Profile />
      ) : (
        <button className="log-Btn" onClick={() => loginWithRedirect()}>
          {" "}
          Login{" "}
        </button>
      )}
    </div>
  );
}

export default App;
