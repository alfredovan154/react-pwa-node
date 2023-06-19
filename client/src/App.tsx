import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/login/LoginForm";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/dashboard/Dashboard";
import Profile from "./components/dashboard/profile/Profile";
import { AuthProvider } from "./lib/authContext";
import { ProtectedRoute } from "./lib/ProtectedRoute";
import Products from "./components/dashboard/products/Products";
import Visitors from "./components/dashboard/visitors/Visitors";
import RecoverPassword from "./components/recover_password/RecoverPassword";
import ResetPassword from "./components/recover_password/ResetPassword";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="login" index element={<LoginForm />} />
              <Route path="recover_password" element={<RecoverPassword />} />
              <Route path="reset_password" element={<ResetPassword />} />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                <Route path="me" element={<Profile />} />
                <Route path="products" element={<Products />} />
                <Route path="visitors" element={<Visitors />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
