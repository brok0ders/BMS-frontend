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
import CompanyList from "./pages/Company/CompanyList.jsx";
import HomePage from "./Homepage/HomePage.jsx";

import Navbar from "./components/Navbar.jsx";
import LoginPage from "./pages/User/LoginPage.jsx";
import BillRecords from "./pages/Bill/BillRecords.jsx";
import AdminHome from "./pages/Home/AdminHome.jsx";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
import BillForm from "./pages/Bill/LiquorBillForm.jsx";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
            <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          <Route path="/bill/records" element={<BillRecords />} />
          <Route path="/dashboard/:id">
            <Route index element={<AdminHome />} />

            <Route path="company" element={<CompanyList />} />
            <Route path="beer/create" element={<BeerForm />} />
            <Route path="liquor/create" element={<LiquorForm />} />
          </Route>
        </Route>
          <Route path="/bill/create" element={<BillForm />} />
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
