import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Signup from "./components/pages/signup/signup";
import Main from "./components/pages/main/main";
import Login from "./components/pages/login/login";

function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/app" element={<App />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login/>} />
        </Route>
      </Routes>
    </Router>
  );
}
export default Routers;
