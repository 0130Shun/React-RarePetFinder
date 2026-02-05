## 開工標準流程：

由於`git checkout`是老指令，使用時有一些風險
建議都改用`git switch`來創建或切換分支

```
git fetch
git switch dev
git pull
git branch  # 確認你在哪個分支
# ↓ 二選一 ↓ #
git switch feature/search-page  # 已經開過的分支
git switch -c feature/xxx   # 新開分支
```

## 每次收工標準流程：

```
git status
git add .
git commit -m "feat: xxx"
git branch # 再次確認目前在 feature 分支
# ↓ 二選一 ↓ #
git push -u origin feature/xxx // 第一次推
git push  // 之前推過，往後推用這個指令
```

❗ 任何寫 code / commit / push 前，請先確認 git branch 的星號位置

解說：（幫你回憶指令的作用）

```
git fetch
👉 更新遠端資訊，不會動到你本地的程式碼
📌用途：
1.抓最新的分支與 commit 狀態
2.看看有沒有別人推了新東西
3.很安全，隨時可以打
📌 不會發生的事：
1.不會合併
2.不會覆蓋你正在寫的檔案
```

```
git switch dev
👉 切換到團隊的開發整合分支（dev）
📌用途：
1.所有功能分支都要從 dev 開
2.確保你站在「最新、正確的起跑線」
📌 注意：
1.不要直接在 main 開發
2.不要長期在 dev 寫個人功能
```

```
git pull
👉 把 dev 的最新程式碼更新到你本地
📌用途：
1.把其他組員已合併到 dev 的內容抓下來
2.確保你不是用舊版本在開發
3.git pull 請在 dev 分支上執行
📌 如果有衝突：
1.代表你本地和 dev 有同時改到同一段
2.請先停下來處理或DC問組員
```

```
git branch
👉 列出你本地有哪些分支，並告訴你「現在站在哪一支」
* 代表你現在正在使用的分支

```

```
git switch -c feature/xxx
👉 從 dev 開一條「只屬於你」的功能分支
📌用途：
1.每個人一條（或多條）功能分支
2.避免互相踩 code
📌 原則：
1.一個 feature 分支只做一件事
2.做完再開 PR 合回 dev
```

命名範例：

```
git switch -c feature/search-page
git switch -c feature/api-fetch
git switch -c feature/modal-ui
```

## Commit 建議

規則建構參考來源：https://wadehuanglearning.blogspot.com/2019/05/commit-commit-commit-why-what-commit.html

### type

Type 是用來告訴進行 Code Review 的人應該以什麼態度來檢視 Commit 內容

```
feat: ... 新增/修改功能 (feature)
fix: ... 修補 bug (bug fix)
style: ... 切版/格式
refactor: ... 重構 (既不是新增功能，也不是修補 bug 的程式碼變動)。
chore: ... 雜項（設定、工具）建構程序或輔助工具的變動 (maintain)。
perf: 改善效能 (A code change that improves performance)。
docs: 文件 (documentation)。
test: 增加測試 (when adding missing tests)。
revert: 撤銷回覆先前的 commit 例如：revert: type(scope)
subject: (回覆版本：xxxx)。
```

### 範例

```
fix: 意見反應，信件看不到圖片問題

問題：
1. 客戶反應：意見反應的信件都看不到圖片。

原因：
1. 目前程式碼都會要求先登入後才可查看使用者上傳的檔案，
   造成在信件上會看不見圖片的問題。

調整項目：
1. File.php，經討論後，開放讓意見反應頁面上傳的檔案，不用登入就可以查看/下載。
```

📌 其他範例參見上面附的網址

## PR 規則（避免炸鍋）

```
PR 標題 = 你做了什麼
描述：影響哪些頁、怎麼做測試
PR 不超過 400 行改動（太大就拆開發）
```

### 建議格式

```
## 內容
- 完成搜尋頁主要版型
- 加入 Modal 顯示詳細資訊

## 影響範圍
- /search
- 共用 Modal 元件

## 測試方式
1. 進入搜尋頁
2. 點擊任一卡片
3. Modal 正常開關
```
