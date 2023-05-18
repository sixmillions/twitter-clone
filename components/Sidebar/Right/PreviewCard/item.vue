<template>
  <div class="p-3 bg-gray-100 hover:bg-gray-200 cursor-pointer dark:bg-dim-300 dark:hover:bg-dim-200" :class="wrapperClass">
    <slot></slot>
  </div>
</template>
<script setup>
const { twitterBorderColor, defaultTransition } = useTailwindConfig()
const wrapperClass = computed(() => `${twitterBorderColor} ${defaultTransition}`)
</script>
