<template>
  <Swiper>
    <template #1>
      <SwiperItem v-for="(item, index) in banners" :key="index">
        <template #2>
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imageLoad" />
          </a>
        </template>
      </SwiperItem>
    </template>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  data() {
    return {
      isLoad: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        // console.log('轮播图加载');
        this.isLoad = true;
      }
    },
  },
};
</script>

<style>
</style>