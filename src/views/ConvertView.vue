<template>
  <div class="convert page">
    <h1 class="convert__title page-title">Конвертация валют</h1>

    <form>
      <div class="convert__row">
        <UISelect
          v-model="currencyFrom"
          :options="supportedCurrencies"
          size="large"
          styles="outlined"
          class="convert__select"
        />
        <UINumericField
          v-model="amountFrom"
          @update:modelValue="convertCurrency('from')"
          class="convert__input"
        />
      </div>

      <div class="convert__row">
        <UISelect
          v-model="currencyTo"
          :options="supportedCurrencies"
          size="large"
          styles="outlined"
          class="convert__select"
        />
        <UINumericField
          v-model="amountTo"
          @update:modelValue="convertCurrency('to')"
          class="convert__input"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { type Ref, ref, watch } from 'vue'
import { Currencies, type SupportedCurrencies } from '@/types/Currencies.ts'
import { useCurrencyStore } from '@/stores/currency'
import UISelect from '@/components/ui/UISelect.vue'
import UINumericField from '@/components/ui/UINumericField.vue'

const currencyStore = useCurrencyStore()
await currencyStore.getCurrenciesRates()

const supportedCurrencies = currencyStore.getSupportedCurrencies()

const currencyFrom = ref<SupportedCurrencies>(Currencies.Russia)
const currencyTo = ref<SupportedCurrencies>(Currencies.USA)
const amountFrom = ref<number>(1)
const amountTo = ref<number>(
  currencyStore.convert(amountFrom.value, currencyFrom.value, currencyTo.value),
)

watch(currencyFrom, (newValue, oldValue) => {
  if (newValue === currencyTo.value) {
    currencyTo.value = oldValue
    amountTo.value = amountFrom.value
    convertCurrency('from')
  }
})

watch(currencyTo, (newValue, oldValue) => {
  if (newValue === currencyFrom.value) {
    currencyFrom.value = oldValue
    amountTo.value = amountFrom.value
    convertCurrency('from')
  }
})

function convertCurrency(direction: 'from' | 'to') {
  if (direction === 'from') {
    amountTo.value = currencyStore.convert(amountFrom.value, currencyFrom.value, currencyTo.value)
  } else {
    amountFrom.value = currencyStore.convert(amountTo.value, currencyTo.value, currencyFrom.value)
  }
}
</script>

<style scoped lang="scss">
.convert {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__title {
    margin: 0 0 2.4rem;
    text-align: center;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;
    width: 100%;

    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }

  &__select {
    width: 8rem;
  }

  &__input {
    width: 20rem;
    font-size: 2rem;
  }
}
</style>
