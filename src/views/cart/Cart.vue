<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <template #center> 购物车({{ length }})</template>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <template #default>
        <cart-list></cart-list>
      </template>
    </scroll>
    <cart-bottom></cart-bottom>
  </div>
</template>
<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import { mapGetters } from "vuex";
import CartListItem from "./childComps/CartListItem.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import CartList from "./childComps/CartList.vue";
import CartBottom from "./childComps/CartBottom.vue";
export default {
  components: { NavBar, CartListItem, Scroll, CartList, CartBottom },
  computed: {
    ...mapGetters({
      length: "cartLength",
      list: "cartList",
    }),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
#cart {
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 89px);
  overflow: hidden;
}
</style>