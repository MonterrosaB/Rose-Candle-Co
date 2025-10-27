import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

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
import Reports from "../../pages/PagerReports/PageReports.jsx";
import Stock from "../../pages/PageStock/Stock.jsx";
import PasswordRecovery from "../../pages/RecoveryPassword/logic/PageRecoveryPassword.jsx";
import Profile from "../../pages/PageProfile/logic/PageProfile.jsx";
import Personalize from "../../pages/PagePersonalize/logic/PagePersonalize.jsx";
import { useHasEmployees } from "../../pages/Login/hooks/useHasEmployees.jsx";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user } = useAuth();
  const { hasEmployees } = useHasEmployees();

  // Determina la ruta de redirección inicial según si existen empleados
  const redirectPath = hasEmployees ? "/login" : "/start";

  // Define las rutas donde no se muestra el sidebar ni el footer
  const noNavFooterRoutes = ["/login", "/start", "/recoveryPassword"];
  const hideNavFooter = noNavFooterRoutes.includes(location.pathname);

  // Redirección automática si el usuario ya está autenticado
  useEffect(() => {
    // Redirige a /home si está autenticado y está en la página inicial o de autenticación.
    const noRedirectPaths = ["/", "/login", "/start"];
    if (isAuthenticated && user && noRedirectPaths.includes(location.pathname)) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, user, navigate, location.pathname]);

  return (
    <>
      {/* Muestra el sidebar solo si la ruta no está en la lista de exclusión */}
      {!hideNavFooter && <Sidebar />}

      <main className={!hideNavFooter ? "transition-all duration-300 ml-0 lg:ml-60" : ""}>
        <Routes>
          {/* Ruta para crear el primer usuario */}
          <Route
            path="/start"
            element={
              <StartRoute>
                <FirstUser />
              </StartRoute>
            }
          />

          {/* Ruta de recuperación de contraseña */}
          <Route path="/recoveryPassword" element={<PasswordRecovery />} />

          {/* Ruta de login */}
          <Route path="/login" element={<Login />} />

          {/* 1. Ruta raíz: redirige según autenticación Y si hay empleados */}
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/home" : redirectPath} replace />}
          />

          {/* Rutas protegidas para Empleados y Admin */}
          <Route element={<PrivateRoute allowedRoles={["admin", "employee"]} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/products" element={<Products />} />
            <Route path="/order" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/materials" element={<Materials />} />
          </Route>

          {/* Rutas protegidas SOLO para Admin */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            {/* Las rutas de abajo solo aparecerán si no se han definido en el bloque anterior 
            y si el rol es 'admin'. Si se repiten, el enrutador usará la primera coincidencia, 
            que es la del rol más permisivo ("admin", "employee"). Solo se incluyen rutas exclusivas de admin. */}

            <Route path="/record" element={<Record />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/personalize" element={<Personalize />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/supplies" element={<Suppliers />} />
            <Route path="/colections" element={<Collections />} />
            <Route path="/categories-materia" element={<CategoriesMateria />} />
          </Route>

          {/* 2. Ruta comodín: redirige a home o a la ruta de inicio (login/start) */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/home" : redirectPath} replace />}
          />
        </Routes>
      </main>
    </>
  );
}

export default Navigation;