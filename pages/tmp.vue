<template>
  <div>Test Test</div>
  <div> {{ user }}</div>
</template>

<script setup>
const user = await useFetchApi('/api/auth/user')
</script>
