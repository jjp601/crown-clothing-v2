import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/Home.component";
import Navbar from "./routes/navbar/Navbar.component";
import SignIn from "./routes/signin/SignIn.component";
import Shop from "./routes/shop/Shop.component";
import Checkout from "./routes/checkout/Checkout.component";
import { checkUserSession } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
