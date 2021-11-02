<template>
  <div>
    <cart-list-item
      v-for="(item, index) in cartListItem"
      :key="index"
      :itemInfo="item"
    >
    </cart-list-item>
  </div>
</template>

<script>
import CartListItem from "./CartListItem.vue";

export default {
  components: { CartListItem },
  computed: {
    cartListItem() {
      return this.$store.state.cartList;
    },
  },
};
</script>

<style>
</style>