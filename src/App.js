import Layout from "./Components/Layout";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";

import Dashboard from "./Dashboard";
import Student from "./Student";
import Teacher from "./Teacher";
import Guardian from "./Guardian";
import User from "./User";
import Login from "./Login";
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
