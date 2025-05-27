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
export class BookService {

  constructor(private _http: HttpClient) { }

  public getBook(year: String, month : String): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders ({
        'X-Rapidapi-Key': '36c3c902e4mshd611dd0973a3d42p1af69djsnb5e312555d5b',
        'X-Rapidapi-Host': ' hapi-books.p.rapidapi.com'
      })
    };
    return this._http.get (` https://hapi-books.p.rapidapi.com/month/${year}/${month}`, httpOptions);
  }
  public getBookById(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders ({
        'X-Rapidapi-Key': '36c3c902e4mshd611dd0973a3d42p1af69djsnb5e312555d5b',
        'X-Rapidapi-Host': ' hapi-books.p.rapidapi.com'
      })
    };
    return this._http.get (` https://hapi-books.p.rapidapi.com/book/${id}`, httpOptions);
  }
}
