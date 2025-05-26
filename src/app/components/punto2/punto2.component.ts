import {
  Component,
  OnInit
} from '@angular/core';
import {
  NgForOf,
  NgIf
} from '@angular/common';
import {
  Car
} from '../../models/car.model';
import {
  CarService
} from '../../services/car.service';

@Component ({
  selector: 'app-punto2',
  imports: [NgForOf, NgIf],
  templateUrl: './punto2.component.html',
  styleUrl: './punto2.component.css'
})
export class Punto2Component implements OnInit {
  cartItems!: Array<Car>;
  selectedCar: Car | null = null;
  carModels: string[] = [];
  showModal = false;

  constructor(private carService: CarService) {
    this.viewCars ();
  }

  ngOnInit(): void {
  }

  private viewCars() {
    this.carService.getCars ().subscribe ((data: any) => {
      this.cartItems = data.map ((item: any) => new Car (item.id, item.name));
    });
  }

  openModels(car: Car) {
    this.selectedCar = car;
    this.carService.getModels (car.id).subscribe ((data: any) => {
      this.carModels = data.map ((model: any) => model.name);
      this.showModal = true;
    });
  }

  closeModal() {
    this.showModal = false;
    this.carModels = [];
  }
}
