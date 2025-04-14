import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  type AllCurrenciesRecord,
  Currencies,
  type SupportedCurrencies,
  type SupportedCurrenciesRecord,
  isSupportedCurrencyRecord,
  supportedCurrenciesRecords,
} from '@/types/Currencies.ts'
import axios from 'axios'

type SupportedCurrenciesMapToNames = { [K in SupportedCurrencies]: string }

export const useCurrencyStore = defineStore('currency', () => {
  const currentCurrency = ref<SupportedCurrencies>(Currencies.Russia)
  let currencyRates: SupportedCurrenciesRecord | undefined = undefined

  const getSupportedCurrencies = (): SupportedCurrenciesMapToNames => {
    return {
      [Currencies.Europe]: 'EUR',
      [Currencies.Russia]: 'RUB',
      [Currencies.USA]: 'USD',
    }
  }

  const getCurrenciesRates = async () => {
    if (currencyRates !== undefined) return currencyRates

    const result = await axios.get<AllCurrenciesRecord>(
      'https://status.neuralgeneration.com/api/currency',
    )

    currencyRates = supportedCurrenciesRecords
      .filter((key) => isSupportedCurrencyRecord(key))
      .reduce<SupportedCurrenciesRecord>((acc, key) => {
        acc[key] = result.data[key]
        return acc
      }, {})

    return currencyRates
  }

  const convert = (
    amount: number,
    fromCurrency: SupportedCurrencies,
    toCurrency: SupportedCurrencies,
  ) => {
    const key = `${fromCurrency}-${toCurrency}`

    if (!currencyRates || !isSupportedCurrencyRecord(key) || !currencyRates[key]) {
      throw new Error('Одна из валют не поддерживается.')
    }

    const amountTo = amount * currencyRates[key]
    return parseFloat(amountTo.toFixed(2))
  }

  return {
    currentCurrency,
    getSupportedCurrencies,
    getCurrenciesRates,
    convert,
  }
})
