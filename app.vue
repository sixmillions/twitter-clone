<template>
  <div :class="{ 'dark': darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <!-- 元素的最小高度为 100%，即与父元素的高度相同，如果父元素的高度为 auto，则该元素的高度也为 auto。 -->
      <div class="min-h-full">
        <!--
        grid: 表示这是一个网格布局。
        grid-cols-12: 定义网格有12列。您可以更改数字以定义不同数量的列。
        mx-auto: 设置网格容器水平居中。
        sm:px-6: 在sm屏幕大小及以上的屏幕上设置网格容器左右内边距为6。
        lg:max-w-7xl: 在lg屏幕大小及以上的屏幕上设置网格容器的最大宽度为7xl (7xl=80rem 1rem默认16px，所以7xl默认是1280px)。
        lg:px-8: 在lg屏幕大小及以上的屏幕上设置网格容器左右内边距为8，也就是2rem，也就是32px。
        lg:gap-5: 在lg屏幕大小及以上的屏幕上设置网格列之间的间隔为5，也就是1.25rem，也就是20px。
       -->
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
          <!-- Left sidebar -->
          <!--
          hidden：此类用于将元素隐藏，如果在这段代码中应用了该类，则该元素将被隐藏，不会在网页中显示。
          md:block：此类在md大小及以上的屏幕上将元素设置为块级元素。
          xs:col-span-1：此类定义了在xs屏幕大小上网格中此元素的跨度为1列。
          xl:col-span-2：此类定义了在xl屏幕大小上网格中此元素的跨度为2列。
         -->
          <div class="hidden md:block xs:col-span-1 xl:col-span-2">
            <!--
            "sticky" 表示元素相对于其最近的具有滚动框的祖先元素（或浏览器窗口）固定在指定位置。
            "top-0" 设置元素的顶部边缘距离其最近的具有定位属性的祖先元素的顶部边缘的距离为 0。
            "sticky top-0" 的组合实际上是将元素固定在页面顶部，并与页面一起滚动。也就是一滚动就被遮住了
           -->
            <div class="sticky top-0">
              <SidebarLeft />
            </div>
          </div>
          <!-- Main content -->
          <!-- Right Sidebar -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const darkMode = ref(false)
</script>
