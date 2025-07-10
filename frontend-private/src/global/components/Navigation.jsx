// Navegación del sitio (rutas privadas)
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { PrivateRoute } from "./PrivateRoute.jsx";

import Login from "../../pages/Login/logic/PageLogin.jsx";
import FirstUser from "../../pages/Login/logic/FirstUser.jsx";
import Sidebar from "./Sidebar.jsx";
import Home from "../../pages/PageHome/Home.jsx";
import Products from "../../pages/PageProducts/PageProducts.jsx";
import Materials from "../../pages/PageMaterials/PageMaterials.jsx";
import Orders from "../../pages/PageOrders/PageOrders.jsx";
import Employees from "../../pages/PageEmployees/logic/PageEmployees.jsx";
import Others from "../../pages/PageOthers/PageOthers.jsx";
import Collections from "../../pages/PageCollections/PageCollections.jsx";
import Categories from "../../pages/PageCategories/PageCategories.jsx";
import Suppliers from "../../pages/PageSuppliers/PageSuppliers.jsx";
import CategoriesMateria from "../../pages/PageCategoriesMateria/PageCategoriesMateria.jsx";
import Reports from "../../pages/PagerReports/PageRepots.jsx";

function Navigation() {
  const { authCokie } = useAuth();

  return (
    <>
      {authCokie && <Sidebar />}

      <main className={authCokie ? "ml-64" : ""}>
        <Routes>
          {/* Ruta para el primer usuario */}
          <Route
            path="/start"
            element={authCokie ? <Navigate to="/home" replace /> : <FirstUser />}
          />

          {/* Ruta pública: solo visible si NO hay sesión */}
          <Route
            path="/login"
            element={authCokie ? <Navigate to="/home" replace /> : <Login />}
          />

          {/* Ruta raíz: redirige según sesión */}
          <Route
            path="/"
            element={<Navigate to={authCokie ? "/home" : "/login"} replace />}
          />

          {/* Rutas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/products" element={<Products />} />
            <Route path="/order" element={<Orders />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/others" element={<Others />} />
            <Route path="/others/colections" element={<Collections />} />
            <Route path="/others/categories" element={<Categories />} />
            <Route path="/others/supplies" element={<Suppliers />} />
            <Route
              path="/others/categories-materia"
              element={<CategoriesMateria />}
            />
          </Route>

          {/* Ruta comodín: para rutas no válidas */}
          <Route
            path="*"
            element={<Navigate to={authCokie ? "/home" : "/login"} replace />}
          />
        </Routes>
      </main>
    </>
  );
}

export default Navigation;