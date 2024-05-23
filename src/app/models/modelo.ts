export interface ModCarrito {
    id:number;
    descripcion:string;
    precio:number;
    imagen: string;
    cantidad:number;
}

export interface ModProducto {
    id:number;
    descripcion:string;
    precio:number;
    imagen: string;
}

export interface ModFactura{
    cantidad:number,
    precio:number,
    total:number
}
