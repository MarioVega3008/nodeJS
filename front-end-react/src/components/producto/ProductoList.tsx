import { FaPen, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import IProductoModel from '../../models/Producto';
import ProductoService from '../../services/ProductoServices';
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

export const ProductoList = () => {

    //Hook: Define un atributo y la función que lo va a actualizar
    const [producto, setProducto] = useState<Array<IProductoModel>>([]);
    const [itemsCount, setItemsCount] = useState<number>(0);
    const [pageCount, setPageCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    
    //Hook para llamar a la Web API
    useEffect(() => {
      getItems();  
      listProducto(0, itemsPerPage);           
      }, []);

    const handlePageClick = (event: any) => {        
      const numberPage = event.selected;                   
      listProducto(numberPage, itemsPerPage);
    };

    //Función que llama al Service para listar los datos desde la Web API
    const listProducto = (page: number, size: number) => {
       ProductoService.list(page, size)
         .then((response: any) => {
           setProducto(response.data); //Víncula el resultado del servicio con la función del Hook useState
           console.log(response.data);
         })
         .catch((e: Error) => {
           console.log(e);
         });
    };

    const getItems = () => {
      ProductoService.count().then((response: any) =>{
        var itemsCount = response;
        setItemsCount(itemsCount);
        setPageCount(Math.ceil(itemsCount/ itemsPerPage));           
        setItemsPerPage(5)
        console.log(response);
      }).catch((e : Error)=> {
        console.log(e);
      });
    }

    const removeProducto = (id: number) => {
        Swal.fire({
            title: '¿Desea eliminar el Producto?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
          }).then((result) => {            
            if (result.isConfirmed) {
              ProductoService.remove(id)
                .then((response: any) => {
                  listProducto(0,itemsPerPage);
                  console.log(response.data);
                })
                .catch((e: Error) => {
                  console.log(e);
                });      

            }
          });        
     };
   
    return ( 
        <div className='list row'>
            <h1>Hay {itemsCount} Productos</h1>
            <div className='col-md-12'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Fecha de Caducidad</th>
                            <th>precio</th>
                            <th>categoria</th>
                            <th>
                              <Link to={"/producto/create"} className="btn btn-success">
                                  <FaPlus /> Agregar
                              </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {producto && producto.map((Producto, index) => (                          
                            <tr key={index}>
                                <td>{++index}</td>
                                <td>{Producto.nombre}</td>
                                <td>{Producto.fechaVencimiento}</td>
                                <td>{Producto.precio} dolares</td>
                                <td>{Producto.categoria}</td>
                                <td>
                        
                                <div className="btn-group" role="group">
                                <Link to={"/producto/retrieve/" + Producto.id} className="btn btn-warning">
                                    <FaEye /> Ver
                                  </Link>                                  
                                  <Link to={"/producto/update/" + Producto.id} className="btn btn-primary">
                                      <FaPen /> Editar
                                  </Link>

                                  <button className="btn btn-danger" onClick={() => removeProducto(Producto.id!)}>
                                    <FaTrash /> Eliminar
                                  </button>

                                  
                                </div>
                                    
                                </td>
                            </tr>                        
                        ))}
                    </tbody>
                </table>

                <ReactPaginate
                  className="pagination"
                  breakLabel="..."
                  nextLabel="siguiente >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="< anterior"/>

            </div>            
        </div>
     );
}