import {
  Component,
  OnInit
} from '@angular/core';
import {
  CartItem,
  ShoppingCartService
} from '../../services/shopping-cart.service';
import {
  NgClass,
  NgForOf,
  NgIf
} from '@angular/common';

@Component ({
  selector: 'app-shopping-cart',
  imports: [
    NgIf,
    NgClass,
    NgForOf
  ],
  template: `
    <button type="button"
            (click)="toggleCart()"
            class="relative flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
      <svg class="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
      </svg>
      Carrito
      <span *ngIf="cartItems.length > 0" class="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
    {{ cartItems.length }}
  </span>
    </button>

    <!-- Slide-over panel para el carrito de compras -->
    <div class="relative z-10" *ngIf="isCartOpen" role="dialog" aria-modal="true">
      <!-- Fondo oscuro -->
      <div class="fixed inset-0 bg-opacity-75 dark:bg-opacity-75 transition-opacity" aria-hidden="true" (click)="closeCart()"></div>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <!-- Panel deslizante del carrito -->
            <div class="pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500"
                 [ngClass]="{'translate-x-0': isCartOpen, 'translate-x-full': !isCartOpen}">
              <div class="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-800 shadow-xl">
                <!-- Cabecera del carrito -->
                <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div class="flex items-start justify-between">
                    <h2 class="text-lg font-medium text-gray-900 dark:text-white" id="slide-over-title">
                      Carrito
                      de
                      compras</h2>
                    <div class="ml-3 flex h-7 items-center">
                      <button type="button" (click)="closeCart()" class="relative -m-2 p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200">
                        <span class="absolute -inset-0.5"></span>
                        <span class="sr-only">Cerrar panel</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Lista de productos en el carrito -->
                  <div class="mt-8">
                    <div class="flow-root">
                      <ul role="list" class="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
                        <!-- Mensaje si el carrito está vacío -->
                        <li *ngIf="cartItems.length === 0" class="py-6 text-center text-gray-500 dark:text-gray-400">
                          Tu
                          carrito
                          está
                          vacío
                        </li>

                        <!-- Productos en el carrito -->
                        <li *ngFor="let item of cartItems" class="flex py-6">
                          <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                            <img src="{{item.product.image}}" alt="{{item.product.name}}" class="h-full w-full object-cover object-center">
                          </div>

                          <div class="ml-4 flex flex-1 flex-col">
                            <div>
                              <div class="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                <h3>
                                  <a href="#">{{ item.product.name }}</a>
                                </h3>
                                <p class="ml-4">{{ formatCurrency(item.product.price - ((item.product.price * item.product.descuento) / 100)) }}</p>
                              </div>
                              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ item.product.description }}</p>
                            </div>
                            <div class="flex flex-1 items-end justify-between text-sm">
                              <div class="flex items-center">
                                <span class="text-gray-500 dark:text-gray-400 mr-2">Cantidad</span>
                                <div class="flex border rounded dark:border-gray-700">
                                  <button (click)="updateQuantity(item.product.id, item.quantity - 1)"
                                          class="px-2 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    -
                                  </button>
                                  <span class="px-2 py-1 dark:text-gray-300">{{ item.quantity }}</span>
                                  <button (click)="updateQuantity(item.product.id, item.quantity + 1)"
                                          class="px-2 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    +
                                  </button>
                                </div>
                              </div>

                              <div class="flex">
                                <button (click)="removeItem(item.product.id)" type="button" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                                  Eliminar
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Pie del carrito con total y botones -->
                <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-6 sm:px-6">
                  <div class="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                    <p>Subtotal</p>
                    <p>{{ formatCurrency(total) }}</p>
                    <p>
                      Subtotal descuneto</p>
                    <p>{{ formatCurrency(totalDescuento) }}</p>
                  </div>
                  <p class="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                    Envío e impuestos calculados al finalizar la compra.</p>
                  <!-- Botón para pagar -->
                  <div class="mt-6" *ngIf="cartItems.length > 0">
                    <a href="#" class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                      Finalizar compra
                    </a>
                  </div>

                  <!-- Botón para vaciar carrito -->
                  <div class="mt-3" *ngIf="cartItems.length > 0">
                    <button (click)="clearCart()" type="button" class="flex w-full items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600">
                      Vaciar
                      carrito
                    </button>
                  </div>

                  <!-- Botón para seguir comprando -->
                  <div class="mt-6 flex justify-center text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>
                      o
                      <button (click)="closeCart()" type="button" class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                        Continuar
                        comprando
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .translate-x-0 {
      transform: translateX(0);
    }

    .translate-x-full {
      transform: translateX(100%);
    }

    /* Scroll personalizado para el carrito */
    ::-webkit-scrollbar {
      width: 6px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: #cbd5e0;
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #a0aec0;
    }
  `
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  totalDescuento : number = 0;
  isCartOpen: boolean = false;

  constructor(private cartService: ShoppingCartService) {
  }

  ngOnInit(): void {
    this.cartService.getCartItems ().subscribe (items => {
      this.cartItems = items;
      this.calculateTotal ();
    });
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  closeCart(): void {
    this.isCartOpen = false;
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart (productId);
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateQuantity (productId, quantity);
    }
  }

  calculateTotal(): void {
    this.total = this.cartService.getTotal ();
    this.totalDescuento= this.cartService.getTotalDescuento();
  }

  clearCart(): void {
    this.cartService.clearCart ();
  }

  formatCurrency(value: number): string {
    return '$' + value.toLocaleString ('es-AR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }
}
