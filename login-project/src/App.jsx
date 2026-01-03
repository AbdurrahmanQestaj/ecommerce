import { useState } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return showLogin ? (
        <Login toggle={() => setShowLogin(false)}/>
      ) : (
        <SignUp toggle={() => setShowLogin(true)}/>
      );
}
export default App;
