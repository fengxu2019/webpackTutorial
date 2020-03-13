# Day 1 初始化项目
## 创建项目根目录及子目录
```Bash
mkdir webpackTutorial

cd webpackTutorial

mkdir src dist public
```
## 初始化项目
`npm init -y`

## 安装react
`npm i react react-dom -S`

## 安装webpack
`npm i webpack webpack-cli -D`

### 在package.json 中添加webpack命令
```javascript
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --mode production", // for production
    "dev": "webpack --mode development", // for development
  },
```
## 安装babel,以解析es6和jsx
`npm i @babel/core @babel/cli @babel/preset-env @babel/preset-react -D`

* babel-core: 是babel的核心包
* babel-cli: 可以通过控制台进行代码转换
* preset-env: 负责转换es6+
* preset-react: 负责装换jsx


### 配置babel
在根目录下创建一个名为 `.babelrc` 的文件，文件里加入如下内容：
```javascript
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

## 配置webpack，以支持react
安装 `babel-loader`

`npm i babel-loader -D`

在根目录下新建 `webpack.config.js` 文件，加入如下内容:
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
```
## 在public目录创建index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Webpack & React tutorial</title>
    <!-- include bundle js here will cause 'Target container is not a DOM element.' -->
    <!-- <script src="../dist/main.js"></script> -->
  </head>
  <body>
    <div id="app"></div>
    <script src="../dist/main.js"></script>
  </body>
</html>

```
>`main.js` 必须要放在尾部引入，如果放在 `head` 部分会报，`Target container is not a DOM element.`错误.

## 创建 src/index.js

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app.jsx";

ReactDOM.render(<App />, document.getElementById("app"));
```

## 创建 src/componentsapp.jsx
```javascript
import React from "react";

class App extends React.Component {
  render() {
    return <div>Hello world!</div>;
  }
}

export default App;
```

## 以开发模式打包代码
`npm run dev`

