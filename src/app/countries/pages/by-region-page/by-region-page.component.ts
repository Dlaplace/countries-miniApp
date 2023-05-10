import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public initialValue: Region = '';

  private REGION: string = 'region';

  constructor(
    private countriesService: CountriesService
  ) { }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore[this.REGION].countries;
    this.initialValue = this.countriesService.cacheStore[this.REGION].term as Region;
    if (this.initialValue) {
      this.selectedRegion =this.initialValue;
    }
  }

  searchByRegion(searchTerm: Region) {
    this.selectedRegion = searchTerm;
    this.countriesService.searchCountry(searchTerm, this.REGION).subscribe(countries => {
      this.countries = countries;
    })
  }
}
