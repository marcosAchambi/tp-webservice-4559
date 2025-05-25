import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private _http: HttpClient) { }
  public getCurrencyList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'apikey': 'g3EecMAkMcOzZOvyDLkqUf0WeUkIAeLn'
      })
    }
    return this._http.get('https://api.apilayer.com/currency_data/list', httpOptions)
  }

  public getCurrencyLive(source: string, currencies: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders ({
        'apikey': 'g3EecMAkMcOzZOvyDLkqUf0WeUkIAeLn'
      })
    };
    const url = `https://api.apilayer.com/currency_data/live?source=${source}&currencies=${currencies}`;
    return this._http.get (url, httpOptions);
  }

}
