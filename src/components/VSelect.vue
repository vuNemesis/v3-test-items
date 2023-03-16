<script setup lang="ts">
import type Id from '@/types/Id'

const props = defineProps({
  modelValue: {
    type: [Object, Array, undefined] as PropType<Id | Id[] | undefined>,
    default: undefined
  },
  multiple: {
    type: Boolean,
    default: false
  },
  items: {
    type: Array as PropType<Id[]>,
    default: () => []
  },
  max: {
    type: Number,
    default: undefined
  }
})

const emit = defineEmits(['update:modelValue'])

const modelAsItemArray = computed<Id[]>(() => props.modelValue as Id[])

let selectedSet = reactive<Set<number>>(new Set())

const selectingDisabled = computed<boolean>(() => {
  if (props.max === undefined) {
    return false
  }

  return modelAsItemArray.value.length >= props.max
})

watch(
  () => props.modelValue,
  (modelValue) => {
    selectedSet.clear()

    if (props.multiple) {
      const selectedIds = (modelValue as Id[])?.map((item) => item.id)
      selectedSet = new Set(selectedIds)

      return
    }

    modelValue && selectedSet.add((modelValue as Id).id)
  },
  { immediate: true }
)

// select
const select = (item: Id): void => (props.multiple ? selectMultiple(item) : selectOne(item))

const selectOne = (item: Id) => {
  emit('update:modelValue', item)
}

const selectMultiple = (item: Id) => {
  if (selectingDisabled.value) {
    return
  }

  emit('update:modelValue', [...modelAsItemArray.value, item])
}

// unselect
const unselect = (item: Id): void => (props.multiple ? unselectMultiple(item) : unselectOne())

const unselectOne = () => {
  emit('update:modelValue', undefined)
}

const unselectMultiple = (item: Id) =>
  emit(
    'update:modelValue',
    modelAsItemArray.value.filter((i) => i.id !== item.id)
  )

const onClick = (item: Id): void => (selectedSet.has(item.id) ? unselect(item) : select(item))

// if (import.meta.env.MODE === 'test') {

// }
defineExpose({
  select
})
</script>

<template>
  <div>
    <slot
      v-for="item of items"
      :key="item.id"
      v-bind="{
        selected: selectedSet.has(item.id),
        disabled: selectingDisabled && !selectedSet.has(item.id),
        item,
        onClick: () => onClick(item)
      }"
      name="item"
    />
  </div>
</template>
