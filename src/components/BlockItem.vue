<script setup lang="ts">
import type Item from '@/types/Item'

const props = defineProps<{
  item?: Item
}>()
</script>

<template>
  <div class="block">
    <div v-if="props.item" class="item">{{ props.item.name }}</div>
  </div>
</template>

<style scoped>
.block {
  display: flex;
  border: 3px solid var(--color-border);
  width: 370px;
}

.item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.item:hover {
  cursor: pointer;
}
</style>
