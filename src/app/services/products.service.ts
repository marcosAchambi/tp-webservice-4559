import { Injectable } from '@angular/core';
import {
  Product
} from './shopping-cart.service';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[] = [
    {
      id: 1,
      name: 'Celular Samsung Galaxy A16 5G 256GB Gris',
      description: 'El celular Samsung A16 5G posee un moderno y atractivo diseño, que adopta una estética sobria y práctica.',
      image: '/punto2/a16.png',
      price: 439,
      descuento: 30,
      estado:"disponible"
    },
    {
      id: 2,
      name: 'Celular Samsung Galaxy A56 5G 256GB Olive',
      description: 'El celular Samsung Galaxy A56 5G te permitirá ver todo tu contenido, imágenes, redes sociales y más, con una calidad increíble, gracias a su pantalla Super AMOLED ',
      image: '/punto2/a56.png',
      price: 999,
      descuento: 30,
      estado: "descuento"
    },
    {
      id: 3,
      name: 'Celular Motorola G75 5G 128GB Charcoal Grey',
      description: 'Con el Motorola G75, experimentá el desempeño del procesador Qualcomm® Snapdragon® 6 Gen 3 y los 128 GB de almacenamiento',
      image: '/punto2/moto_g75.png',
      price: 499,
      descuento: 30,
      estado: "vendido"
    },
    {
      id: 4,
      name: 'Celular Realme Note 50 3GB 64GB Midnight Black',
      description: 'El Realme Note 50 ofrece una pantalla de 6,7 pulgadas con una resolución 720x1600 pixeles.',
      image: '/punto2/note_50.png',
      price: 199,
      descuento: 30,
      estado: "disponible"
    },
    {
      id: 5,
      name: 'Celular Oppo A40 256GB Café',
      description: 'El Oppo A40 posee una batería 5100mAh para que disfrutes de tu smartphone durante todo el día. ',
      image: '/punto2/oppo_a40.png',
      price: 315,
      descuento: 30,
      estado: "reparacion"
    },
    {
      id: 6,
      name: 'Celular TCL 505s 4GB 256GB Space Gray',
      description: 'El celular TCL 505s ofrece una amplia pantalla de 6,75” que brinda una excelente experiencia inmersiva de visualización cinematográfica',
      image: '/punto2/tcl_505s.png',
      price: 279,
      descuento: 10,
      estado: "descuento"
    }
  ]
  getProducts(): Product[] {
    return this.products;
  }
  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }
}
