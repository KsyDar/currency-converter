<template>
  <select
    :value="value"
    :class="['ui-select', `ui-select--${size}`, `ui-select--${styles}`]"
    @change="onChange"
  >
    <option v-for="(name, value) in options" :key="value" :value="value" class="ui-select__option">
      {{ name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

defineOptions({
  name: 'UISelect',
})

type PropType = {
  modelValue?: string
  options: Record<string, unknown> | unknown[]
  size?: 'medium' | 'large'
  styles?: 'default' | 'outlined'
}

interface EmitType {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<PropType>(), {
  modelValue: '',
  size: 'medium',
  styles: 'default',
})
const emit = defineEmits<EmitType>()
const value = ref('')

watch(
  () => props.modelValue,
  () => {
    value.value = props.modelValue
  },
  { immediate: true },
)

const onChange = (event: Event) => {
  const newValue = (event.target as HTMLSelectElement).value
  if (newValue) {
    emit('update:modelValue', newValue)
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.ui-select {
  transition: all 0.3s ease-in-out;

  &--medium {
    padding: 0.4rem 2rem;
  }

  &--large {
    padding: 1.2rem;
  }

  &--default {
    background: $accent-bg-color;
    border: none;
    color: $banner-background-color;

    &__option {
      background: $accent-bg-color;
    }
  }

  &--outlined {
    border: none;
    border-bottom: 0.2rem solid $main-border-color;
    color: $main-border-color;

    &:focus {
      border-bottom: 0.2rem solid $accent-bg-color;
      color: $accent-bg-color;
    }
  }
}
</style>
