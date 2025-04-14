<template>
  <label class="text-field">
    <input
      :value="value"
      type="number"
      class="text-field__input text-field__input--default"
      @input="onInput"
    />
  </label>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

type PropType = {
  modelValue?: number
}

interface EmitType {
  (e: 'update:modelValue', value: number): void
}

const props = withDefaults(defineProps<PropType>(), {
  modelValue: 0,
})

const emit = defineEmits<EmitType>()

const value = ref<string>('')

watch(
  () => props.modelValue,
  () => {
    if (isNaN(props.modelValue)) {
      value.value = ''
      return
    }
    value.value = props.modelValue.toString()
  },
  { immediate: true },
)

const onInput = (event: Event) => {
  const newValue = (event.target as HTMLInputElement).valueAsNumber

  emit('update:modelValue', newValue)
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.text-field {
  position: relative;
  color: $main-border-color;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  transition: all 0.3s ease-in-out;

  &__input {
    font-weight: 500;
    width: 100%;
    outline: none;
    background-color: transparent;
    padding: 0.8rem;
    border: 0;
    border-bottom: 0.2rem solid $main-border-color;
    font-size: 2rem;

    &--default {
      &:focus {
        color: $accent-bg-color;
        border-bottom: 0.2rem solid $accent-bg-color;

        ~ .text-field__label {
          position: absolute;
          bottom: 100%;
          margin-left: 1rem;
          display: block;
          transition: 0.2s;
          font-size: 1.1rem;
          color: $accent-bg-color;
        }
      }

      &:placeholder-shown ~ .text-field__label {
        font-size: 1.4rem;
        cursor: text;
        bottom: 1rem;
        margin-left: 1rem;
      }
    }

    &::placeholder {
      color: transparent;
      user-select: none;
    }
  }

  &__label {
    font-weight: 500;
    user-select: none;
    line-height: 1;
    transition: 0.2s;

    //&--default {
    //  position: absolute;
    //  color: #888b8e;
    //  bottom: 100%;
    //  margin-left: 1rem;
    //  display: block;
    //  font-size: 1.2rem;
    //}
  }
}

input:-webkit-autofill {
  -webkit-text-fill-color: #fff;
  box-shadow: 0 0 0 3rem rgb(19, 21, 26) inset !important;
}

input:-webkit-autofill ~ .text-field__label {
  position: absolute;
  bottom: 100%;
  margin-left: 1rem;
  display: block;
  transition: 0.2s;
  font-size: 1.2rem;
}
</style>
