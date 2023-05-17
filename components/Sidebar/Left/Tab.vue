<template>
  <!--
    flex: 使用 flex 布局；
    items-center: 将子元素在主轴方向上居中对齐；
    p-3: 设置 padding 为 3；
    w-min: 设置元素的宽度为最小宽度；
    text-black: 文本颜色为黑色；
    hover:bg-gray-300: 鼠标悬停时背景颜色为灰色；
    space-x-4: 同一元素组内子元素之间的横向间距为 4；
    rounded-full: 圆角为满圆；
    dark:hover:bg-dim-200: 在暗黑模式下，鼠标悬停时背景颜色为灰暗色；
    dark:text-white: 在暗黑模式下，文本颜色为白色。
   -->
  <NuxtLink to="#" class="flex items-center p-3 w-min text-black rounded-full hover:bg-gray-300 space-x-4 dark:hover:bg-dim-200 dark:text-white"
    :class="defaultTransition">
    <div class="w-6 h-6" :class="defaultTransition">
      <slot name="icon"></slot>
    </div>
    <!--
      默认隐藏，在xl大小下显示
     -->
    <div class="hidden text-xl xl:block" :class="textClass">
      <slot name="name"></slot>
    </div>
  </NuxtLink>
</template>
<script setup>
const { defaultTransition } = useTailwindConfig()

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

// 凸显激活状态
const textClass = computed(() => props.active ? 'font-semibold' : 'font-normal')
</script>
