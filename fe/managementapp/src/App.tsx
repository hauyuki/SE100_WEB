import DefaultLayout from "./layouts/DefaultLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App h-[100vh]">
          <Routes>
            {routes.map((route, index) => {
              let Layout = DefaultLayout;
              if (route.layout === null) {
                Layout = React.Fragment;
              } else if (route.layout) {
                Layout = route.layout;
              }
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
