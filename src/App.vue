<template>
  <div id="nav">
    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <main-tab-bar />
  </div>
</template>


<script>
import mainTabBar from "components/content/mainTabbar/MainTabBar";
export default {
  name: "app",
  components: {
    mainTabBar,
  },
};
</script>
<style>
@import "assets/css/base.css";
</style>
