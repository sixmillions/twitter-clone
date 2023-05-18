<template>
  <div class="flex flex-col">
    <!-- Preview Card : What's happening -->
    <SidebarRightPreviewCard title="What's happening">
      <SidebarRightPreviewCardItem v-for="item in whatHappeningItems">
        <div>
          <h2 class="font-blod text-gray-800 text-base dark:text-white">{{ item.title }}</h2>
          <p class="text-xs text-gray-400">{{ item.count }}</p>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>
    <!-- Preview Card : Who to fllow -->
    <SidebarRightPreviewCard title="Who to follow">
      <SidebarRightPreviewCardItem v-for="item in whoToFollowItems">
        <div class="flex flex-row justify-between p-2">
          <!-- 头像 + 名字 -->
          <div class="flex flex-row">
            <img class="w-10 h-10 rounded-full" :src="item.avatar" alt="avatar">
            <div class="flex flex-col ml-2">
              <h1 class="text-sm font-bold text-gray-900 dark:text-white">{{ item.name }}</h1>
              <p class="text-xs text-gray-400 dark:text-white/40">{{ item.handle }}</p>
            </div>
          </div>
          <!-- Follow按钮 -->
          <div class="flex items-center h-full">
            <button class="px-4 py-2 font-bold text-white/95 bg-black rounded-full dark:text-black dark:bg-white">Follow</button>
          </div>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>
  </div>
</template>
<script setup>
const whatHappeningItems = ref([
  { title: 'six', count: '18.8k' },
  { title: 'millions', count: '18.8k' },
  { title: 'mimiok', count: '18.8k' },
  { title: 'lbw', count: '18.8k' },
])

const whoToFollowItems = ref([
  { name: 'Tom Li', handle: '@ssss', avatar: 'https://pic1.zhimg.com/80/v2-c29322edcd03ead5207049b44abad0d8_1440w.webp' },
  { name: 'willm liu', handle: '@xxxx', avatar: 'https://pic1.zhimg.com/80/v2-7c6505eed9db133f0d85db3315335864_1440w.webp' },
  { name: 'lucy White.', handle: '@rrr', avatar: 'https://pic2.zhimg.com/80/v2-4dbd9490f32cfe8fcc8a379a97593d69_1440w.webp' }
])
</script>
