import Layout from "./Components/Layout";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";

import Dashboard from "./Pages/Dashboard";
import Student from "./Pages/Student";
import Teacher from "./Pages/Teacher";
import Guardian from "./Pages/Guardian";
import User from "./Pages/User";
import Login from "./Pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="students" element={<Student />} />
            <Route path="teachers" element={<Teacher />} />
            <Route path="guardians" element={<Guardian />} />
            <Route path="users" element={<User />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
