import { Country } from './country';
import { Region } from './region.type';

export interface CacheStore {
  [key: string]: {
    term: Region | string;
    countries: Country[];
  };
}

