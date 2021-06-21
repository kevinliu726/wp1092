# HW8 ChatRoom -GraphQL Version

## Without yarn

- Please install yarn first.
- Run <code>npm install yarn -g</code>

## With yarn

1. Put ".env" file in "/backend" folder, and ".env" file should include "MONGO_URL=url_of_accessing_mongodb".
2. In "/backend" folder, run <code> yarn install</code>
3. In "/frontend" folder, run <code> yarn install</code>
4. In "/" folder, run <code> yarn server</code>
5. Open other terminal and run <code>yarn start</code> in "/" folder

## 已完成之進階要求

- Cover各種錯誤操作，並給予適當的提⽰訊息

  - 未輸入名字就按 “Sign In”
  - 未開啟任何 ChatBox 就送出訊息
  - 創建 ChatBox 時沒有輸入對話者名字，或者是與對話者之 ChatBox 已開啟 (i.e. 不可重複開啟同⼀個 ChatBox)

- 處理輸入過長時 “Line Wrapping” 的問題
