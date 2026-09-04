# 在场 · 项目交接文档

> 最后更新：2026-09-04  
> 项目阶段：黑客松独立项目 / 可公开访问的前端演示版  
> 当前线上地址：<https://hks.yunzhicompany.com>

## 1. 一句话定位

“在场”不是传统校园论坛，而是一个以真实人际连接为核心的校园互助平台：用户发布一个具体需要，系统帮助他找到此刻恰好能回应的真实同学。

核心链路：

```text
一个具体需要 → 被同频的人看见 → 发起回应 → 建立真实连接 → 沉淀连接故事
```

## 2. 产品原则

1. **先连接人，再承载信息**：帖子不是终点，促成回应与见面才是终点。
2. **需要必须具体**：什么时间、什么地点、需要几个人、能提供什么交换。
3. **降低陌生人连接压力**：以学习、互助、兴趣和紧急场景作为自然破冰理由。
4. **强调真实校园关系**：围绕课程、院系、校园地点、活动和学生身份设计。
5. **单词功能是场景插件**：以“共享词卡、学习搭子、组队打卡”进入平台，不把产品变成独立背词软件。

## 3. 当前页面内容

当前版本是无需后端即可演示的响应式单页，已经具备：

- 人际连接主题首页与校园连接关系图
- 学习搭子、生活互助、兴趣同频、紧急需要分类
- 四级 21 天背词搭子场景
- 失物回家、课程讲题、自行车维修、摄影救场等校园案例
- 分类筛选
- 文本搜索
- 随机推荐一条同频连接
- “发起连接”表单弹窗
- 回应成功反馈
- 连接故事与平台数据展示
- 桌面端和手机端响应式布局

目前所有内容均为前端演示数据，刷新后不会保留用户操作。

## 4. 仓库与本地目录

### GitHub

- 仓库：<https://github.com/mingyiwei954-bit/base-hks-school-9.4-9.6>
- 默认分支：`main`
- 当前部署基准提交：`608fde9`
- GitHub 账号：`mingyiwei954-bit`

### 本地目录

```text
/Users/frihed/Desktop/黑客松 9月4-9月6
```

### 主要文件

```text
index.html      页面结构与演示内容
styles.css      全部视觉设计与响应式样式
app.js          筛选、搜索、弹窗、回应反馈等交互
Dockerfile      线上镜像构建文件
nginx.conf      容器内部静态站点配置
README.md       项目简要说明
HANDOFF.md      本交接文档
```

## 5. 服务器信息

### 实例

```text
云厂商：阿里云
产品：轻量应用服务器
实例名称：Docker-lydf
实例 ID：c752ef81c7f14ee984d825282db641b7
地域：华北 2（北京）
公网 IPv4：47.93.237.1
私网 IPv4：172.25.59.253
系统镜像：Docker 26.1.3
配置：2 vCPU / 2 GiB / 40 GiB ESSD
到期时间：2027-05-11 23:59:59
```

### 登录信息

```text
服务器密码：0331Ming==
Workbench 默认用户：admin
SSH 常用候选用户：root
SSH 端口：22
```

当前公网 `22` 端口可连通，但标准 SSH 会在密码输入前被服务器主动断开。部署时使用阿里云控制台的 **远程连接 → Workbench 一键连接**，该方式会免密登录 `admin` 用户，执行系统命令时使用 `sudo`。

### 用户提供的 SSH 公钥

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBuNyZH4aAlNGoLT86cbRrhsU8oJyqurIb3DFCyYSzuy mingyiwei954@gmail.com
```

这把公钥当前没有在本次部署中写入服务器。如果需要恢复普通 SSH，可将其追加到目标用户的 `~/.ssh/authorized_keys`，同时检查 `sshd`、安全中心拦截和登录封禁状态。

## 6. 域名与 HTTPS

```text
域名：hks.yunzhicompany.com
DNS A 记录：47.93.237.1
DNS TTL：600 秒
协议：HTTP 自动 301 跳转 HTTPS
证书：Let's Encrypt
证书路径：/etc/letsencrypt/live/hks.yunzhicompany.com/
当前证书到期：2026-12-03 11:47:14 UTC
自动续期：已由 Certbot 配置
```

宿主机 Nginx 配置：

```text
/etc/nginx/conf.d/hks.yunzhicompany.com.conf
```

## 7. 线上部署结构

```text
用户浏览器
    ↓ HTTPS :443
宿主机 Nginx
    ↓ 反向代理
127.0.0.1:8094
    ↓
Docker 容器 zaichang-campus
    ↓
容器内 Nginx :80
    ↓
