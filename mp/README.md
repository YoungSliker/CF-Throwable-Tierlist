# CF 投掷物天梯 · 微信小程序版

## 目录结构
```
mp/
├── app.js / app.json / app.wxss    # 小程序入口
├── project.config.json             # 项目配置（AppID 占位）
├── sitemap.json
├── data/throwables.js              # 全部投掷物数据（自动生成）
├── pages/index/                   # 主页面
│   ├── index.wxml / .wxss / .js / .json
├── subpkg-grenade/icons/          # 手雷图标（分包）
├── subpkg-smoke/icons/            # 烟雾弹图标（分包）
├── subpkg-flash/icons/            # 闪光弹图标（分包）
└── subpkg-bio/icons/              # 生化手雷图标（空，待补充）
```

## 使用方法
1. 下载并安装「微信开发者工具」https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
2. 打开工具 → 导入项目 → 选择本 `mp/` 目录
3. AppID 先选「测试号」即可预览；要发布需去 mp.weixin.qq.com 注册
4. 编译后即可在模拟器/真机预览

## 功能
- 4 个 tab：手雷 / 烟雾弹 / 闪光弹 / 生化手雷（占位）
- T0-T7 分级彩色徽章
- 顶部搜索：输入名称自动跨 tab 跳转，回车/空格跳下一个匹配
- 当前匹配金色高亮，其他匹配蓝色
- 图标分包加载，主包仅 24KB

## 待办
- [ ] 生化手雷分类数据待补充（提供排行截图后填入 data/throwables.js 的 bio 字段）
- [ ] 注册正式 AppID
- [ ] 真机预览后调整图标尺寸（当前 1:1 grid 5 列）
