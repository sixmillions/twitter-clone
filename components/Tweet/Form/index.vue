<template>
  <div>
    <TweetFormInput :user="props.user" @onSubmit="handleFormSubmit" />
  </div>
</template>
<script setup>
const { postTweet } = useTweet()
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

async function handleFormSubmit(data) {
  try {
    const res = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles
    })
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}
</script>
