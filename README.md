# 在场 · 校园连接实验室

黑客松校园互助赛道演示项目。项目把“发布信息”重新设计为“发起人与人之间的真实连接”，覆盖学习搭子、生活互助、兴趣同频、紧急需要和失物回家等场景。

## 本地预览

直接打开 `index.html`，或运行：

```bash
python3 -m http.server 8080
```

访问 `http://localhost:8080`。

## Docker

```bash
docker build -t zaichang-campus .
docker run --rm -p 8080:80 zaichang-campus
```
