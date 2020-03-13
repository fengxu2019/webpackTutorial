# 配置Webpack
## resolve
### resolve.alias
创建 `import` 或 `require` 的别名，使模块引入变得简单。

假设src目录下有一个常用模块utils，通过import引入其中的内容:
```javascript
import Utils from '../utils/index';
```
通过配置别名Utils
```javascript
module.exports = {
  //...
  resolve: {
    alias: {
      Utils: path.resolve(__dirname, 'src/utils/')
    }
  }
};
```
现在可以简化引入代码：
```javascript
import Utils from 'Utils/index';
```
也可以给`alias`对象键的末尾加上`$`表示精确匹配：
```javascript
alias: {
  Utils$: path.resolve(__dirname, 'src/utils/index')
}
```
这将产生以下结果：
```javascript
import Test1 from 'Utils'; // 精确匹配，所以 path/to/index.js 被解析和导入
import Test2 from 'Utils/index.js'; // 非精确匹配，触发普通解析
```
下面的表格展示了一些其他情况：

|别名 | import 'xyz' | import 'xyz/file.js'|
|----|------|--------
|{}|/abc/node_modules/xyz/index.js|/abc/node_modules/xyz/file.js
|{ xyz: '/abs/path/to/file.js' }|/abs/path/to/file.js|error
|{ xyz$: '/abs/path/to/file.js' }|/abs/path/to/file.js|/abc/node_modules/xyz/file.js
|{ xyz: './dir/file.js' }|/abc/dir/file.js|error
|{ xyz$: './dir/file.js' }|/abc/dir/file.js|/abc/node_modules/xyz/file.js
|{ xyz: '/some/dir' }|/some/dir/index.js|/some/dir/file.js
|{ xyz$: '/some/dir' }|/some/dir/index.js|/abc/node_moduels/xyz/file.js
|{ xyz: './dir' }|/abc/dir/index.js|/abc/dir/file.js
|{ xyz$: './dir' }|/abc/dir/index.js|/abc/node_modules/xyz/file.js
|{ xyz: 'modu' }|/abc/node_modules/modu/index.js|/abc/node_modules/modu/file.js
|{ xyz$: 'modu' }|/abc/node_modules/modu/index.js|/abc/node_modules/xyz/file.js
|{ xyz: 'modu/some/file.js' }|/abc/node_modules/modu/some/file.js|error
|{ xyz$: 'modu/some/file.js' }|/abc/node_modules/modu/some/file.js|/abc/node_modules/xyz/file.js
|{ xyz: 'modu/dir' }|/abc/node_modules/modu/dir/index.js|/abc/node_modules/modu/dir/file.js
|{ xyz: 'xyz/dir' }|/abc/node_modules/xyz/dir/index.js|/abc/node_modules/xyz/dir/file.js
|{ xyz$: 'xyz/dir' }|/abc/node_modules/xyz/dir/index.js|/abc/node_modules/xyz/file.js

>如果在 package.json 中定义，index.js 可能会被解析为另一个文件。

### resolve.enforceExtension
默认值`false`,当`true`时将不允许无扩展名文件。默认如果 ./foo 有 .js 扩展，require('./foo') 可以正常运行。但如果启用此选项，只有 require('./foo.js') 能够正常工作。

### resolve.extensions
自动解析这些扩展名的文件。默认值：['.wasm', '.mjs', '.js', '.json'].
>If multiple files share the same name but have different extensions, webpack will resolve the one with the extension listed first in the array and skip the rest.
```javascript
module.exports = {
  //...
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json']
    // react项目中需要自动解析jsx文件时，可以将 .jsx 添加进数组
    // extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx']
  }
};
```
当引入这些扩展名的模块时可以不用带扩展：
```javascript
import App from './components/app'
```

### resolve.mainFiles
解析目录时要使用的文件名, 默认值： `index`
```javascript
module.exports = {
  //...
  resolve: {
    mainFiles: ['index']
  }
};
```

### resolve.modules
告诉 webpack 解析模块时应该搜索的目录，默认值：`node_modules`。绝对路径和相对路径都可以。
当为相对路径时，会搜索当前目录和祖先目录（如：./node_modules, ../node_moduels)。
当绝对路径时，只搜索给定的目录。
```javascript
module.exports = {
  //...
  resolve: {
    modules: ['node_modules']
  }
};
```
如果要添加一个目录到模块搜索目录：
```javascript
module.exports = {
  //...
  resolve: {
    // 优先级从左到右
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  }
};
```

## context
基础目录，绝对路径，基于该配置解析入口起点和oader，默认值是: `__dirname` ( webpack.config.js 文件所在目录)。

由于我们项目的配置文件在 `/config` 目录，所以配置成：`process.cwd()`，即项目根目录。

## entry
entry 是 webpack 开始解析的起点。如果传入的值是一个数组，那么数组中每一项都会被解析。

简单规则：每个 HTML 页面都有一个入口起点。单页应用(SPA)：一个入口起点，多页应用(MPA)：多个入口起点。

### 命名
如果传入一个字符串或字符串数组，chunk 会被命名为 main。如果传入一个对象，则每个键(key)会是 chunk 的名称，该值描述了 chunk 的入口起点。

如果传入的是一个对象，值可以是字符串，字符串数组或者是一个对象（descriptor）.
```javascript
module.exports = {
  //...
  entry: {
    // 字符串
    home: './home.js', 
    // 字符串数组
    shared: ['react', 'react-dom', 'redux', 'react-redux'],
    // 对象descriptor
    catalog: { 
      import: './catalog.js', 
      filename: 'pages/catalog.js', 
      dependOn:'shared'
    },
    personal: { 
      import: './personal.js', 
      filename: 'pages/personal.js', 
      dependOn:'shared'
    }
  }
};
```

### 输出文件名
默认情况下，entry 对应的输出文件名由 `output.filename` 属性指定，但是我们可以为通过 entry 中 descriptor 的 `filename` 为每一个 entry 自定义输出文件名。
```javascript
module.exports = {
  //...
  entry: {
    app: './app.js',
    home: { import: './contact.js', filename: 'pages/[name][ext]' },
    about: { import: './about.js', filename: 'pages/[name][ext]' }
  }
};
```
### 依赖
每个entry的输出默认包含了所有其使用的 modules。通过 `dependOn` 属性可以在entry间共享 modules。
```javascript
 module.exports = {
  //...
  entry: {
    app: { 
      import: './app.js', 
      dependOn: 'react-vendors' 
    },
    'react-vendors': ['react', 'react-dom', 'prop-types']
  }
};
```
app 的输出中不会包含 react-vendors 中已包含的 modules.

### 动态entry
通过返回一个函数，可以动态指定entry. 每次编译时将会调用该函数。通过函数可以从外部获取entry. (remote server, file system content or database)

>Note that the make event triggers when webpack starts and for every invalidation when watching for file changes.
```javascript
module.exports = {
  entry() {
    return fetchPathsFromSomeExternalSource(); // returns a promise that will be resolved with something like ['src/main-layout.js', 'src/admin-layout.js']
  }
};
```
