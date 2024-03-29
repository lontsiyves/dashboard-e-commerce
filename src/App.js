import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Partial/Header";
import Footer from "./Components/Partial/Footer";
import SideNavBar from "./Components/Partial/SideNavBar";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
      <div id="wrapper">
        <SideNavBar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            <Home />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
