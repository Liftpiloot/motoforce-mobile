<script setup>
import Notification from "@/components/UI/Notification.vue";
</script>

<template>
<router-view></router-view>
  <Notification/>
</template>

<style scoped>
header {
  line-height: 1.5;
}

body{
  font-family: 'Inter', sans-serif;
}
</style>
