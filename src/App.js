import "./App.css";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import QuestionPage from "./pages/QuestionPage";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { auth } from "./services/firebase";

function PrivateRoute({ authenticated }) {
  return authenticated === true ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: "/" }} />
  );
}

function PublicRoute({ authenticated }) {
  return authenticated === false ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: "/question" }} />
  );
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((userData) => {
      if (userData) {
        setAuthenticated(true);
        setUser(userData);
      } else {
        setAuthenticated(false);
      }
    });
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<PublicRoute authenticated={authenticated} />}
          >
            <Route exact path="/" element={<Login />} />
          </Route>

          <Route
            exact
            path="/"
            element={<PrivateRoute authenticated={authenticated} />}
          >
            <Route
              exact
              path="/question"
              element={<QuestionPage user={user} />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
