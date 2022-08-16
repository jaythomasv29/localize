import { CssBaseline } from "@material-ui/core";
import Header from "./components/Header/Header";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PlacesProvider } from "./contexts/Places";
import Home from "./Home/Home";
import Favorites from "./Favorites/Favorites";

function App() {
  return (
    <>
      <CssBaseline>
            <Header />
        <PlacesProvider>
          <BrowserRouter>
          {/* Header is a shared layout between routes */}
            <Routes path="/" element={<Header />}>
              <Route index element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </BrowserRouter>
        </PlacesProvider>
      </CssBaseline>
    </>
  );
}

export default App;
