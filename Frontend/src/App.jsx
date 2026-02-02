import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductsDetails from "./components/Products/ProductsDetails";
import CheckOut from "./components/Cart/CheckOut";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrderPages from "./pages/MyOrderPages";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./pages/ProductManagement";
import EditProductPage from "./pages/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";

import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route
              path="/collection/:collection"
              element={<CollectionPage />}
            ></Route>
            <Route path="/product/:id" element={<ProductsDetails />}></Route>
            <Route path="checkout" element={<CheckOut />}></Route>
            <Route
              path="/order-confirmation"
              element={<OrderConfirmationPage />}
            ></Route>
            <Route path="/order/:id" element={<OrderDetailsPage />}></Route>
            <Route path="my-orders" element={<MyOrderPages />}></Route>
          </Route>
          {/* Admin Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHomePage />}></Route>
            <Route path="users" element={<UserManagement />}></Route>
            <Route path="products" element={<ProductManagement />}></Route>
            <Route
              path="products/:id/edit"
              element={<EditProductPage />}
            ></Route>
            <Route path="orders" element={<OrderManagement />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
