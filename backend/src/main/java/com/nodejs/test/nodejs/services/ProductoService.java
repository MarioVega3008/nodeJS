package com.nodejs.test.nodejs.services;

import java.util.List;

import com.nodejs.test.nodejs.dto.ProductoDTO;
import com.nodejs.test.nodejs.dto.ProductoListDTO;
import com.nodejs.test.nodejs.dto.NewProductoDTO;

public interface ProductoService {
    
    public ProductoDTO create(NewProductoDTO productoDTO);
    public ProductoDTO retrieve(Long id);
    public ProductoDTO update(ProductoDTO productoDTO, Long id);
    public void delete(Long id);
    public long count();

    public List<ProductoListDTO> list(int page, int size, String sort);
}
