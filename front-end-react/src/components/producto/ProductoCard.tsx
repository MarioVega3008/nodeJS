import { useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import IProductoModel from "../../models/Producto";
import ProductoService from "../../services/ProductoServices";

export const ProductoCard = () => {
  const { id }= useParams();

  const [producto, setProducto] = useState<IProductoModel>();

  useEffect(() => {
    if (id)
      getProducto(id);
  }, [id]);


  const getProducto = (id: any) => {
    ProductoService.retrieve(id)
      .then((response: any) => {
        setProducto(response.data); //Víncula el resultado del servicio con la función del Hook useState
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
 };

    return (
      <div>
      { 
        producto ? (
          <div>          
          <h2>{producto.nombre}</h2>
          <p>{producto.fechaVencimiento}</p>
          <ul>
            <li> <strong>Categoria :</strong>  {producto.categoria}</li>
            <li>precio : {producto.precio}($)</li>
            <li>peso: {producto.peso}(kg)</li>
          </ul>
          <br />
							<div className="btn-group" role="group">								
                <Link to={"/productos"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
								<button type="button" className="btn btn-danger">
                  <FaTrash />Eliminar
                </button>
							</div>
          </div>

        ) : 
        ( 
          <h1>No hay un Producto disponible</h1>
        )
      }
      </div>
    );
}