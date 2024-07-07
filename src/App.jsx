import React from "react";
import {
  createRoutesFromElements,
  Route,
  RouterProvider,
  createBrowserRouter,
  Outlet,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage.jsx";
import BeerForm from "./pages/Beer/BeerForm.jsx";
import LiquorForm from "./pages/Liquor/LiquorForm.jsx";
import CompanyList from "./pages/Company/CompanyList.jsx";
import Layout from "./Layout.jsx";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard/:id" element={<Layout />}>
          <Route index element={<CompanyList />} /> {/* Default nested route */}
          <Route path="beer/create" element={<BeerForm />} />
          <Route path="liquor/create" element={<LiquorForm />} />
        </Route>
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
