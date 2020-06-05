<template>
  <div id="app" class="h-screen relative flex flex-col justify-between" style="background-color: #EEEEEE;">
    <TheHeader/>
    <router-view class="flex-1 overflow-auto"></router-view>
    <TheFooter/>
  </div>
</template>

<script>
import TheHeader from '@/components/layouts/TheHeader.vue'
import TheFooter from '@/components/layouts/TheFooter.vue'
export default {
  name: 'app',
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<style>
.the-container {
  margin: 0 auto;
  width: 75%;
}
</style>
