export interface Country {
  countryCode: string;
  name: string;
}

export interface CountryPublicHolidays {
  date: string;
  name: string;
  countryCode: string;
  global: true;
  counties: [string];
  launchYear: number;
  types: [string];
}
