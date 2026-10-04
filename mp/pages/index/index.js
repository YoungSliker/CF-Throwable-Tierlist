const { DATA } = require('../../data/throwables.js');

Page({
  data: {
    tabs: [
      { key: 'grenade', label: '手雷' },
      { key: 'smoke', label: '烟雾弹' },
      { key: 'flash', label: '闪光弹' },
      { key: 'bio', label: '生化手雷' }
    ],
    activeTab: 'grenade',
    tiers: [],
    keyword: '',
    matchSet: {},
    currentName: '',
    counterText: '',
    dimmedMap: {},
    tabFlash: ''
  },

  onLoad() {
    this.loadTab('grenade');
  },

  loadTab(key) {
    const panel = DATA[key];
    this.setData({
      activeTab: key,
      tiers: panel ? panel.tiers : [],
      matchSet: {},
      currentName: '',
      dimmedMap: {},
      counterText: ''
    });
  },

  onTabTap(e) {
    const key = e.currentTarget.dataset.key;
    if (key === this.data.activeTab) return;
    this.loadTab(key);
  },

  onSearch(e) {
    const q = (e.detail.value || '').trim().toLowerCase();
    this.setData({ keyword: q });
    if (!q) {
      this.setData({ matchSet: {}, currentName: '', dimmedMap: {}, counterText: '' });
      return;
    }

    // 全局搜索：跨 tab 找匹配
    let allMatches = [];
    Object.keys(DATA).forEach(tabKey => {
      DATA[tabKey].tiers.forEach(tier => {
        tier.items.forEach(item => {
          if (item.name && item.name.toLowerCase().includes(q)) {
            allMatches.push({ tabKey, tier: tier.tier, name: item.name });
          }
        });
      });
    });

    this.allMatches = allMatches;
    this.matchIdx = 0;

    if (allMatches.length === 0) {
      this.setData({ counterText: '无匹配结果', matchSet: {}, currentName: '', dimmedMap: {} });
      return;
    }

    this.jumpToMatch(0);
  },

  jumpToMatch(idx) {
    const list = this.allMatches || [];
    if (!list.length) return;
    this.matchIdx = idx % list.length;
    const m = list[this.matchIdx];

    // 切换 tab
    if (m.tabKey !== this.data.activeTab) {
      this.loadTab(m.tabKey);
      this.setData({ tabFlash: m.tabKey });
      setTimeout(() => this.setData({ tabFlash: '' }), 700);
    }

    // 计算哪些 tier 有匹配（用于 dimmed）
    const dimmedMap = {};
    const matchSet = {};
    list.forEach(x => {
      matchSet[x.name] = true;
    });
    // 当前激活 tab 下，没匹配的 tier 置灰
    const currentPanel = DATA[m.tabKey];
    currentPanel.tiers.forEach(t => {
      const hasMatch = t.items.some(it => matchSet[it.name]);
      if (!hasMatch) dimmedMap[t.tier] = true;
    });

    this.setData({
      matchSet,
      currentName: m.name,
      dimmedMap,
      counterText: `第 ${this.matchIdx + 1} / ${list.length} 个结果`
    });

    // 滚动到对应 tier
    wx.pageScrollTo({
      selector: `.tier-row:has(.name-tag)`,
      duration: 300
    });
  },

  onConfirm() {
    if (this.allMatches && this.allMatches.length) {
      this.jumpToMatch(this.matchIdx + 1);
    }
  }
});
