# 勇士雄鷹（Braviary）

## Clone turtwig
Git Clone from turtwig repository.

```
git clone git@github.com:BeehiveDG/braviary
```

## 複製及設定環境參數檔
複製並修改 `.env` 檔案，加上資料庫等帳號密碼
```bash
cd turtwig
cp .env.example .env
vim .env
```

## 修改資料夾寫入權限

```bash
# Laravel requires some folders to be writable for the web server user.
sudo chgrp -R www-data storage bootstrap/cache
sudo chmod -R ug+rwx storage bootstrap/cache
```

## composer 安裝套件
在 turtwig 資料夾透過 composer 安裝需要的套件（記錄在 composer.json）。
```
$ composer install
```

## 產生密鑰
```bash
php artisan key:generate
```

## 加入 sqlite 設定至環境參數檔
```bash
vim .env
```
在檔案最後加上下面內容
```
DB_CONNECTION=mysql
=>
DB_CONNECTION=sqlite



```

## 資料庫 Migration
```bash 
php artisan migrate
```

若要 seed 一些實驗用資料，會加入各一筆資訊
```bash
php artisan migrate:refresh --seed
```

## 加入 MailGun 設定至環境參數檔
```bash
vim .env
```
在檔案後面加入 Mail 設定
```
MAIL_DRIVER=mailgun
MAIL_HOST=smtp.mailgun.org
MAIL_PORT=587
MAIL_USERNAME=service@cloud.agriweather.online
MAIL_PASSWORD=<password>
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=service@cloud.agriweather.online
MAIL_FROM_NAME=Agriweather Service
MAILGUN_DOMAIN=cloud.agriweather.online
MAILGUN_SECRET=<secret>
```

## 加入 Google Cloud Storage 參數
```bash
vim .env
```
在檔案最後面加入 Google Cloud Storage 設定
```
GOOGLE_CLOUD_PROJECT_ID=
GOOGLE_CLOUD_STORAGE_BUCKET=
GOOGLE_CLOUD_KEY_FILE=
GOOGLE_CLOUD_STORAGE_API_URI=
```
