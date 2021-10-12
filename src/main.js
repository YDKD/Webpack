import { math } from "./js/math";
const { countPrice } = require('./js/format')

import './js/element'

// 由于模块热更新是默认为全局文件都会进行修改，所以会刷新浏览器
// 会造成性能消耗，可以采取以下办法指定模块
if(module.hot) {
    module.hot.accept('./js/element', () => {
        // 接收一个回调，可以处理一些东西
        console.log('hot')
    })
}

import { createApp } from 'vue/dist/vue.esm-bundler'

import App from './vue/App.vue'

const app = createApp(App)
app.mount("#app")



console.log(math(3, 2))
console.log(countPrice())

const arr = [1, 2, 3]

arr.forEach(item => console.log(item));



// babel转换 
// npx babel .\demo.js --out-file build.js --plugins=@babel/plugin-transform-arrow-functions
