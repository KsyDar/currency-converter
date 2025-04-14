<template>
  <header class="header">
    <nav class="header__nav">
      <router-link to="/" class="header__link">Главная</router-link>
      <router-link to="/convert" class="header__link">Конвертация</router-link>
    </nav>

    <UISelect v-model="currencyStore.currentCurrency" :options="supportedCurrencies" />
  </header>
</template>

<script setup lang="ts">
import { useCurrencyStore } from '@/stores/currency'
import UISelect from '@/components/ui/UISelect.vue'

const currencyStore = useCurrencyStore()
const supportedCurrencies = currencyStore.getSupportedCurrencies()
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.header {
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
  padding: 1.6rem 2.4rem;
  background: $accent-bg-color;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 2px 0;

  &__nav {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    font-size: 2rem;
    font-weight: 700;
  }

  &__link {
    color: $banner-background-color;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: $hover-color;
    }
  }

  &__dropdown {
    margin-left: auto;
  }
}
</style>
