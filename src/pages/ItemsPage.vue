<script setup lang="ts">
import type Item from '@/types/Item'
import { userItemsData, otherItemsData } from '@/mock/items'

// user items
const userItems = ref<Item[]>(userItemsData)
const selectedUserItems = ref<Item[]>([])
const selectedMaxCount: number = 6

const onRemoveItemFromSelectedUserItems = (item: Item): void => {
  selectedUserItems.value = selectedUserItems.value.filter((i) => i.id !== item.id)
}

// other items
const otherItems = ref<Item[]>(otherItemsData)
const selectedOtherItem = ref<Item | undefined>()

const onResetSelectedOtherItem = (): void => {
  selectedOtherItem.value = undefined
}
</script>

<template>
  <div class="page">
    <div class="page__top">
      <block-items>
        <item-card
          v-for="item in selectedUserItems"
          :key="item.id"
          :item="item"
          @click="onRemoveItemFromSelectedUserItems(item)"
        />

        <template #bottom>
          Выбрано: {{ selectedUserItems.length }} / {{ selectedMaxCount }}
        </template>
      </block-items>

      <block-item :item="selectedOtherItem" @click="onResetSelectedOtherItem" />
    </div>

    <div class="page__bottom">
      <v-select
        v-model="selectedUserItems"
        :items="userItems"
        :max="selectedMaxCount"
        multiple
        class="items"
      >
        <template #item="{ item, selected, disabled, onClick }">
          <item-card
            :item="item as Item"
            :selected="selected"
            :disabled="disabled"
            @click="onClick"
          />
        </template>
      </v-select>

      <v-select v-model="selectedOtherItem" :items="otherItems" class="items">
        <template #item="{ item, selected, onClick }">
          <item-card :item="item as Item" :selected="selected" @click="onClick" />
        </template>
      </v-select>
    </div>
  </div>
</template>

<style scoped>
.page {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.page__top {
  display: flex;
  justify-content: space-between;
  height: 250px;
}

.page__bottom {
  margin-top: 3rem;
  display: flex;
  flex: 1;
}

.items {
  flex: 1;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: min-content;
  padding: 1rem;
  border: 3px solid var(--color-border);
  color: var(--color-text);
}

.items + .items {
  margin-left: 2rem;
}
</style>
