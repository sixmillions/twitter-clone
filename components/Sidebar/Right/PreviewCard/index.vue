<template>
  <div class="m-2 border rounded-2xl bg-gray-100 dark:bg-dim-700 overflow-hidden" :class="twitterBorderColor">
    <h1 class="p-3 text-xl font-extrabold text-gray-900 border-b dark:text-white">
      {{ props.title }}
    </h1>
    <slot></slot>
    <div class="p-3 text-sm text-sky-400 cursor-pointer hover:bg-gray-200 dark:hover:bg-dim-200" :class="defaultTransition">
      Show More
    </div>
  </div>
</template>
<script setup>
const { twitterBorderColor, defaultTransition } = useTailwindConfig()
const props = defineProps({
  title: {
    type: String,
    requird: true
  }
})
</script>
