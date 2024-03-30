import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import MainLayout from "./components/MainLayout"

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route exact path="/">
            <Home />
          </Route>
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
