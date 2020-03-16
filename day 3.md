# 配置webpack
## module
### module.noParse
防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中不应该含有 import, require, define 的调用，或任何其他导入机制。忽略大型的 library 可以提高构建性能。
```javascript
module.exports = {
  //...
  module: {
    noParse: /jquery|lodash/,
    // noParse: (content) => /jquery|lodash/.test(content)
  }
};
```
### module.rules
创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式。这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。

#### rule.exclude
排除特定条件。是 `rule.resource.exclude` 的简写，值可以是字符串或字符串数组。当提供了该值以后，不可以使用 `rule.resource`。

#### rule.include
匹配特定条件。是 `rule.resource.include` 的简写，值可以是字符串或字符串数组。当提供了该值以后，不可以使用 `rule.resource`。

#### rule.issuer
限定当是指定的发起者时应用该规则。该选项可以用来将 loader 应用到一个特定模块或一组模块的依赖中。

#### rule.loader
是 `Rule.use: [ { loader } ]` 的简写。

#### rule.oneOf
规则数组，只使用第一条匹配的规则。

#### rule.options / rule.query
是 `Rule.use: [ { options } ]` 的简写。`rule.query` 已废弃。

#### rule.use
指定应用于模块的 `UseEntry` 数组，每个 `UseEntry` 指定一个loader.
当为字符串数组时，是 loader 属性的简写。`use: [ 'style-loader' ])` = `use: [{ loader: 'style-loader' }]`

##### UseEntry
是一个对象，必须包含 `loader` 属性。
可以包含 `options` 属性，其值可以为字符串或者对象。该属性作为 `loader`的 options。
也可以通过一个函数返回 UseEntry.
