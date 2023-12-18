import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Signup from "./components/pages/signup/signup";
import Main from "./components/pages/main/main";
import Login from "./components/pages/login/login";
import RouteGuard from "./helpers/route-guard";
import { isLoggedIn } from "./apis/auth";
import Transactions from "./components/pages/transactions/transactions";

function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>} />
        <Route element={<Main />}>
          <Route
            element={
              <RouteGuard condition={isLoggedIn()} redirect={"/login"} />
            }
          >
            <Route path="/app" element={<App />} />
            <Route path="/" element={<Transactions />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/analatics" element={<App />} />
            <Route path="/profile" element={<App />} />
            <Route path="/account" element={<App />} />
            <Route path="/dashboard" element={<App />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
export default Routers;
