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
export class NewService {
  constructor(private _http: HttpClient) {  }

  public getNews(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Rapidapi-Key': 'f99329a568mshb54b6edf54e6da3p15d5bejsncabbcf2312b9',
        'X-Rapidapi-Host': 'livescore6.p.rapidapi.com'
      })
    };
    return this._http.get ('https://livescore6.p.rapidapi.com/news/v2/list', httpOptions);
  }
}


