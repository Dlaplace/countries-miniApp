import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialInputValue: string = '';

  private CAPITAL: string = 'capital';

  constructor(
    private countriesService: CountriesService
  ) { }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore[this.CAPITAL].countries;
    this.initialInputValue = this.countriesService.cacheStore[this.CAPITAL].term;
    console.log(this.initialInputValue)
  }

  searchByCapital(term: string): void {
    this.isLoading = true;
    this.countriesService.searchCountry(term, this.CAPITAL)
      .subscribe(countries =>{
        this.countries = countries;
        this.isLoading = false;
      });
  }

}
