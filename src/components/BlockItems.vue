<template>
  <div class="block">
    <div class="items">
      <slot />
    </div>
    <div class="bottom">
      <slot name="bottom" />
    </div>
  </div>
</template>

<style scoped>
.block {
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 3px solid var(--color-border);
  width: 370px;
}

.bottom {
  text-align: center;
  padding-bottom: 0.5rem;
}

.items {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: min-content;
  align-items: start;
  padding: 1rem;
  flex: 1;
}
</style>
