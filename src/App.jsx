import React from "react";
import {
  createRoutesFromElements,
  Route,
  RouterProvider,
  createBrowserRouter,
  Outlet,
} from "react-router-dom";

import RegisterPage from "./pages/User/RegisterPage";

import BeerForm from "./pages/Beer/BeerForm.jsx";
import LiquorForm from "./pages/Liquor/LiquorForm.jsx";
import CompanyForm from "./pages/Company/CompanyForm.jsx";
import CompanyList from "./pages/Company/CompanyList.jsx";
import HomePage from "./Homepage/HomePage.jsx";

import Navbar from "./components/Navbar.jsx";
import LoginPage from "./pages/User/LoginPage.jsx";
import BillRecords from "./pages/Bill/BillRecords.jsx";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/bill/records" element={<BillRecords />} />
          <Route path="/beer/create" element={<BeerForm />} />
          <Route path="/liquor/create" element={<LiquorForm />} />
          <Route path="/company" element={<CompanyList />} />
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
