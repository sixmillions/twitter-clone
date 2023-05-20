// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  telemetry: false, //关闭询问
  runtimeConfig: {
    jwtAccessTokenSecret: '123',
    jwtRefreshTokenSecret: '456'
  }
})
