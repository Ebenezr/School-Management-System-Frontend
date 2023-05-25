import React, { Suspense } from "react";
import Layout from "./Components/Layout";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";

import Dashboard from "./Pages/Dashboard";
const Student = React.lazy(() => import("./Pages/Student"));
const Teacher = React.lazy(() => import("./Pages/Teacher"));
const Guardian = React.lazy(() => import("./Pages/Guardian"));
const User = React.lazy(() => import("./Pages/User"));
const Class =React.lazy(()=>import("./Pages/Class"))
import Login from "./Pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/students"
              element={
                <Layout>
                  <Student />
                </Layout>
              }
            />
            <Route
              path="/teachers"
              element={
                <Layout>
                  <Teacher />
                </Layout>
              }
            />
                  <Route
              path="/classes"
              element={
                <Layout>
                  <Class />
                </Layout>
              }
            />
            <Route
              path="/guardians"
              element={
                <Layout>
                  <Guardian />
                </Layout>
              }
            />
            <Route
              path="/users"
              element={
                <Layout>
                  <User />
                </Layout>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
    </div>
  );
}
