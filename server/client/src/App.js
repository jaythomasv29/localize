import { CssBaseline } from "@material-ui/core";
import Header from "./components/Header/Header";

import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { PlacesProvider } from "./contexts/Places";
import Home from "./Home/Home";
import Favorites from "./Favorites/Favorites";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { UserContext, UserProvider } from "./contexts/User";
import { useContext } from "react";

function App() {
  
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <>
      <CssBaseline>
        <UserProvider>
          <PlacesProvider>
            <BrowserRouter>
              <Header />
              {/* Header is a shared layout between routes */}
              <Routes path="/" element={<Header />}>
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <Favorites />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NoMatch />} />
                
                
              </Routes>
            </BrowserRouter>
          </PlacesProvider>
        </UserProvider>
      </CssBaseline>
    </>
  );
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default App;
