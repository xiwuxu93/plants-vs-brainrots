# Plants vs Brainrots 数据库网站产品文档

## 1. 产品概述

### 1.1 产品定位
打造最权威的Plants vs Brainrots游戏数据库和工具网站，提供完整的植物、Brainrot数据查询、计算工具和攻略指南。

### 1.2 目标用户
- **新手玩家**: 需要了解游戏机制和角色数据
- **进阶玩家**: 寻求最优策略和效率计算
- **资深玩家**: 关注最新更新和高级攻略
- **内容创作者**: 需要准确数据制作攻略内容

### 1.3 核心价值主张
1. **最完整的数据库**: 包含所有植物和Brainrot的详细属性
2. **实用计算工具**: 提供效率分析和策略优化工具
3. **实时更新**: 跟进游戏版本更新和新内容
4. **用户友好**: 直观的界面和强大的搜索功能

## 2. 功能需求

### 2.1 核心功能模块

#### 2.1.1 植物数据库
**功能描述**: 完整的植物信息查询系统
- 植物列表展示（卡片式布局）
- 详细属性页面（伤害、成本、稀有度）
- 变异系统展示（金色、钻石、冰冻、霓虹）
- 筛选和排序功能
- 搜索功能

**技术要求**:
- 响应式设计，支持移动端
- 图片懒加载优化
- 本地存储用户偏好设置

#### 2.1.2 Brainrot数据库
**功能描述**: 完整的Brainrot信息查询系统
- Brainrot列表展示
- 收入数据和变异信息
- 重量分类展示
- 收入效率排行榜

#### 2.1.3 计算工具套件
**功能描述**: 为玩家提供策略优化工具

**子功能**:
1. **植物效率计算器**
   - 输入预算，推荐最佳植物组合
   - 伤害/成本比分析
   - 变异收益计算

2. **Brainrot收入优化器**
   - 收入效率对比
   - 变异期望收益计算
   - 投资回报分析

3. **重生收益计算器**
   - 重生前后收益对比
   - 最佳重生时机推荐

#### 2.1.4 攻略系统
**功能描述**: 提供游戏攻略和指南
- 新手入门指南
- 植物搭配推荐
- Boss战攻略
- 进阶策略分析

#### 2.1.5 兑换码中心
**功能描述**: 实时更新的兑换码页面
- 当前可用兑换码列表
- 一键复制功能
- 过期码自动标记
- 新码推送通知

### 2.2 辅助功能

#### 2.2.1 用户系统
- 收藏功能（植物/Brainrot/攻略）
- 个人计算历史
- 用户偏好设置

#### 2.2.2 搜索系统
- 全站搜索
- 智能推荐
- 搜索历史

#### 2.2.3 内容管理
- 管理员后台
- 内容更新系统
- 用户反馈收集

## 3. 技术架构

### 3.1 前端技术栈
- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **UI组件**: shadcn/ui
- **状态管理**: Zustand
- **数据获取**: SWR
- **图标**: Lucide React

### 3.2 后端技术栈
- **API**: Next.js API Routes
- **数据库**: SQLite (开发) / PostgreSQL (生产)
- **ORM**: Prisma
- **认证**: NextAuth.js
- **部署**: Vercel

### 3.3 数据结构设计

```typescript
// 植物数据模型
interface Plant {
  id: number
  name: string
  rarity: 'Rare' | 'Epic' | 'Legendary' | 'Mythic' | 'Godly' | 'Secret'
  seedCost: number
  baseDmg: number
  mutations: {
    gold: number
    diamond: number
    frozen: number
    neon: number
  }
  specialEffect?: string
  tier: string
  imageUrl?: string
  description?: string
}

// Brainrot数据模型
interface Brainrot {
  id: number
  name: string
  rarity: string
  baseIncome: number
  mutations: {
    gold: number
    diamond: number
    frozen: number
    neon: number
    rainbow: number
    galaxy: number
  }
  weight: string
  tier: string
  imageUrl?: string
}
```

## 4. 用户界面设计

### 4.1 整体设计风格
- **主题色调**: 绿色系（符合植物主题）
- **辅助色**: 橙色、紫色（对应稀有度）
- **设计风格**: 现代扁平化，游戏化元素
- **响应式**: 移动优先设计

### 4.2 页面布局结构

#### 4.2.1 首页布局
```
Header (导航栏)
├── Logo
├── 主导航 (植物库 | Brainrot库 | 计算器 | 攻略 | 兑换码)
├── 搜索框
└── 用户菜单

Hero Section
├── 标题和简介
├── 快速搜索
└── 核心功能入口

功能卡片区
├── 植物数据库入口
├── Brainrot数据库入口
├── 计算工具入口
└── 最新攻略

统计数据展示
├── 总植物数
├── 总Brainrot数
├── 最新更新时间
└── 用户数量

Footer
```

