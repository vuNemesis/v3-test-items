<script setup lang="ts">
import type Item from '@/types/Item'

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])
</script>

<template>
  <div
    :class="{ item: true, item_selected: props.selected, item_disabled: props.disabled }"
    @click="emit('click')"
  >
    {{ props.item.name }}
  </div>
</template>

<style scoped>
.item {
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 80px;
  border: 4px solid var(--color-border);
  transition: all 0.1s;
}

.item_selected {
  background-color: var(--color-background-mute);
}

.item:not(.item_disabled):hover {
  cursor: pointer;
  border-color: var(--color-border-hover);
  background-color: var(--color-background-soft);
}
</style>
