<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <template #default>
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info
          :detailInfo="detailInfo"
          @imageLoad="imageLoad"
        ></detail-goods-info>
        <detail-goods-param-info
          :paramInfo="paramInfo"
          ref="param"
        ></detail-goods-param-info>
        <detail-comment-info
          :commentInfo="commentInfo"
          ref="comment"
        ></detail-comment-info>
        <goods-list :goods="recommends" ref="recommend"></goods-list>
      </template>
    </scroll>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" v-show="toastShow"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailGoodsParamInfo from "./childComps/DetailGoodsParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import { debounce } from "common/utils";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

import Scroll from "../../components/common/scroll/Scroll.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import BackTop from "../../components/content/backTop/BackTop.vue";
// import Toast from "../../components/common/toast/Toast.vue";

export default {
  name: "Detail", //一定要给name属性，用户keep-alive的排除
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailGoodsParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: {},
      themeTopYs: [], //4部分的偏移量数组
      getThemeTopy: null, //获取偏移量的方法
      currentIndex: 0,
      isShowBackTop: false,

      //toast相关
      // message: "",
      // toastShow: false,
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      const data = res.result;
      //1.获取轮播图数据
      this.topImages = data.itemInfo.topImages;

      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //3.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 4.获取商品详细信息，一些图片
      this.detailInfo = data.detailInfo;

      // 5.保存参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      //7.获取推荐商品信息，所有界面的推荐先暂定为同一界面
      getRecommend().then((res) => {
        this.recommends = res.data.list;
      });
    });
    // 8.给getThemeTopy赋值
    this.getThemeTopy = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
    }, 100);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopy();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    contentScroll(position) {
      //  1.获取y值
      const positionY = -position.y;
      // 2.positionY和主题中值进行对比
      let tTlength = this.themeTopYs.length;
      for (let i = 0; i < tTlength; i++) {
        if (
          this.currentIndex !== i &&
          ((i < tTlength - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === tTlength - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
    },
    // 1.滚回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    //加入购物车
    addCart() {
      //1.获取需要展示的商品
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.nowPrice;
      product.iid = this.iid;
      // console.log(product);

      this.$store.dispatch("addCart", product).then((res) => {
        this.$toast.show(res)
      });
      //action事件需要使用dispatch
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  /* 遮住底部的tabbar */
  background-color: #fff;
  height: 100vh;
  /* 父组件要有一定的高度，否则是根据内容撑高的 */
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 55px);
  /* 可视高度确定 */
  overflow: hidden;
}
</style>