<template>
  <div>
    <MainSection title="Home" :loading="loading">
      Main Content
    </MainSection>
  </div>
</template>
<script setup>
const loading = ref(false)
</script>
