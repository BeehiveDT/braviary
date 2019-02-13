# 勇士雄鷹（Braviary）

## Clone braviary
Git Clone from braviary repository.

```
git clone https://github.com/BeehiveDG/braviary.git
```

## 複製及設定環境參數檔
複製 `.env` 檔案
```bash
cd braviary
cp .env.example .env
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
修改.env
1. 修改DB_CONNECTION從mysql至sqlite
2. 註解DB_DATABASE
```
vim .env

DB_CONNECTION=mysql
=>
DB_CONNECTION=sqlite


DB_DATABASE=homestead
=>
# DB_DATABASE=homestead
```
在database底下加入database.sqlite
```bash
cd database
touch database.sqlite
```
## 資料庫 Migration
```bash 
# 回到專案目錄後
php artisan migrate
```
