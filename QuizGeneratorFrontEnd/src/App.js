import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import AddAQuestion from "./components/AddAQuestion";
import TakeAQuiz from "./components/TakeAQuiz";

function App() {
  return (
    <Router>

    <>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/addAQuestion" element={<AddAQuestion/>} />
      <Route path="/takeAQuiz" element={<TakeAQuiz/>} />
    </Routes>
    </>
    </Router>
  );
}

export default App;
