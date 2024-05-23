import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../services/service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  items: any;
  conteoProducto: number = 0;
  verCarrito: boolean=false;


  constructor(
    private servicio:ServiceService,
    private activatedRoute: ActivatedRoute) 
  {        
  }

  ngOnInit(){    
    this.items=this.servicio.getProductos();
    this.verCarrito = this.servicio.getProductosenCarrito()==0?false:true;
  }

  addProducto(producto: any){
    this.servicio.addProducto(producto);
    this.conteoProducto += 1;
    this.verCarrito = this.conteoProducto==0?false:true;

  }

  ionViewWillEnter(){
    this.conteoProducto=this.servicio.getProductosenCarrito();
    this.verCarrito = this.conteoProducto==0?false:true;

  }

  irFaceBook(){
    this.servicio.irFaceBook();
  }

  irWhatsApp(){
    this.servicio.irWhatsApp();
  }

}
