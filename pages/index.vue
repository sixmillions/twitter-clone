<template>
  <div>
    <MainSection title="Home" :loading="loading">
      Main Content
      <div>{{useAuthToken()}}</div>
    </MainSection>
  </div>
</template>
<script setup>
const loading = ref(false)
const { useAuthToken } = useAuth()
</script>
