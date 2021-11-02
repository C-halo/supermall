import Toast from './Toast'
import { createApp } from 'vue'

//vue3.x自定插件
const createMount = options => {
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)

  const app = createApp(Toast, {
    ...options,
    remove() {
      app.unmount(mountNode)
      document.body.removeChild(mountNode)
    }
  })
  return app.mount(mountNode)
}

const toast = options => {
  return createMount(options)
}

toast.install = app => {
  app.component('Toast', Toast)
  app.config.globalProperties.$toast = new toast()
}

export default toast