import http from "../http-common";

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
    updateExchangeRates() {
        return http.post('/rates-update');
    }
}

export default new CurrencyService();