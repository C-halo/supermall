<template>
  <Swiper class="detail-swiper">
    <template #1>
      <SwiperItem v-for="(item, index) in topImages" :key="index">
        <template #2>
          <img :src="item" alt="" />
        </template>
      </SwiperItem>
    </template>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>