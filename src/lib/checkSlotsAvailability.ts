import fetch from 'node-fetch';
import {
  Types,
  Categories,
  Subcategories
} from './interfaces';

let k = '00000000000000000000000000000000';
let p = '00000000000000000000000000000000';

const K_TAG = '<input id="k" type="hidden" value="';
const P_TAG = '<input id="p" type="hidden" value="';
const headers = {
  Host: 'burghquayregistrationoffice.inis.gov.ie',
  'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:62.0) Gecko/20100101 Firefox/62.0',
  Accept: 'application/json, text/javascript, */*; q=0.01',
  Referer: 'https://burghquayregistrationoffice.inis.gov.ie/Website/AMSREG/AMSRegWeb.nsf/AppSelect?OpenForm',
  'X-Requested-With': 'XMLHttpRequest',
  Cookie: '_ga=GA1.3.1378869052.1536830642; _gid=GA1.3.1590764695.1537783699; cookieconsent_status=dismiss',
  Connection: 'keep-alive',
};

function buildUrl(type: Types, category: Categories, subcategory: Subcategories): string {
  return `https://burghquayregistrationoffice.inis.gov.ie/Website/AMSREG/AMSRegWeb.nsf/(getApps4DTAvailability)?readform&&cat=${category}&sbcat=${subcategory}&typ=${type}`;
}

function getSlots(json) {
  return typeof json.slots === 'string' ? JSON.parse(json.slots) : json.slots
}

async function isSessionExpired(slots) {
  return slots !== undefined ? slots : await getNewTokens()
}

function logMessage(slots): Array<any> {
  const message = getLogMessage(slots);
  console.info(new Date(), message);
  return slots;
}

function buildReturn({slots, type, category, subcategory}) {
  return {
    status: 'success',
    data: {
      type,
      category,
      subcategory,
      slots
    }
  };
}

async function getNewTokens() {
  let keep = true

  while (keep) {
    try {
      const response = await fetch(
        'https://burghquayregistrationoffice.inis.gov.ie/Website/AMSREG/AMSRegWeb.nsf/AppSelect?OpenForm'
      )
      const page = await response.text()

      const {
        newK,
        newP
      } = getKayAndPiTokensFromPage(page)

      k = newK
      p = newP

      keep = false
    } catch (err) {}
  }

  console.info('Tokens expired, restarting with new tokens!')
  return []
}

function getLogMessage(slots) {
  return slots.length > 0 ?
    `Dates found: ${JSON.stringify(slots)}` :
    'No dates available at the moment'
}

function getKayAndPiTokensFromPage(page) {
  const kStartIndex = page.lastIndexOf(K_TAG) + K_TAG.length
  const pStartIndex = page.lastIndexOf(P_TAG) + P_TAG.length
  const newK = page.substring(kStartIndex, kStartIndex + k.length)
  const newP = page.substring(pStartIndex, pStartIndex + p.length)

  return {
    newK,
    newP
  }
}

export async function checkSlotsAvailability(type: Types = Types.New, category: Categories = Categories.Study, subcategory: Subcategories = Subcategories.All): Promise<any> {
  try {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    const URL_CHECK_SLOTS = buildUrl(type, category, subcategory);
    const requestResult = await fetch(URL_CHECK_SLOTS + `&k=${k}` + `&p=${p}`, {
      method: 'GET',
      headers
    })
      .then(res => res.json())
      .then(getSlots)
      .then(isSessionExpired)
      .then(logMessage)
      .then(slots => buildReturn({slots, type, category, subcategory}));
    return requestResult;
  } catch(error) {
    return {
      status: 'error',
      error,
      data: {
        type,
        category,
        subcategory,
      }
    };
  }
}
