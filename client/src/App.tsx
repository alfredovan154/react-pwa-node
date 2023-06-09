import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/login/LoginForm";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/dashboard/Dashboard";
import Profile from "./components/dashboard/profile/Profile";
import Students from "./components/dashboard/students/Students";
import { AuthProvider } from "./lib/authContext";
import { ProtectedRoute } from "./lib/ProtectedRoute";
import Products from "./components/dashboard/products/Products";
import Visitors from "./components/dashboard/visitors/Visitors";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="login" index element={<LoginForm />} />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                <Route path="me" element={<Profile />} />
                <Route path="students" element={<Students />} />
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
