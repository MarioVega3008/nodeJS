package com.nodejs.test.nodejs.dto;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class NewProductoDTO {
    @NotNull(message = "nombre")
    private String nombre;
    @NotNull(message = "fecha de vencimineto")
    private String fechavencimiento;
    private String categoria; 
    private double precio;   
    private short peso;    
         
}
