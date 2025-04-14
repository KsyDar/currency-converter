<template>
  <div class="home page">
    <h1 class="home__title page-title">Курсы валют</h1>

    <ul class="home__list">
      <li v-for="rate in ratesOnCurrentCurrency" :key="rate.currency" class="home__currency">
        1 {{ supportedCurrenciesRecord[rate.currency] }} = {{ rate.costAtOne }}
        {{ supportedCurrenciesRecord[rate.toCurrency] }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useCurrencyStore } from '@/stores/currency'
import { computed } from 'vue'
import { isSupportedCurrencies, type SupportedCurrencies } from '@/types/Currencies.ts'

type HomeRateType = {
  currency: SupportedCurrencies
  toCurrency: SupportedCurrencies
  costAtOne: number
}

const currencyStore = useCurrencyStore()
const rates = await currencyStore.getCurrenciesRates()
const supportedCurrenciesRecord = currencyStore.getSupportedCurrencies()

/**
 * Ставки валют относительно выбранной
 */
const ratesOnCurrentCurrency = computed(() => {
  return Object.entries(rates).reduce<HomeRateType[]>((acc, [currencyName, currencyValue]) => {
    const [currency, toCurrency] = currencyName.split('-')
    if (!isSupportedCurrencies(currency) || !isSupportedCurrencies(toCurrency))
      throw new Error('Key is not supported currency')

    if (toCurrency !== currencyStore.currentCurrency) return acc

    acc.push({
      currency: currency,
      toCurrency: toCurrency,
      costAtOne: +currencyValue.toFixed(2),
    })
    return acc
  }, [])
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.home {
  &__title {
    margin: 0 0 2.4rem;
    text-align: center;
  }

  &__list {
    font-size: 2rem;
  }

  &__currency:not(:last-child) {
    margin-bottom: 1rem;
  }
}
</style>
