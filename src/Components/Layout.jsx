import React, { Suspense, useEffect, useState } from "react";
import Aside from "./aside";

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [renderedChildren, setRenderedChildren] = useState(children);

  useEffect(() => {
    setLoading(true);
    setRenderedChildren(children);
    setLoading(false);
  }, [children]);
  return (
    <div className="flex min-h-screen">
      <Aside />
      <div className="flex-1 bg-gray-100">
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 p-5">
            <Suspense fallback={<Spinner />}>
              {loading ? <Spinner /> : renderedChildren}
            </Suspense>
          </main>
          <footer className="bg-white p-5 border-l-2 border-l-gray-300">
            School Soft
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
    </div>
  );
}
