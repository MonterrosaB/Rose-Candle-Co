import './App.css'

import Login from "./pages/Login/PageLogin";
import Sidebar from './global/components/Sidebar'
import Home from "./pages/PageHome/Home"
import Products from './pages/PageProducts/PageProducts';
import Materials from "./pages/PageMaterials/PageMaterials"
import Orders from "./pages/PageOrders/PageOrders"
import Employees from "./pages/PageEmployees/PageEmployees"
import Others from './pages/PageOthers/PageOthers';
import Collections from './pages/PageCollections/PageCollections';
import Categories from './pages/PageCategories/PageCategories';
import Suppliers from './pages/PageSuppliers/PageSuppliers';
import CategoriesMateria from './pages/PageCategoriesMateria/PageCategoriesMateria';

import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {

  return (
    <>
      <Router>
        <Sidebar />
        <main className='ml-64'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/materials' element={<Materials />} />
            <Route path='/products' element={<Products />} />
            <Route path='/order' element={<Orders />} />
            <Route path='/employees' element={<Employees />} />

            <Route path='/others' element={<Others />} />
            <Route path='/others/colections' element={<Collections />} />
            <Route path='/others/categories' element={<Categories />} />
            <Route path='/others/supplies' element={<Suppliers />} />
            <Route path='/others/categories-materia' element={<CategoriesMateria />} />
          </Routes>
        </main>

      </Router>
    </>
  )
}

export default App
