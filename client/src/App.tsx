import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/login/LoginForm";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/dashboard/Dashboard";
import Profile from "./components/dashboard/profile/Profile";
import Students from "./components/dashboard/students/Students";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" index element={<LoginForm />}/>
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="me" element={<Profile />} />
              <Route path="students" element={<Students />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
