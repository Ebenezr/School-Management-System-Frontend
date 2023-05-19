import Layout from "./Components/Layout";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";

import Dashboard from "./Dashboard";
import Student from "./Student";
import Teacher from "./Teacher";
import Guardian from "./Guardian";
import User from "./User";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Student />} />
          <Route path="teachers" element={<Teacher />} />
          <Route path="guardians" element={<Guardian />} />
          <Route path="users" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
