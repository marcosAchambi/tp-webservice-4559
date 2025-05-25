// src/app/components/punto3/punto3.component.ts
import {
  Component,
  OnInit
} from '@angular/core';
import {
  CurrencyPipe,
  NgForOf,
  NgIf
} from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  CurrencyService
} from '../../services/currency.service';

@Component ({
  selector: 'app-punto3',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    CurrencyPipe
  ],
  templateUrl: './punto3.component.html',
  styleUrl: './punto3.component.css'
})
export class Punto3Component implements OnInit {

  currencies: any[] = []; // Declarar correctamente
  exchangeRates: any = {}; // Declarar correctamente

  converterForm: FormGroup;
  convertedAmount: number = 0;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private currencyService: CurrencyService) {
    this.converterForm = this.fb.group ({
      amount: ['', [Validators.required, Validators.min (0.01)]],
      fromCurrency: ['USD', Validators.required],
      toCurrency: ['EUR', Validators.required]
    });
  }

  ngOnInit(): void {
    this.currencyService.getCurrencyList ().subscribe ((data: any) => {
      this.currencies = Object.entries (data.currencies).map (([code, name]: any) => ({
        code,
        name,
        symbol: this.getCurrencySymbol (code)
      }));
    });

    this.loadExchangeRates ('USD');
    this.converterForm.valueChanges.subscribe (() => {
      if (this.converterForm.valid) {
        this.convertCurrency ();
      }
    });
  }

  loadExchangeRates(source: string) {
    const toCurrencies = this.currencies.map (c => c.code).join (',');
    this.currencyService.getCurrencyLive (source, toCurrencies).subscribe ((data: any) => {
      this.exchangeRates = {};
      Object.keys (data.quotes).forEach (key => {
        const from = key.substring (0, 3);
        const to = key.substring (3);
        if (!this.exchangeRates[from]) this.exchangeRates[from] = {};
        this.exchangeRates[from][to] = data.quotes[key];
      });
    });
  }

  convertCurrency(): void {
    if (this.converterForm.invalid) return;
    this.isLoading = true;
    const {
      amount,
      fromCurrency,
      toCurrency
    } = this.converterForm.value;

    if (!this.exchangeRates[fromCurrency]) {
      this.loadExchangeRates (fromCurrency);
      setTimeout (() => this.convertCurrency (), 600);
      return;
    }

    setTimeout (() => {
      if (fromCurrency === toCurrency) {
        this.convertedAmount = amount;
      } else {
        const rate = this.getExchangeRate (fromCurrency, toCurrency);
        this.convertedAmount = amount * rate;
      }
      this.isLoading = false;
    }, 500);
  }

  getExchangeRate(from: string, to: string): number {
    if (this.exchangeRates[from] && this.exchangeRates[from][to]) {
      return this.exchangeRates[from][to];
    }
    return 1;
  }

  getCurrencySymbol(code: string): string {
    const symbols: any = {
      USD: '$',
      EUR: '€',
      ARS: '$',
      GBP: '£'
    };
    return symbols[code] || code;
  }

  swapCurrencies(): void {
    const fromCurrency = this.converterForm.get ('fromCurrency')?.value;
    const toCurrency = this.converterForm.get ('toCurrency')?.value;
    this.converterForm.patchValue ({
      fromCurrency: toCurrency,
      toCurrency: fromCurrency
    });
  }

  get amount() {
    return this.converterForm.get ('amount');
  }

  get fromCurrency() {
    return this.converterForm.get ('fromCurrency');
  }

  get toCurrency() {
    return this.converterForm.get ('toCurrency');
  }
}