index.html / styles.css / app.js
```

线上项目目录：

```text
/opt/hks-campus
```

Docker 信息：

```text
镜像：zaichang-campus:latest
容器：zaichang-campus
端口：127.0.0.1:8094 -> 容器 80
重启策略：unless-stopped
```

## 8. 日常开发流程

### 本地预览

```bash
cd "/Users/frihed/Desktop/黑客松 9月4-9月6"
python3 -m http.server 8080
```

浏览器访问：<http://localhost:8080>

### 提交到 GitHub

本机已经可以通过 GitHub SSH 身份 `mingyiwei954-bit` 推送：

```bash
cd "/Users/frihed/Desktop/黑客松 9月4-9月6"
git add .
git commit -m "描述本次修改"
git push origin main
```

仓库远程地址：

```text
git@github.com:mingyiwei954-bit/base-hks-school-9.4-9.6.git
```

## 9. 服务器更新命令

从阿里云 Workbench 登录后执行：

```bash
sudo git -C /opt/hks-campus fetch origin main
sudo git -C /opt/hks-campus reset --hard origin/main
cd /opt/hks-campus
sudo docker build -t zaichang-campus:latest .
sudo docker rm -f zaichang-campus 2>/dev/null || true
sudo docker run -d \
  --name zaichang-campus \
  --restart unless-stopped \
  -p 127.0.0.1:8094:80 \
  zaichang-campus:latest
```

更新后检查：

```bash
sudo docker inspect -f '{{.State.Status}}|{{.State.Running}}' zaichang-campus
curl -I http://127.0.0.1:8094/
curl -I https://hks.yunzhicompany.com/
```

## 10. 常用运维命令

### 查看容器

```bash
sudo docker ps --filter name=zaichang-campus
sudo docker logs --tail 100 zaichang-campus
```

### 重启网页

```bash
sudo docker restart zaichang-campus
```

### 检查宿主机 Nginx

```bash
sudo nginx -t
sudo systemctl status nginx --no-pager
sudo systemctl reload nginx
```

### 查看 HTTPS 证书

```bash
sudo certbot certificates
sudo certbot renew --dry-run
```

### 查看端口

```bash
sudo ss -lntp | grep -E ':22|:80|:443|:8094'
```

## 11. 回滚方法

查看历史版本：

```bash
sudo git -C /opt/hks-campus log --oneline -10
```

将 `<commit>` 替换为需要回滚的提交：

```bash
sudo git -C /opt/hks-campus reset --hard <commit>
cd /opt/hks-campus
sudo docker build -t zaichang-campus:rollback .
sudo docker rm -f zaichang-campus
sudo docker run -d \
  --name zaichang-campus \
  --restart unless-stopped \
  -p 127.0.0.1:8094:80 \
  zaichang-campus:rollback
```

## 12. 当前未完成事项

当前版本适合展示视觉与产品逻辑，但还不是可真实运营的社区。后续优先级建议如下：

### P0：让核心连接闭环真实可用

- 登录与校园身份
- 发布、编辑、结束连接
- 回应连接与发起私聊
- 人数上限和连接状态
- 举报、屏蔽和内容审核
- 数据持久化

### P1：让演示更有说服力

- 真实学校名称、教学楼和课程数据
- 一次完整的发布 → 回应 → 成功连接演示
- 连接成功后的反馈与故事沉淀
- 校园组织或班级频道
- 可量化数据：响应率、平均响应时间、真实连接数

### P2：接入单词软件

- 课程词库和四/六级词库
- 共享词卡
- 2—4 人背词搭子
- 每日打卡和互相抽查
- 单词困难点形成求助卡片

单词模块必须继续服务于“人与人连接”，不要发展成首页上的独立背词产品。

## 13. 建议的后端最小模型

真正开发时，最小数据结构只需要先覆盖：

```text
User        用户、学校、院系、年级、头像、可信状态
Connection 需要内容、分类、地点、时间、人数、状态、发起者
Response    回应者、回应内容、创建时间、接受状态
Channel     学校频道、课程频道、兴趣频道
Message     连接建立后的私聊消息
Report      举报对象、原因、处理状态
```

不要一开始做复杂 AI 记忆或重型 Agent。黑客松阶段先证明：校园中确实存在具体互助需求，并且平台能促成一次真实连接。

## 14. 项目边界

- 本项目从现在开始按独立产品维护，不依赖其他产品仓库。
- 黑客松可提交在线演示、产品说明和必要的展示材料。
- 核心仓库、服务器配置、业务数据和可复用模块不默认转让。
- 如果主办方要求源代码或衍生开发权，先检查参赛协议，再决定交付范围。
- 演示数据不应包含真实学生隐私、聊天记录或生产凭据。

## 15. 新任务接手提示词

把下面内容发给新的开发任务即可：

```text
请先完整阅读仓库根目录 HANDOFF.md，再检查当前 git 状态和线上页面 https://hks.yunzhicompany.com。这个项目叫“在场”，核心是促成真实校园人际连接，不是普通论坛。修改时保持现有视觉语言和产品定位，不覆盖服务器上的其他项目。完成修改后进行桌面端、手机端和核心交互验证，提交并推送 main，然后按 HANDOFF.md 的部署流程更新 zaichang-campus 容器，最后验证 HTTPS 线上页面。
```

