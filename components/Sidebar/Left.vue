<template>
  <div class="h-screen flex flex-col">
    <!--
      p-2 将内边距设置为2。
      my-2 将上下外边距设置为2。
      w-min 将宽度设置为最小内容宽度。也就是跟着内容变化，这里内容设置为w-8，并且这个元素设置为p2 my-2，所以这个div是w-12，也就是48px
      hover:bg-blue-500 将背景颜色设置为蓝色-500当元素悬停时。
      rounded-full 将边框半径设置为满圆形。
      dark:hover:bg-white/20 在暗模式环境中，将背景颜色设置为白色，透明度为20%，当元素悬停时。
    -->
    <div class="p-2 my-2 w-min rounded-full hover:bg-blue-500 dark:hover:bg-white/20" :class="defaultTransition">
      <NuxtLink to="/">
        <div class="w-8 h-8">
          <LogoTwitter />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup>
const { defaultTransition } = useTailwindConfig()
</script>
