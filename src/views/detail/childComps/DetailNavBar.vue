<template>
  <div>
    <nav-bar>
      <template #left>
        <div class="back" @click="backCilck">
          <img src="../../../assets/img/common/back.svg" alt="" />
        </div>
      </template>
      <template #center>
        <div class="title">
          <div
            v-for="(item, index) in titles"
            :key="index"
            class="title-item"
            :class="{ active: index === currentIndex }"
            @click="itemClick(index)"
          >
            {{ item }}
          </div>
        </div>
      </template>
      <template #right></template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar.vue";
export default {
  components: { NavBar },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      
      this.$emit('titleClick',index)
    },
    backCilck() {
      this.$router.back();
    },
  },
};
</script>

<style>
.title {
  display: flex;
}
.title-item {
  text-align: center;
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 12px;
}
</style>