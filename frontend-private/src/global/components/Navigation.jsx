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
import Reports from "../../pages/PagerReports/PageRepots.jsx";
import Stock from "../../pages/PageStock/Stock.jsx";
import PasswordRecovery from "../../pages/RecoveryPassword/logic/PageRecoveryPassword.jsx";
import Profile from "../../pages/PageProfile/logic/PageProfile.jsx";
import { useHasEmployees } from "../../pages/Login/hooks/useHasEmployees.jsx";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation(); // Se obtiene la ruta actual

  const { isAuthenticated, user } = useAuth();
  const { hasEmployees } = useHasEmployees();

  // Determina la ruta de redirección inicial según si existen empleados
  const redirectPath = hasEmployees ? "/login" : "/start";

  // Define las rutas donde no se muestra el sidebar ni el footer
  const noNavFooterRoutes = ["/login", "/start", "/recoveryPassword"];
  const hideNavFooter = noNavFooterRoutes.includes(location.pathname);

  // Redirección automática si el usuario ya está autenticado
  useEffect(() => {
    const noRedirectPaths = ["/", "/login", "/start"]; // Solo redirige desde estas rutas
    if (isAuthenticated && user && noRedirectPaths.includes(location.pathname)) {
      navigate("/home", { replace: true }); // Redirige a home sin acumular historial
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

          {/* Ruta raíz: redirige según autenticación */}
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/home" : redirectPath} replace />}
          />

          {/* Rutas protegidas */}
          <Route element={<PrivateRoute allowedRoles={["admin", "employee"]} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/products" element={<Products />} />
            <Route path="/order" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/materials" element={<Materials />} />

          </Route>

          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/categories-materia" element={<CategoriesMateria />} />
          </Route>

          {/* Ruta comodín: redirige a home o login según autenticación */}
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
