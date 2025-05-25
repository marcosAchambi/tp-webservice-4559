import {
  Component,
  OnInit
} from '@angular/core';
import {
  Product,
  ShoppingCartService
} from '../../services/shopping-cart.service';
import {
  ProductsService
} from '../../services/products.service';
import {
  NgForOf
} from '@angular/common';
import {
  Car
} from '../../models/car.model';
import {
  CarService
} from '../../services/car.service';

@Component({
  selector: 'app-punto2',
  imports: [
    NgForOf
  ],
  templateUrl: './punto2.component.html',
  styleUrl: './punto2.component.css'
})
export class Punto2Component implements OnInit {
  products: Product[] = [];
  cartItems!: Array<Car>;
  cartItem!: Car;


  constructor(
    private productsService: ProductsService,
    private shoppingCartService: ShoppingCartService,
    private carService: CarService
  ) {
    this.viewCars();
  }
  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }
  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
    console.log('Producto agregado al carrito:', product);
  }

  private viewCars() {
    this.carService.getCars ().subscribe ((data: any) => {
      this.cartItems = data.map ((item: any) => {
          return new Car (
            item.id,
            item.name
          );
      });
    });
  }
}
