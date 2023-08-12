import http from "../http-common";

interface ConversionHistory {
  id: number;
  timestamp: string;
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: number;
  convertedAmount: number;
}

interface ExchangeRates {
  [baseCurrency: string]: { [targetCurrency: string]: number };
}

class CurrencyService {
  getCurrencies() {
    return http.get('/currencies');
  }
  getExchangeRates(baseCurrency: string) {
    return http.get(`/exchangeRates?base=${baseCurrency}`);
  }
  performConversion(amount: number, sourceCurrency: string, targetCurrency: string) {
    return this.getExchangeRates(sourceCurrency)
      .then(response => {
        const exchangeRates = response.data;

        if (exchangeRates[sourceCurrency] && exchangeRates[sourceCurrency][targetCurrency]) {
          const rate = exchangeRates[sourceCurrency][targetCurrency];
          const convertedAmount = amount * rate;
          return Promise.resolve({ data: { convertedAmount } });
        } else {
          return Promise.reject(new Error(`Exchange rate for ${sourceCurrency} to ${targetCurrency} not found.`));
        }
      })
      .catch(error => {
        console.error('Error performing conversion:', error);
        return Promise.reject(error);
      });
  }
  getConversionHistory() {
    return http.get('/conversionHistory');
  }
  addConversionHistory(historyData: ConversionHistory) {
    return http.post('/conversionHistory', historyData);
  }
  updateExchangeRates(baseCurrency: string) {
    return http.get(`https://api.frankfurter.app/latest?from=${baseCurrency}`)
      .then(response => {
        const rates = response.data.rates;

        const updatedExchangeRates: ExchangeRates = {
          [baseCurrency]: { ...rates }
        };

        return http.post('/exchangeRates', updatedExchangeRates);
      })
      .catch(error => {
        console.error('Error updating exchange rates:', error);
        return Promise.reject(error);
      });
  }
  updateCurrencies() {
    return http.get('https://api.frankfurter.app/currencies')
      .then(response => {
        const currenciesData = response.data;
        const currencyPairs = [];

        for (const code in currenciesData) {
          if (currenciesData.hasOwnProperty(code)) {
            const name = currenciesData[code];
            currencyPairs.push({ code, name });
          }
        }
        console.log(JSON.stringify(currencyPairs))
        //gives 500 error for some reason
        return http.post('/currencies', currencyPairs);
      })
      .catch(error => {
        console.error('Error updating currencies:', error);
        return Promise.reject(error);
      });
  }

}

const newCurrencyService = new CurrencyService();

export default newCurrencyService;