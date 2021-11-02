<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center> 购物街</template>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    >
    </tab-control>
    <Scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probeType="3"
      @pullingUp="loadMore"
      :pullUpLoad="true"
    >
      <template #default>
        <HomeSwiper
          :banners="banners"
          @swiperImageLoad="swiperImageLoad"
        ></HomeSwiper>
        <Recommends :recommends="recommends"></Recommends>
        <home-feature-view></home-feature-view>
        <tab-control
          class="tab-control"
          :titles="['流行', '新款', '精选']"
          @tabClick="tabClick"
          ref="tabControl2"
        >
        </tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </template>
    </Scroll>
    <back-top @click="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import Recommends from "./childComps/Recommends.vue";
import HomeFeatureView from "./childComps/homeFeatureView.vue";

import NavBar from "../../components/common/navbar/NavBar.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import TabControl from "../../components/content/tabControl/TabControl.vue";
import GoodsListItem from "../../components/content/goods/GoodsListItem.vue";

import { getHomeMutidata, getHomedata } from "network/home";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import BackTop from "../../components/content/backTop/BackTop.vue";

export default {
  components: {
    HomeSwiper,
    Recommends,
    HomeFeatureView,
    NavBar,
    TabControl,
    GoodsListItem,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false, //是否显示悬停tabControl
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    this.getHomeMutidata();
    this.getHomedata("pop");
    this.getHomedata("new");
    this.getHomedata("sell");
  },
  destroyed() {
    console.log("被销毁了");
  },
  //下面两个方法必须开启keep-alive
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 1);//第3个参数设置为非0值
    //每次刷新,并滚动到上次离开时的位置,
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();

  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      //将tabControl的index更改为当前点击的index,进行同步
      this.$refs.tabControl1.currentindex = index;
      this.$refs.tabControl2.currentindex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(positon) {
      // console.log(positon);
      this.isShowBackTop = positon.y < -1000;

      //判断是否吸顶
      this.isTabFixed = -positon.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomedata(this.currentType);
      // this.$refs.scroll.scroll.refresh()
    },
    swiperImageLoad() {
      //获取底部的tabcontrol位置
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求方法
     * **/
    getHomeMutidata() {
      getHomeMutidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomedata(type) {
      const page = this.goods[type].page + 1;
      getHomedata(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page++;
        this.$refs.scroll.finishPullUp(); //每次获取完数据结束上拉
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 使用了bs后,下面的content给了顶部边距,所以不需要定位了 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  /* top: 44px; */
  z-index: 9;
}
.content {
  /* height: calc(100% - 93px); */
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>