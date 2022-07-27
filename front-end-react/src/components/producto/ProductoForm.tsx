import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import IProductoModel from "../../models/Producto";
import ProductoService from "../../services/ProductoServices";

export const ProductoForm = () => {
	
  const { id }= useParams();
  let navigate = useNavigate();

    //Model vacío
    const initialProductoModel : IProductoModel = {
        id: null,
        nombre: "",
        categoria:"",
        fechaVencimiento:"12/07/2021",
        precio: 10.0,
        peso: 10
    };

    //Hooks para gestionar el modelo
    const [producto, setProducto] = useState<IProductoModel>(initialProductoModel);
    
    //Escucha los cambios en cada control Input y los asigna a los valores del Modelo
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProducto({ ...producto, [name]: value });
    };

		const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
			const { name, value } = event.target;
			setProducto({ ...producto, [name]: value });
	};

    const saveProducto = () => {        
      if(producto.id !== null)
      {
        ProductoService.update(producto)
        .then((response: any) => {
          navigate("/productos");
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
      }
      else
      {
			  ProductoService.create(producto)
          .then((response: any) => {    
            navigate("/productos");
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
    };

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


		return ( //JSX
			<div className="submit-form">				
					<div>
						{ producto.id !== null ? (<h1>Actualizado producto {producto.nombre}</h1>) : (<h1>Registro de nuevo producto</h1>) }            
						<div className="form-group">
						<label htmlFor="nombre">Nombre</label>
            <input
              type="text"
							placeholder="Ingrese el nombre del producto"
              className="form-control"
              id="nombre"
              required
              value={producto.nombre}
              onChange={handleInputChange}
              name="nombre"
            />
						<label htmlFor="fechaCaducidad">Fecha Caducidad</label>
            <input						
              type="text"
              className="form-control"
							placeholder="Ingrese la fecha de caducidad del producto"
              id="fechaCaducidad"
              required
              value={producto.fechaVencimiento}
              onChange={handleInputChange}
              name="fechaCaducidad"
            />
            <label htmlFor="categoria">Categoria</label>
            <textarea	
              className="form-control"
							placeholder="Ingrese la categoria del producto"
              id="categoria"              
              value={producto.categoria!}							
              onChange={handleTextAreaChange}
              name="instructions"
            />
						<label htmlFor="precio">Precio</label>
            <input						
              type="number"
              className="form-control"
              id="precio"
							max="1000"							
							step="0.01"
              value={producto.precio!}
              onChange={handleInputChange}
              name="precio"
            />
						<label htmlFor="peso">el peso</label>
            <input						
              type="number"
              className="form-control"
              id="preso"							
							min="1"
              required
              value={producto.peso!}
              onChange={handleInputChange}
              name="peso"
            />
						
						<br />
							<div className="btn-group" role="group">								
                <Link to={"/productos"} className="btn btn-primary">
                    <FaArrowLeft /> Regresar
                </Link>
								<button type="button" onClick={saveProducto} className="btn btn-success">
                  <FaSave />Guardar
                </button>
							</div>
						</div>
					</div>				
			</div>        
    );

}