# mp-jithub
Mini program for Github.

## 扫码体验
![image](https://user-images.githubusercontent.com/7871813/39956784-b3b978c0-5619-11e8-9bc4-658c8f2907e6.png)
## 本地开发
```
git clone git@github.com:dwqs/mp-jithub.git

cd mp-jithub
```

克隆项目之后，需要作如下两件事：

* 先将 `config/host-sample.js` 重命名为 `config/host.js`
* `config/host.js` 需要导出两个值：

```js
export const host = 'https://your.domain.com'; // 你的域名
export const token = 'github personal token'; // 详见: https://developer.github.com/v3/#rate-limiting
```

然后 `npm run dev`, 用微信开发者工具打开 `dist` 目录。
## 更新日志

#### 1.1.2
* 支持以截图形式查看仓库的 README
#### 1.1.0

* Trending 和 Ranking 支持点击查看详情
* 支持查看个人的仓库列表
* 优化 Ranking 页的头像展示

#### 1.0.8
* 增加 Github 中国区用户排行榜页面：[Search users](https://developer.github.com/v3/search/#search-users) [Single user](https://developer.github.com/v3/users/#get-a-single-user)
#### 1.0.7
* Trending 列表页展示
* Trending 列表页支持语言过滤

## LICENSE
MIT