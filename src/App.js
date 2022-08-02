import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/Home.component";
import Navbar from "./routes/navbar/Navbar.component";
import SignIn from "./routes/signin/SignIn.component";

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='signin' element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