#### 4.2.2 植物数据库页面布局
```
页面标题和描述
筛选工具栏
├── 稀有度筛选
├── 价格范围
├── 伤害范围
└── 排序选项

植物卡片网格
├── 植物图片
├── 名称和稀有度
├── 基础属性
├── 快速操作按钮
└── 详情链接

分页器
```

#### 4.2.3 植物详情页布局
```
面包屑导航

植物详情卡片
├── 大图展示
├── 基础信息面板
├── 属性数据表
├── 变异效果展示
└── 相关推荐

计算工具嵌入
├── 效率分析
├── 变异收益计算
└── 搭配推荐

评论和收藏功能
```

### 4.3 关键组件设计

#### 4.3.1 植物卡片组件
```jsx
<PlantCard>
  <PlantImage />
  <PlantInfo>
    <Name />
    <Rarity badge />
    <Stats grid />
    <Actions>
      <FavoriteButton />
      <DetailsLink />
    </Actions>
  </PlantInfo>
</PlantCard>
```

#### 4.3.2 计算器组件
```jsx
<Calculator>
  <InputSection>
    <BudgetInput />
    <PreferenceSettings />
  </InputSection>
  <ResultsSection>
    <RecommendedPlants />
    <EfficiencyAnalysis />
    <AlternativeOptions />
  </ResultsSection>
</Calculator>
```

#### 4.3.3 搜索组件
```jsx
<SearchBar>
  <SearchInput />
  <SearchFilters />
  <SearchSuggestions />
  <SearchResults />
</SearchBar>
```

## 5. 用户体验流程

### 5.1 新用户首次访问流程
1. 进入首页 → 查看功能概览
2. 点击"植物数据库" → 浏览植物列表
3. 筛选感兴趣的稀有度 → 查看详细信息
4. 使用计算工具 → 获得策略建议
5. 收藏有用内容 → 注册账户（可选）

### 5.2 老用户日常使用流程
1. 直接搜索目标内容
2. 查看最新更新和兑换码
3. 使用高级计算工具
4. 参与社区讨论

## 6. SEO优化策略

### 6.1 关键词策略
- **主要关键词**: plants vs brainrots, plants vs brainrots wiki
- **长尾关键词**: plants vs brainrots codes, best plants tier list, brainrot calculator
- **本地化**: 支持英文和中文内容

### 6.2 内容优化
- 结构化数据标记
- 内链建设
- 图片ALT标签优化
- 页面加载速度优化

### 6.3 技术SEO
- XML站点地图
- Robots.txt优化
- 移动友好性
- Core Web Vitals优化

## 7. 性能要求

### 7.1 加载性能
- 首页加载时间 < 3秒
- 数据库页面加载时间 < 2秒
- 移动端性能评分 > 90

### 7.2 交互性能
- 搜索响应时间 < 500ms
- 筛选操作响应时间 < 300ms
- 页面切换动画流畅 (60fps)

## 8. 开发计划

### 8.1 Phase 1 (MVP - 4周)
- 基础数据库结构搭建
- 植物和Brainrot列表页面
- 基础搜索和筛选功能
- 响应式布局

### 8.2 Phase 2 (增强功能 - 3周)
- 详情页面开发
- 计算工具套件
- 用户系统
- 兑换码中心

### 8.3 Phase 3 (优化完善 - 2周)
- 性能优化
- SEO优化
- 管理后台
- 测试和部署

## 9. 成功指标

### 9.1 流量指标
- 月访问用户数 > 10,000
- 页面浏览量 > 50,000/月
- 平均会话时长 > 3分钟
- 跳出率 < 60%

### 9.2 用户参与度
- 注册用户转化率 > 5%
- 收藏功能使用率 > 20%
- 计算工具使用率 > 30%
- 用户留存率 (7天) > 40%

### 9.3 搜索排名
- "plants vs brainrots wiki" 排名前10
- "plants vs brainrots calculator" 排名前5
- 长尾关键词覆盖率 > 80%

## 10. 风险评估

### 10.1 技术风险
- 数据同步和更新延迟
- 高并发访问性能问题
- 移动端兼容性问题

### 10.2 竞争风险
- 官方或其他权威站点竞争
- 游戏更新导致数据过时
- 用户需求变化

### 10.3 缓解策略
- 建立自动化更新机制
- 多渠道内容获取
- 社区建设增强用户粘性
- 持续监控和快速响应

---

此产品文档为开发提供了完整的指导框架，可直接用于Claude Code开发实施。