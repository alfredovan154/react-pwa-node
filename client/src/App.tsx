import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/login/LoginForm";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/dashboard/Dashboard";
import Profile from "./components/dashboard/profile/Profile";
import Students from "./components/dashboard/students/Students";
import { AuthProvider } from "./lib/authContext";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="login" index element={<LoginForm />} />
              <Route path="dashboard" element={<Dashboard />}>
                <Route path="me" element={<Profile />} />
                <Route path="students" element={<Students />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
