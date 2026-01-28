## Commit 規則（簡單就好）

規則建構參考來源：https://wadehuanglearning.blogspot.com/2019/05/commit-commit-commit-why-what-commit.html

### type 只允許使用以下類別
Type 是用來告訴進行 Code Review 的人應該以什麼態度來檢視 Commit 內容

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

其他範例參見：https://wadehuanglearning.blogspot.com/2019/05/commit-commit-commit-why-what-commit.html



## PR 規則（避免炸鍋）

PR 標題 = 你做了什麼
描述：影響哪些頁、怎麼做測試
PR 不超過 400 行改動（太大就拆開發）