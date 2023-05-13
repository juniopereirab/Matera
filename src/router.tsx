/* eslint-disable react/jsx-props-no-spreading */
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Register from "./pages/Register";

function AppRoutes() {
  const isLogged = useSelector((state: MainState) => state.user.isLogged);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLogged ? <Navigate to="/produtos" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={
            isLogged ? <Navigate to="/produtos" replace /> : <Register />
          }
        />
        <Route
          path="/produtos"
          element={isLogged ? <Products /> : <Navigate to="/" replace />}
        >
          <Route
            path=":productId"
            element={isLogged ? <Products /> : <Navigate to="/" replace />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
