import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public initialInputValue: string = '';
  private NAME:string = "name";

  constructor(
    private countryService: CountriesService
  ) { }

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore[this.NAME].countries;
    this.initialInputValue = this.countryService.cacheStore[this.NAME].term;
  }


  searchByCountry(searchTerm: string) {
    this.countryService.searchCountry(searchTerm, this.NAME).subscribe(countries => {
      this.countries = countries;
    })
  }

}
