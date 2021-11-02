<template>
  <div class="goods-list-item" @click="ItemClick">
    <img :src="showImage" alt="" />
    <!-- <img v-lazy="showImage" alt="" /> -->
    <div class="goods-list-item-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">￥{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImage() {
      return (
        this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      );
    },
  },
  methods: {
    ItemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
};
</script>

<style>
.goods-list-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
  /* 给定item的宽度，让每行显示两个 */
}
.goods-list-item img {
  width: 100%;
}

.goods-list-item-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-list-item-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-list-item-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-list-item-info .collect {
  position: relative;
}

.goods-list-item-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>