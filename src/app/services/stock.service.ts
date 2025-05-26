import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  Stock
} from '../models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private _http: HttpClient) {
  }

  public getStockList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Rapidapi-Key' : 'f99329a568mshb54b6edf54e6da3p15d5bejsncabbcf2312b9',
        'X-Rapidapi-Host': 'seeking-alpha.p.rapidapi.com'
      })
    };
    return this._http.get('https://seeking-alpha.p.rapidapi.com/market/get-earnings-calendar?with_rating=false&currency=USD',httpOptions);
  }

  public getStockDetails(symbol: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders ({
        'X-Rapidapi-Key': 'f99329a568mshb54b6edf54e6da3p15d5bejsncabbcf2312b9',
        'X-Rapidapi-Host': 'seeking-alpha.p.rapidapi.com'
      })
    };
    return this._http.get (`https://seeking-alpha.p.rapidapi.com/symbols/get-meta-data?symbol=${symbol}`, httpOptions);
  }

  public mapStock(response: any): Stock {
    const attr = response.data.attributes;
    const meta = response.data.meta;
    const included = response.included || [];
    const companyInfo = included.find ((i: any) => i.type === 'companyInfo')?.attributes || {};
    const sector = included.find ((i: any) => i.type === 'sector')?.attributes?.name || '';
    const industry = included.find ((i: any) => i.type === 'sub_industry')?.attributes?.name || '';

    return new Stock (
      meta.companyLogoUrlLight,
      attr.company,
      attr.name,
      attr.companyName,
      sector,
      industry,
      companyInfo.businessDescription,
      companyInfo.numberOfEmployees,
      companyInfo.country,
      companyInfo.yearfounded,
      companyInfo.webpage,
      companyInfo.city,
      companyInfo.state
    );
  }
}
