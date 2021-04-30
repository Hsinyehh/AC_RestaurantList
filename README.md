# AC_RestaurantList

## 網站功能描述
* 餐廳清單 
	* 使用者可在首頁看到所有餐廳的簡介
	* 點擊餐廳可跳至個別餐廳介紹頁面
	* 能夠以餐廳名字和餐廳分類搜尋喜愛的餐廳
	* 使用者可以在首頁及介紹頁新增一家餐廳
	* 使用者可以在首頁刪除一家餐廳
	* 使用者可以在首頁及介紹頁修改一家餐廳

## 環境建置與需求 
* Node js 14.16.1 - 開發環境 
* Express 4.17.1 - 框架
* Express Handlebars 5.3.0 - 模板引擎 
* Mongoose 5.12.6 -  MongoDB ODM
* MongoDB 4.2.13 - 資料庫

## 安裝與執行步驟 (以下為終端機輸入語法)
* 下載檔案  
  `git clone https://github.com/Hsinyehh/AC_RestaurantList.git`
 
* 切換至該資料夾  
 `cd AC_RestaurantList`

* 安裝expres等上述環境建置  
 `npm install express`

* 執行程式  
 `npm run dev`

* 下載種子資料
 `node models/seeds/restaurantSeeder.js`

* 啟動完成請至 http://localhost:3000/ 
