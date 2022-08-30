import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";

import { setCurrentUser } from "./store/user/user.action";

import Home from "./routes/home/Home.component";
import Navbar from "./routes/navbar/Navbar.component";
import SignIn from "./routes/signin/SignIn.component";
import Shop from "./routes/shop/Shop.component";
import Checkout from "./routes/checkout/Checkout.component";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
        if (user) {
            createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));
    })

    return unsubscribe
  }, [])

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
