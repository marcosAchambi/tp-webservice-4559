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
  NgIf
} from '@angular/common';

@Component({
  selector: 'app-punto2',
  imports: [
    NgIf
  ],
  templateUrl: './punto2.component.html',
  styleUrl: './punto2.component.css'
})
export class Punto2Component implements OnInit {
  products: Product[] = [];
  constructor(
    private productsService: ProductsService,
    private shoppingCartService: ShoppingCartService
  ) {}
  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }
  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
    console.log('Producto agregado al carrito:', product);
  }
}
