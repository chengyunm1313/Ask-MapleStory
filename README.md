<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 執行和部署您的 AI Studio 應用程式

此專案包含在本地執行應用程式所需的一切。

在 AI Studio 中查看您的應用程式：https://ai.studio/apps/drive/1G0jwPeZIeR9MBriUSiJewwEAN_A2figD

## 本地執行

**前置需求：** Node.js


1. 安裝相依套件：
   `npm install`
2. 在 [.env.local](.env.local) 中設定您的 Gemini API 金鑰到 `GEMINI_API_KEY`
3. 執行應用程式：
   `npm run dev`

## 部署到 GitHub

### 1. 建立 GitHub 儲存庫

1. 前往 [GitHub](https://github.com) 並登入您的帳戶
2. 點擊右上角的 "+" 按鈕，選擇 "New repository"
3. 輸入儲存庫名稱並選擇設定
4. 點擊 "Create repository"

### 2. 配置部署設定

**重要：** 在部署前，請先更新以下檔案中的儲存庫名稱：

1. **vite.config.ts** - 將 `您的儲存庫名稱` 替換為實際的儲存庫名稱
2. **package.json** - 將 `homepage` 中的 `您的用戶名` 和 `您的儲存庫名稱` 替換為實際值

### 3. 推送程式碼到 GitHub

```bash
# 初始化 Git 儲存庫（如果尚未初始化）
git init

# 添加所有檔案
git add .

# 建立第一次提交
git commit -m "Initial commit"

# 添加遠端儲存庫（替換為您的儲存庫 URL）
git remote add origin https://github.com/您的用戶名/您的儲存庫名稱.git

# 推送到 GitHub
git push -u origin main
```

### 4. 使用 GitHub Pages 部署（靜態網站）

#### 方法一：手動部署到 gh-pages 分支

```bash
# 建置專案
npm run build

# 進入建置資料夾
cd dist

# 初始化 git 並推送到 gh-pages 分支
git init
git add .
git commit -m "Deploy to GitHub Pages"
git branch -M gh-pages
git remote add origin https://github.com/您的用戶名/您的儲存庫名稱.git
git push -f origin gh-pages

# 回到專案根目錄
cd ..
```

#### 方法二：使用 gh-pages 套件自動部署

```bash
# 安裝 gh-pages 套件
npm install --save-dev gh-pages

# 在 package.json 的 scripts 中添加部署指令
# "deploy": "npm run build && gh-pages -d dist"

# 執行部署
npm run deploy
```

#### GitHub Pages 設定

1. 在您的 GitHub 儲存庫中，前往 "Settings" 頁籤
2. 向下滾動到 "Pages" 部分
3. 在 "Source" 下選擇 "Deploy from a branch"
4. 選擇 "gh-pages" 分支和 "/ (root)" 資料夾
5. 點擊 "Save"

### 5. 使用 Vercel 部署（推薦用於 React 應用）

1. 前往 [Vercel](https://vercel.com) 並使用 GitHub 帳戶登入
2. 點擊 "New Project"
3. 選擇您的 GitHub 儲存庫
4. 在環境變數設定中添加 `GEMINI_API_KEY`
5. 點擊 "Deploy"

### 6. 使用 Netlify 部署

1. 前往 [Netlify](https://netlify.com) 並登入
2. 點擊 "New site from Git"
3. 選擇 GitHub 並授權
4. 選擇您的儲存庫
5. 設定建置指令：`npm run build`
6. 設定發布目錄：`dist`（Vite 專案的建置輸出目錄）
7. 在環境變數中添加 `GEMINI_API_KEY`
8. 點擊 "Deploy site"

**注意：** 部署時請確保在部署平台的環境變數中正確設定 `GEMINI_API_KEY`，而不要將 API 金鑰直接提交到 GitHub 儲存庫中。
