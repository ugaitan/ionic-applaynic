import { Injectable } from '@angular/core';
import { ModCarrito,ModProducto } from '../models/modelo';

import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  carrito: ModCarrito[] =[];
  productos: ModProducto[]=[];
  alcarrito: any=[];
  productosenCarrito: number=0;
  urlFaceBook: string = "https://www.facebook.com/PlayNicPlayNic?locale=es_LA";
  urlWhatsApp: string = "https://wa.me/+50588669751";

  constructor(
    private router: Router
  ) { }

  private productos2=[
    {"id":1,"descripcion":"","precio":600,"imagen":"assets/imagen/mochila3.jpg"},
    {"id":2,"descripcion":"","precio":700,"imagen":"assets/imagen/mochila4.jpg"},
    {"id":3,"descripcion":"","precio":800,"imagen":"assets/imagen/mochila5.jpg"},
    {"id":4,"descripcion":"","precio":900,"imagen":"assets/imagen/mochila6.jpg"},
  ];

  getProductos(){
    this.productos = this.productos2;
    return this.productos;
  }
  
  getCarrito(){
    return this.carrito;
  }
  
  addProducto(p_producto: any){
    var nuevo=1;
    if(this.carrito.length>0){      
      for(let i=0;i<this.carrito.length;i++){
        if(this.carrito[i].id==p_producto.id){
          this.carrito[i].cantidad = this.carrito[i].cantidad + 1
          nuevo=0;
          break;
        }
      };
    }    
    if(nuevo==1){
      this.addCarrito(p_producto,1);
    }      
  }

  addCarrito(p_producto: any,p_cantidad: number){
    this.alcarrito=[];
    this.alcarrito.id=p_producto.id;
    this.alcarrito.descripcion=p_producto.descripcion;
    this.alcarrito.precio=p_producto.precio;
    this.alcarrito.imagen=p_producto.imagen;
    this.alcarrito.cantidad=p_cantidad;
    this.carrito.push(this.alcarrito);
  }

  removeCarrito(){
    this.carrito=[];
  }

  setProductosenCarrito(p_cantidad:number){
    this.productosenCarrito = p_cantidad;
  }

  getProductosenCarrito(){
    return this.productosenCarrito;
  }

  irFaceBook(){
    window.open(this.urlFaceBook,"_blank");
  }

  irWhatsApp(){
    window.open(this.urlWhatsApp,"_blanck")
  }

}
