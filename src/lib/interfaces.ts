export enum Categories {
  All = 'All',
  Work = 'Work',
  Other = 'Other',
  Study = 'Study'
}

export enum Subcategories {
  All = 'All'
}

export enum Types {
  New = 'New',
  Renewal = 'Renewal'
}

export interface AvailabilityParams {
  type: Types;
  category?: Categories;
  subcateogry?: Subcategories;
}
