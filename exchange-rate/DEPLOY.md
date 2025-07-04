# 微信部署指南

本指南将帮助您将汇率查询器部署到网上，以便在微信中访问使用。

## 部署方式

### 方式1：GitHub Pages (推荐，免费)

1. **上传到GitHub仓库**
   ```bash
   # 在您的项目根目录中
   git add .
   git commit -m "Add exchange rate calculator"
   git push origin main
   ```

2. **开启GitHub Pages**
   - 进入GitHub仓库页面
   - 点击 `Settings` 标签
   - 滚动到 `Pages` 部分
   - 在 `Source` 中选择 `Deploy from a branch`
   - 选择 `main` 分支和 `/ (root)` 目录
   - 点击 `Save`

3. **访问链接**
   - 部署完成后，您的应用将在以下地址可访问：
   - `https://[您的用户名].github.io/[仓库名]/exchange%20rate/`

### 方式2：Vercel (推荐，免费)

1. **注册Vercel账户**
   - 访问 [vercel.com](https://vercel.com)
   - 使用GitHub账户登录

2. **部署项目**
   - 点击 `New Project`
   - 选择包含汇率查询器的GitHub仓库
   - 设置根目录为 `exchange rate`
   - 点击 `Deploy`

3. **获取访问链接**
   - 部署完成后，Vercel会提供一个访问链接
   - 例如：`https://your-project.vercel.app`

### 方式3：Netlify (免费)

1. **注册Netlify账户**
   - 访问 [netlify.com](https://netlify.com)
   - 使用GitHub账户登录

2. **拖放部署**
   - 将 `exchange rate` 文件夹直接拖放到Netlify的部署区域
   - 或者连接GitHub仓库进行自动部署

### 方式4：腾讯云静态网站托管

1. **开通腾讯云静态网站托管**
   - 访问腾讯云控制台
   - 开通静态网站托管服务

2. **上传文件**
   - 将 `exchange rate` 文件夹中的所有文件上传
   - 设置 `index.html` 为首页

## 微信中的使用

### 1. 生成二维码
- 使用在线二维码生成工具
- 输入您的部署链接
- 生成二维码供用户扫描

### 2. 微信分享
- 在微信中打开您的链接
- 点击右上角的分享按钮
- 分享给好友或朋友圈

### 3. 微信公众号菜单
如果您有微信公众号，可以：
- 在公众号菜单中添加链接
- 在文章中插入链接
- 使用自定义菜单功能

## 优化建议

### 1. 域名配置
- 购买并配置自定义域名
- 配置HTTPS证书（免费）
- 确保域名备案（中国大陆）

### 2. 性能优化
- 启用CDN加速
- 压缩图片和资源
- 使用浏览器缓存

### 3. 微信适配
- 测试在不同微信版本中的兼容性
- 优化加载速度
- 确保功能在微信内置浏览器中正常工作

## 注意事项

### 1. 域名要求
- 确保域名已备案（中国大陆用户）
- 使用HTTPS协议
- 避免使用被微信屏蔽的域名

### 2. 功能限制
- 微信浏览器可能限制某些JavaScript功能
- 确保API调用在微信环境中正常工作
- 测试各种网络环境下的表现

### 3. 用户体验
- 优化移动端界面
- 确保触摸操作流畅
- 提供清晰的使用说明

## 测试清单

部署完成后，请在微信中测试以下功能：

- [ ] 页面正常加载
- [ ] 汇率转换功能正常
- [ ] 图表显示正常
- [ ] 触摸操作响应良好
- [ ] 网络异常时的备用数据
- [ ] 分享功能正常
- [ ] 不同屏幕尺寸的适配

## 故障排除

### 1. 页面无法加载
- 检查域名和HTTPS配置
- 确认文件路径正确
- 检查网络连接

### 2. 功能异常
- 查看浏览器控制台错误
- 检查API接口访问权限
- 确认微信浏览器兼容性

### 3. 样式问题
- 检查CSS文件路径
- 确认移动端样式正确
- 测试不同设备的显示效果

## 技术支持

如遇到部署问题，可以：
- 检查项目的README.md文件
- 查看GitHub Issues
- 联系开发者获取帮助

---

**提示**：建议先在测试环境中验证所有功能，确认无误后再正式发布。 