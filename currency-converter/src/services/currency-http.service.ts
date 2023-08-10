import http from "../http-common";

class CurrencyService{
    getCurrencies(){
        return http.get('/api/currencies');
    }
    getExchangeRates(baseCurrency:string){
        return http.get(`/api/exchange-rates?base=${baseCurrency}`);
    }
    performConversion(amount:number,sourceCurrency:string,targetCurrency:string){
        return http.get(`/api/convert?amount=${amount}&from=${sourceCurrency}?to=${targetCurrency}`);
    }
    getConversionHistory(){
        return http.get('/api/history');
    }
    updateExchangeRates(){
        return http.post('/api/rates-update');
    }
}

export default new CurrencyService();