# 安装环境
> 1.全局安装 vue-cli npm install vue-cli -g
> 2.cd demo_vue vue init webpack > 选择安装rooter
> 3.npm install
> 4.npm install less less-loader vuex --save-dev
> 5.main.js import引入bootstrap.min.css

# ./config/index.js
```
var webpack = require('webpack')
修改assetsPublicPath，决定打包后是绝对路径还是相对路径
assetsPublicPath: './'
```
