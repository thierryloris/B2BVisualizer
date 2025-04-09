<template>
  <span :class="['stat-value', size]">{{ formattedValue }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value: number | undefined
  format?: 'currency' | 'number'
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  format: 'number',
  size: 'medium',
  value: 0,
})

const formattedValue = computed(() => {
  if (props.value === undefined) return '0'

  if (props.format === 'currency') {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(props.value)
  }
  return props.value.toLocaleString('fr-FR')
})
</script>

<style scoped>
.stat-value {
  font-weight: bold;
  color: var(--accent-color);
}

.small {
  font-size: 1rem;
}

.medium {
  font-size: 1.5rem;
}

.large {
  font-size: 2rem;
}
</style>
