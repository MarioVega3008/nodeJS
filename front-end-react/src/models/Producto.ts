
export default interface IProductoModel {
    id?: number | null,
    nombre : string,
    fechaVencimiento : string,
    categoria?:   string | null ,
    precio?:      number | null ,
    peso?:        number | null   
 
}