import { Injectable } from '@angular/core';
import {
  BehaviorSubject
} from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  descuento: number;
  estado: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]> ([]);

  constructor() {
  }

  getCartItems() {
    return this.cartSubject.asObservable ();
  }

  addToCart(product: Product) {
    const existingItem = this.cartItems.find (item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push ({
        product,
        quantity: 1
      });
    }

    this.cartSubject.next ([...this.cartItems]);
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter (item => item.product.id !== productId);
    this.cartSubject.next ([...this.cartItems]);
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find (item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.cartSubject.next ([...this.cartItems]);
    }
  }

  getTotal(): number {
    return this.cartItems.reduce ((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }
  getTotalDescuento():number{
    return this.cartItems.reduce ((total, item) => {
      return total + (item.product.price - ((item.product.price*item.product.descuento)/100) * item.quantity);
    }, 0);

  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next ([]);
  }
}
