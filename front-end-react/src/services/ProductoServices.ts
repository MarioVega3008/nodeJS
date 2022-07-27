import Swal from "sweetalert2";
import http from "../http-common";
import IProductoData from "../models/Producto";

const create = async (data: IProductoData) => {    
  try {
    const response = await http.post<IProductoData>("/producto", data);
    if(response.status === 201){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'El Producto ha sido creado correctamente',
        confirmButtonText: 'Aceptar'    

      });
    }
    console.log(response);
  } catch (err) {
    console.log(err);
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'Network Error',
      confirmButtonText: 'Aceptar'    
    });
  }
};

const retrieve = async (id: number) => {
    return http.get<IProductoData>(`/producto/${id}`);
};

const update = async (data: IProductoData) => {
  try {    
    const response = await http.put<IProductoData>(`/producto/${data.id}`, data);
    if(response.status === 200){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'El Producto ha sido actualizado',
        confirmButtonText: 'Aceptar'    
      });
    }

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'Network Error',
      confirmButtonText: 'Aceptar'    
    });
  }
    
};

const remove = async (id: number) => {
    try {
      const response = await  http.delete<string>(`/producto/${id}`);
      if(response.status === 200){
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'El Producto ha sido eliminado',
          confirmButtonText: 'Aceptar'    
        });
      }
    } catch (error) {
      Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'Network Error',
      confirmButtonText: 'Aceptar'    
    });
    }

};


const list = (page: number, size: number, sort? : String) => {
  const urlRequest : string = "/producto/" + page + "/" + size ;
  console.log(urlRequest);
  return http.get<Array<IProductoData>>(urlRequest);
};

const count = async () =>  {  
  const response = await http.get<number>("/producto/count");
  return response.data;
};

const ProductoService = {
  create,
  retrieve,
  update,
  remove,
  list,
  count

};
export default ProductoService;