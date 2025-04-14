/** Все доступные валюты */
export enum Currencies {
  Belarusian = 'blr',
  Europe = 'eur',
  Indonesia = 'idr',
  Kazakhstan = 'kzt',
  Russia = 'rub',
  USA = 'usd',
}

/** Поддерживаемые валюты */
export const supportedCurrencies = [Currencies.Europe, Currencies.USA, Currencies.Russia] as const
export type AllCurrencies = (typeof allCurrencies)[number]

/** Доступные валюты */
export const allCurrencies = [
  Currencies.Belarusian,
  Currencies.Europe,
  Currencies.Indonesia,
  Currencies.Kazakhstan,
  Currencies.Russia,
  Currencies.USA,
] as const
export type SupportedCurrencies = (typeof supportedCurrencies)[number]

/** Ключи всех доступные валют */
export type AllCurrenciesKeys = {
  [K in AllCurrencies]: `${K}-${Exclude<AllCurrencies, K>}`
}[AllCurrencies]

/** Ключи поддерживаемых валют */
export type SupportedCurrenciesKeys = {
  [K in SupportedCurrencies]: `${K}-${Exclude<SupportedCurrencies, K>}`
}[SupportedCurrencies]

/** Объект доступных валют */
export type AllCurrenciesRecord = {
  [K in AllCurrenciesKeys]: number
}

/** Объект поддерживаемых валют */
export type SupportedCurrenciesRecord = {
  [K in SupportedCurrenciesKeys]?: number
}

/** Формируем массив уникальных пар валют */
export const supportedCurrenciesRecords: string[] = []

for (const currency of supportedCurrencies) {
  for (const toCurrency of supportedCurrencies) {
    if (currency === toCurrency) continue
    supportedCurrenciesRecords.push(`${currency}-${toCurrency}`)
  }
}

/** Проверка, есть ли пара валют в поддерживаемых */
export const isSupportedCurrencyRecord = (
  currency: string,
): currency is SupportedCurrenciesKeys => {
  return supportedCurrenciesRecords.includes(currency)
}

/** Проверка, является ли валюта поддерживаемой */
export function isSupportedCurrencies(
  currency: AllCurrencies | string,
): currency is SupportedCurrencies {
  return supportedCurrencies.findIndex((x) => x === currency) !== -1
}
