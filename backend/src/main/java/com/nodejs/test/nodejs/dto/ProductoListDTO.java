package com.nodejs.test.nodejs.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductoListDTO {
    private Long id;
    private String nombre;
    private String fechavencimiento;
    private short categoria;   
    private short precio;  
}
