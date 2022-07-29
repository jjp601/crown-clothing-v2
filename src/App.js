import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/Home.component";
import Navbar from "./routes/navbar/Navbar.component";

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
