import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom";

import Spinner from "./components/Spinner/Spinner.component";
import { checkUserSession } from "./store/user/user.action";

const Home = lazy(() => import('./routes/home/Home.component'));
const SignIn = lazy(() => import('./routes/signin/SignIn.component'));
const Navbar = lazy(() => import('./routes/navbar/Navbar.component'));
const Shop = lazy(() => import('./routes/shop/Shop.component'));
const Checkout = lazy(() => import('./routes/checkout/Checkout.component'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path='shop/*' element={<Shop />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='checkout' element={<Checkout />} />
          </Route>
        </Routes>
    </Suspense>
  );
}

export default App;
