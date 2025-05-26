import {
  Component,
  OnInit
} from '@angular/core';
import {
  StockService
} from '../../services/stock.service';
import {
  CommonModule
} from '@angular/common';

import {
  Stock
} from '../../models/stock.model';

@Component ({
  selector: 'app-punto5',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto5.component.html',
  styleUrl: './punto5.component.css'
})
export class Punto5Component implements OnInit {
  companies: {
    id: string,
    name: string
  }[] = [];
  selectedCompany: {
    id: string,
    name: string
  } | null = null;
  selectedStockDetails: Stock | null = null;


  constructor(private stockService: StockService) {
  }

  ngOnInit(): void {
    this.stockService.getStockList ().subscribe ({
      next: (response) => {
        const topCompanies = response?.data?.[0]?.attributes?.top_companies || [];
        this.companies = topCompanies.map ((symbol: string) => ({
          id: symbol,
          name: symbol
        }));
      },
      error: (err) => {
        console.error ('Error al obtener stocks', err);
      }
    });
  }

  selectCompany(company: {
    id: string,
    name: string
  }) {
    this.selectedCompany = company;
    this.stockService.getStockDetails (company.id).subscribe ({
      next: (response) => {
        this.selectedStockDetails = this.stockService.mapStock (response);
      },
      error: (err) => {
        console.error ('Error al obtener detalles', err);
        this.selectedStockDetails = null;
      }
    });
  }
}
