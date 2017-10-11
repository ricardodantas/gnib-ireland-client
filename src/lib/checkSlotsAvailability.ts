import request = require('request-promise');
import { Types, Categories, Subcategories } from './interfaces';

function buildUrl(type: Types, category: Categories, subcategory: Subcategories): string {
  return `https://burghquayregistrationoffice.inis.gov.ie/Website/AMSREG/AMSRegWeb.nsf/(getAppsNear)?openpage&cat=${category}&sbcat=${subcategory}&typ=${type}&_=1507583431263`;
}

export async function checkSlotsAvailability(type: Types = Types.New, category: Categories = Categories.Work, subcategory: Subcategories = Subcategories.All): Promise<any> {
  try {
    const response = await request({
      url: buildUrl(type, category, subcategory),
      ciphers: 'DES-CBC3-SHA',
      rejectUnauthorized: false
    });
    return {
      status: 'success',
      data: JSON.parse(response)
    };
  } catch(error) {
    return {
      status: 'error',
      error
    };
  }
}