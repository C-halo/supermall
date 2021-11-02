import { createStore } from 'vuex'


const store = createStore({
  state: {
    cartList: []
  },
  mutations: {
    addCounter(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      payload.checked = true
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        //payload新添加的商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

        //2.判断oldProduct+1或者新添加
        if (oldProduct) {
          context.commit('addCounter', oldProduct)
          resolve('当前商品数量+1！')
        } else {
          payload.count = 1;
          context.commit('addToCart', payload)
          resolve('商品添加到购物车成功！')
        }
      })
    }
  },
  getters: {
    cartLength(state) {
      return state.cartList.length;
    },
    cartList(state) {
      return state.cartList;
    }
  },
  modules: {
  }
})
export default store