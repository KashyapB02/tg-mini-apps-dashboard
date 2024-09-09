import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer, HeaderBar } from "./components/common";
import { DeployMiniApp, HomePage, PageNotFound } from "./pages";

const validRoutes = ["/", "/deploy-mini-app"];

export const App: React.FunctionComponent = (): JSX.Element => {
  const location = useLocation();

  return (
    <React.Fragment>
      {validRoutes.includes(location.pathname) && <HeaderBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/deploy-mini-app" element={<DeployMiniApp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {validRoutes.includes(location.pathname) && <Footer />}
    </React.Fragment>
  );
};
