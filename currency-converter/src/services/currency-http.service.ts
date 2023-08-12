import http from "../http-common";

interface ConversionHistory {
  id: number;
  timestamp: string;
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: number;
  convertedAmount: number;
}

interface Currency {
  code: string;
  name: string;
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
  getExchangeRatesExternal(baseCurrency: string) {
    return http.get(`https://api.frankfurter.app/latest?from=${baseCurrency}`);
  }
  async updateExchangeRates() {
    try {
      const response = await this.getCurrencies();
      const currencies: Currency[] = response.data;
      const updateData: ExchangeRates = {};

      for (const sourceCurrency of currencies) {
        const ratesResponse = await this.getExchangeRatesExternal(sourceCurrency.code);
        const exchangeRates = ratesResponse.data.rates;
        updateData[sourceCurrency.code] = exchangeRates;
      }

      await http.put('/exchangeRates', updateData);
    } catch (error) {
      console.error('Error updating exchange rates:', error);
      return Promise.reject(error);
    }
  }
}

const newCurrencyService = new CurrencyService();

export default newCurrencyService;