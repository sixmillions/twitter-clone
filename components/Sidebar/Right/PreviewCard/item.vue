<template>
  <div class="p-3 hover:bg-gray-200 cursor-pointer dark:bg-dim-300" :class="wrapperClass">
    <slot></slot>
  </div>
</template>
<script setup>
const { twitterBorderColor, defaultTransition } = useTailwindConfig()
const wrapperClass = computed(() => `${twitterBorderColor} ${defaultTransition}`)
</script>
