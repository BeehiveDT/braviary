# 勇士雄鷹（Braviary）

## Clone braviary
Git Clone from braviary repository.

```
git clone git@github.com:BeehiveDG/braviary
```

## 複製及設定環境參數檔
複製並修改 `.env` 檔案，加上資料庫等帳號密碼
```bash
cd braviary
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
在 braviary 資料夾透過 composer 安裝需要的套件（記錄在 composer.json）。
```
$ composer install
```

## 產生密鑰
```bash
php artisan key:generate
```

## 加入 sqlite 設定至環境參數檔
在database底下加入database.sqlite
```bash
cd database
vim database.sqlite
(存檔)
```
修改.env
修改DB_CONNECTION從mysql至sqlite
註解DB_DATABASE
```
vim .env

DB_CONNECTION=mysql
=>
DB_CONNECTION=sqlite


DB_DATABASE=homestead
=>
# DB_DATABASE=homestead
```

## 資料庫 Migration
```bash 
php artisan migrate
```
