<template>
  <div>
    <MainSection title="Home" :loading="loading">
      Main Content
      <div>{{ token }}</div>
      <div>{{ user }}</div>
      <button @click="refreshCnt">刷新</button>
    </MainSection>
  </div>
</template>
<script setup>
const loading = ref(false)
const { useAuthToken, useAuthUser } = useAuth()

const token = ref('')
const user = ref({})
const refreshCnt = () => {
  token.value = useAuthToken().value
  user.value = useAuthUser().value
}

</script>
