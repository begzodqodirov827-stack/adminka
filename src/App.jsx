import React, { Suspense } from "react";

const Register = React.lazy(() => import("./auth/Register"));
const Login = React.lazy(() => import("./auth/Login"));
const LogOut = React.lazy(() => import("./auth/LogOut"));

const Home = React.lazy(() => import("./pages/Home"));
const Products = React.lazy(() => import("./pages/Products"));
const Settings = React.lazy(() => import("./pages/Settings"));
const Profile = React.lazy(() => import("./pages/Profile"));
const NotFound404 = React.lazy(() => import("./pages/NotFound404"));
import MainLayout from "./layouts/Mainlayout";
import ProtectedRoute from "./auth/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
function App() {  
  return (
<Suspense fallback={<h1>loadinggg.....</h1>}>
  <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />

    <Route
      index
      element={
        <ProtectedRoute>
          <MainLayout>
            <Home />
          </MainLayout>
        </ProtectedRoute>
      }
    />

    <Route
      path="/products"
      element={
        <ProtectedRoute>
          <MainLayout>
            <Products />
          </MainLayout>
        </ProtectedRoute>
      }
    />

    <Route
      path="/settings"
      element={
        <ProtectedRoute>
          <MainLayout>
            <Settings />
          </MainLayout>
        </ProtectedRoute>
      }
    />

    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <MainLayout>
            <Profile />
          </MainLayout>
        </ProtectedRoute>
      }
    />

    <Route path="*" element={<NotFound404 />} />
  </Routes>
</Suspense>
  );
}

export default App;
