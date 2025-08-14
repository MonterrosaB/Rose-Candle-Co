import { useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { PrivateRoute } from "./PrivateRoute.jsx";
import { StartRoute } from "./StartRoute";

import Login from "../../pages/Login/logic/PageLogin.jsx";
import FirstUser from "../../pages/Login/logic/FirstUser.jsx";
import Sidebar from "./Sidebar.jsx";
import Home from "../../pages/PageHome/Home.jsx";
import Products from "../../pages/PageProducts/PageProducts.jsx";
import Materials from "../../pages/PageMaterials/PageMaterials.jsx";
import Orders from "../../pages/PageOrders/PageOrders.jsx";
import Record from "../../pages/PageRecord/PageRecord.jsx";
import Employees from "../../pages/PageEmployees/logic/PageEmployees.jsx";
import Collections from "../../pages/PageCollections/PageCollections.jsx";
import Categories from "../../pages/PageCategories/PageCategories.jsx";
import Suppliers from "../../pages/PageSuppliers/PageSuppliers.jsx";
import CategoriesMateria from "../../pages/PageCategoriesMateria/PageCategoriesMateria.jsx";
import Reports from "../../pages/PagerReports/PageRepots.jsx";
import Stock from "../../pages/PageStock/Stock.jsx";
import PasswordRecovery from "../../pages/RecoveryPassword/logic/PageRecoveryPassword.jsx";
import { useHasEmployees } from "../../pages/Login/hooks/useHasEmployees.jsx";

import { useNavigate } from "react-router-dom";

function Navigation() {

  const navigate = useNavigate();


  const { isAuthenticated, user } = useAuth();
  const { hasEmployees } = useHasEmployees();

  // Redirección desde raíz si no hay empleados
  const redirectPath = hasEmployees ? "/login" : "/start";

  const noNavFooterRoutes = ["/login", "/start", "/recoveryPassword"];
  const hideNavFooter = noNavFooterRoutes.includes(location.pathname);


  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/home");
    }
  }, [isAuthenticated, user]);

  return (
    <>
      {!hideNavFooter && <Sidebar />}
      <main className={!hideNavFooter ? "transition-all duration-300 ml-0 lg:ml-60" : ""}>
        <Routes>
          {/* Ruta para el primer usuario */}
          <Route
            path="/start"
            element={
              <StartRoute>
                <FirstUser />
              </StartRoute>
            }
          />

          {/* Ruta para el primer usuario */}
          <Route
            path="/recoveryPassword"
            element={
              <PasswordRecovery />
            }
          />

          <Route
            path="/login"
            element={
              <Login />
            }
          />

          {/* Ruta raíz */}
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? "/home" : redirectPath} replace />
            }
          />

          {/* Rutas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/supplies" element={<Suppliers />} />
            <Route path="/colections" element={<Collections />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/products" element={<Products />} />
            <Route path="/order" element={<Orders />} />
            <Route path="/record" element={<Record />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/reports" element={<Reports />} />
            <Route
              path="/categories-materia"
              element={<CategoriesMateria />}
            />
          </Route>

          {/* Ruta comodín: para rutas no válidas */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />}
          />
        </Routes>
      </main>
    </>
  );
}

export default Navigation;