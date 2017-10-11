export enum Categories {
  Work = 'Work'
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
