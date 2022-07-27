import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./components/Home";
import { ProductoList } from "./components/producto/ProductoList";
import { ProductoForm } from "./components/producto/ProductoForm";
import { ProductoCard } from "./components/producto/ProductoCard";

const title = "Programacion Web Avanzada";
const description = "Aplicación web para la automatización de cuestionarios en línea";

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">        
        <Link to={"/"}  className="navbar-brand">
          NRC 6515
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/producto"} className="nav-link">
              Producto
            </Link>
          </li>          
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home title={title} description={description} />} />          
          <Route path="/producto" element={<ProductoList />} />          
          <Route path="/producto/create" element={<ProductoForm />} />    
          <Route path="/producto/retrieve/:id" element={<ProductoCard/>} />      
          <Route path="/producto/update/:id" element={<ProductoForm />} />    
        </Routes>
      </div>
    </div>
  );
}
export default App;
