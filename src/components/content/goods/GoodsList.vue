<template>
  <div class="goods-list">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goodsItem="item"
    >
    </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";

export default {
  components: { GoodsListItem },
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style>
.goods-list {
  display: flex;
  /* 包裹 */
  flex-wrap: wrap;
  /* 均等分 */
  justify-content: space-around;
  padding: 2px;
}
</style>