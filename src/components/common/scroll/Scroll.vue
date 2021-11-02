<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      scroll: null, //存储scroll对象
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    scrollTo(x, y, time = 300) {
      //time是滚动时间
      this.scroll.scrollTo(x, y, time);
    },
    //结束上拉加载
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    getScrollY(){
      return this.scroll ?this.scroll.y :0
    },
    refresh(){
      this.scroll.refresh();
    }
  },
  mounted() {
    //new BScroll(载)
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      observeDOM:true,
      observeImage:true,
      pullUpLoad:this.pullUpLoad
      // probeType:3,//必须加这个，否则无法下拉
    });

    // 2.监听滚动区域
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("scroll", position);
    });

    // 3.监听scroll滚动到底部 上拉加载
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
  },
};
</script>

<style>
</style>