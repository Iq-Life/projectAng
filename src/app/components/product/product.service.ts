import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, catchError, map, of, retry, throwError } from "rxjs";
import { ErrorService } from "src/app/services/error.service";
import { Product } from "src/app/models/product";
import { CountryDTO } from "src/app/models/country";
import { Countries } from "src/app/data/countries";

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
    ) {
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products', {
      params: new HttpParams({
        fromObject: {limit: 5} 
      })
    }).pipe(
      retry(2),
      catchError(this.errorHandler.bind(this))
    )
  }

  create(product:any): Observable<any> {
    return this.http.post<Product[]>('https://fakestoreapi.com/products', product)
  }

  getCountry(): Observable<CountryDTO[]> {
    return this.http
      .get<CountryDTO[]>(`https://fakestoreapi.com/products`)
      .pipe(
        catchError(() => {
          return of([] as CountryDTO[]);
        }),
        map(() =>
        Countries
        )
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
