import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../services/service.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  items: any;
  verBotonLimpia: boolean=false;

  constructor(
    private servicio:ServiceService, 
    private alertaIonic: AlertController,
    private router:Router) 
    { }

  ngOnInit() {
    this.items=this.servicio.getCarrito();
    this.verBotonLimpia=this.items.length==0?false:true;
  }

  alCatalogo(){    
    let cantidad: number=0;
    
    for(let e of this.items){
      cantidad += e.cantidad;
    }; 
    
    this.servicio.setProductosenCarrito(cantidad);
    this.router.navigate(['home']);
  }

  limpiaCarrito(){
    this.items=[];
    this.servicio.removeCarrito();
    this.servicio.setProductosenCarrito(0);
    this.router.navigate(['home']);


  }

  borraProducto(indice: any){    
    this.items.splice(indice,1);
    this.verBotonLimpia=this.items.length==0?false:true;
    
    if(!this.verBotonLimpia){
      this.alCatalogo();
    }
  }

  sumaProducto(indice: any){    
    this.items[indice].cantidad += 1;
  }

  restaProducto(indice: any){
    let _cantidad = this.items[indice].cantidad - 1;
    if(_cantidad>0){
      this.items[indice].cantidad = _cantidad;
    }
      
  }

  async presenteAlerta(){
    const alerta=await this.alertaIonic.create({
      cssClass: '',
      header:'Alerta',
      subHeader:'Subtitulo',
      message:'Alerta para realizar la compra',
      buttons: ['Aceptar']
    });
    await alerta.present();
    const {role} = await alerta.onDidDismiss();
  }
  compraCarrito(){
    this.presenteAlerta();
  }

  setMensaje(){
    
    let pedido: string = "";
    let total: number=0;
    let mensaje: string="";
    let ultimaLinea: string="";

    for(let e of this.items){
      pedido += e.descripcion+" Cantidad: "+e.cantidad+" Precio: "+e.precio+" Total: "+e.cantidad*e.precio+" // ";
      total += e.cantidad*e.precio;
    };  

    ultimaLinea = "Monto total a facturar: " + total;

    mensaje = "?text=" + pedido + ultimaLinea;
    
    const link =this.servicio.urlWhatsApp + mensaje;
    
    window.open(link,"_blank");

  }


  irFaceBook(){
    this.servicio.irFaceBook();
  }

  irWhatsApp(){
    this.servicio.irWhatsApp();
  }

}
