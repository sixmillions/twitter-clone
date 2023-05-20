<template>
  <div>
    <label class="block pl-3 ml-px text-sm font-medium text-gray-700" v-if="props.label">{{ props.label }}</label>
    <input class="block px-4 w-full border-gray-300 rounded-full shadow-sm focus:border-blue-500 sm:text-sm" :type="props.type" :value="props.modelValue" @input="event => emits('update:modelValue', event.target.value)" :placeholder="props.placeholder">
  </div>
</template>

<script setup>
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    defautl: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: null
  }
})
</script>
