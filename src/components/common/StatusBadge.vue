<template>
  <span :class="['badge', status === 'Oui' ? 'recurring' : 'non-recurring']">
    {{ status }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  status: 'Oui' | 'Non'
}>()
</script>

<style scoped>
.badge {
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.875rem;
}

.badge.recurring {
  background: rgba(65, 184, 131, 0.2);
  color: #41b883;
}

.badge.non-recurring {
  background: rgba(228, 102, 81, 0.2);
  color: #e46651;
}
</style>
