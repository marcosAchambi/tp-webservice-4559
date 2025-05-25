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
export class CarService {

  constructor(private _http: HttpClient) { }
  public getCars(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders ({
        'X-Rapidapi-Key': 'f99329a568mshb54b6edf54e6da3p15d5bejsncabbcf2312b9',
        'X-Rapidapi-Host': 'car-specs.p.rapidapi.com'
      })
    };
    return this._http.get('https://car-specs.p.rapidapi.com/v2/cars/makes', httpOptions);
  }
}
