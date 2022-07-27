package com.nodejs.test.nodejs.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import com.nodejs.test.nodejs.dto.ProductoDTO;
import com.nodejs.test.nodejs.dto.ProductoListDTO;
import com.nodejs.test.nodejs.dto.NewProductoDTO;
import com.nodejs.test.nodejs.exceptions.NoContentException;
import com.nodejs.test.nodejs.exceptions.ResourceNotFoundException;
import com.nodejs.test.nodejs.models.Producto;
import com.nodejs.test.nodejs.repositories.ProductoRepository;
import com.nodejs.test.nodejs.services.ProductoService;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductoServiceImpl implements ProductoService {

    final ModelMapper modelMapper;
    final ProductoRepository productoRepository;

    public ProductoServiceImpl(ProductoRepository repository, ModelMapper mapper){
        this.productoRepository = repository;
        this.modelMapper = mapper;
    }

    @Override
    @Transactional
    public ProductoDTO create(NewProductoDTO productoDTO) {
        Producto producto = modelMapper.map(productoDTO, Producto.class);
        productoRepository.save(producto);        
        return modelMapper.map(producto, ProductoDTO.class); 
    }

    @Override
    @Transactional(readOnly = true)
    public ProductoDTO retrieve(Long id) {
        Producto producto = productoRepository.findById(id)
            .orElseThrow(()-> new ResourceNotFoundException("Productos not found"));
        return modelMapper.map(producto, ProductoDTO.class);
    }

    @Override
    @Transactional
    public ProductoDTO update(ProductoDTO productoDTO, Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Producto not found"));        
              
        Producto productoUpdated = modelMapper.map(productoDTO, Producto.class);
        //Keeping values
        productoUpdated.setCreatedBy(producto.getCreatedBy());
        productoUpdated.setCreatedDate(producto.getCreatedDate());
        productoRepository.save(productoUpdated);   
        return modelMapper.map(productoUpdated, ProductoDTO.class);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Producto not found"));        
        productoRepository.deleteById(producto.getId());        
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductoListDTO> list(int page, int size, String sort) {
        Pageable pageable = sort == null || sort.isEmpty() ? 
                    PageRequest.of(page, size) 
                :   PageRequest.of(page, size,  Sort.by(sort));

        Page<Producto> productos = productoRepository.findAll(pageable);
        if(productos.isEmpty()) throw new NoContentException("Productos is empty");
        return productos.stream().map(producto -> modelMapper.map(producto, ProductoListDTO.class))
            .collect(Collectors.toList());        
    }

    @Override
    public long count() {        
        return productoRepository.count();
    }
    
}
