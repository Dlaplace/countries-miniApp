import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    capital: {
      term: '',
      countries: []
    },
    name: {
      term: '',
      countries: []
    },
    region: {
      term: '',
      countries: []
    },
  }

  constructor(private http: HttpClient) {
    this.loadToLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('countries', JSON.stringify(this.cacheStore));
  }

  private loadToLocalStorage(): void {
    if ( !localStorage.getItem('countries') ) {
      return;
    }
    this.cacheStore = JSON.parse(localStorage.getItem('countries')!);

  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
        delay(200),
      );
  }

  searchCountry(searchTerm: string, type: string | Region): Observable<Country[]> {
    const url = `${this.apiUrl}/${type}/${searchTerm}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore[type] = { term: searchTerm, countries} ),
        tap( () => this.saveToLocalStorage() ),
      );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError( () => of(null) )
      );
  }
}
