<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :isChecked="isSelectAll"
        @click.native="checkAll"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计：{{ totalPrice }}</div>
    <div class="calculate" @click="calClick">去结算：{{ checkLength }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CheckButton from "../../../components/content/checkButton/CheckButton.vue";
export default {
  components: { CheckButton },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {//计算所有的总和价格
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {//检查商品总类数量
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {//判断是否全选
      if (this.cartList.length === 0) return false;
      //若没有商品则全选未否

      //若存在未选择的，取反则未0
      return !this.cartList.filter((item) => !item.checked).length;
    },
  },
  methods: {
    checkAll() {//点击全选
      if(this.isSelectAll){//全部选中再点击，遍历取消所有
        this.cartList.forEach(item=>item.checked=false)
      }else{//部分或者全不选
        this.cartList.forEach(item=>item.checked=true)
      }
    },
    calClick(){
      if(this.checkLength==0){
        this.$toast.show('请选择购买的商品！')
      }
    }
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  font-size: 14px;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  color: #fff;
  background-color: red;
  text-align: center;
}
</style>