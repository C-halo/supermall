<template>
  <tab-bar>
    <tab-bar-item link="/home">
      <template #icon>
        <img src="../../../assets/img/tabbar/home.svg" />
      </template>
      <template #active-icon>
        <img src="../../../assets/img/tabbar/home_active.svg" />
      </template>
      <template #text> 首页 </template>
    </tab-bar-item>
    <tab-bar-item link="/category">
      <template #icon>
        <img src="../../../assets/img/tabbar/category.svg" />
      </template>
      <template #active-icon>
        <img src="../../../assets/img/tabbar/category_active.svg" />
      </template>
      <template #text> 分类 </template>
    </tab-bar-item>
    <tab-bar-item link="/cart">
      <template #icon>
        <img src="../../../assets/img/tabbar/cart.svg" />
      </template>
      <template #active-icon>
        <img src="../../../assets/img/tabbar/cart_active.svg" />
      </template>
      <template #text> 购物车 </template>
    </tab-bar-item>
    <tab-bar-item link="/profile">
      <template #icon>
        <img src="../../../assets/img/tabbar/profile.svg" />
      </template>
      <template #active-icon>
        <img src="../../../assets/img/tabbar/profile_active.svg" />
      </template>
      <template #text> 我的 </template>
    </tab-bar-item>
  </tab-bar>
</template>

  <script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style scoped>
</style>
