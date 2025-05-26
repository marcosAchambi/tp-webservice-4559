
export class Stock {
  logo: string;
  name: string;
  symbol: string;
  companyName: string;
  sector: string;
  industry: string;
  description: string;
  employees: number;
  country: string;
  founded: number;
  website: string;
  city: string;
  state: string;

  constructor(logo: string, name: string, symbol: string, companyName: string, sector: string, industry: string, description: string, employees: number, country: string, founded: number, website: string, city: string, state: string) {
    this.logo = logo;
    this.name = name;
    this.symbol = symbol;
    this.companyName = companyName;
    this.sector = sector;
    this.industry = industry;
    this.description = description;
    this.employees = employees;
    this.country = country;
    this.founded = founded;
    this.website = website;
    this.city = city;
    this.state = state;
  }
}
