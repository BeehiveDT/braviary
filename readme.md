# 勇士雄鷹（Braviary）

## 1. Clone braviary
Git Clone from braviary repository.

```
git clone https://github.com/BeehiveDG/braviary.git
```

## 2. 複製及設定環境參數檔
複製 `.env` 檔案
```bash
cd braviary
cp .env.example .env
```

## 3. composer 安裝套件
在 braviary 資料夾透過 composer 安裝需要的套件（記錄在 composer.json）。
```
$ composer install
```

## 4. 產生密鑰
```bash
php artisan key:generate
```
## 5. SQLite 設定
### 5.1 加入 sqlite 設定至環境參數檔
修改環境設定檔 .env
1. 修改 DB_CONNECTION，由 `mysql` 修改為 `sqlite`
2. 註解 DB_DATABASE
```
vim .env

DB_CONNECTION=mysql
=>
DB_CONNECTION=sqlite


DB_DATABASE=homestead
=>
# DB_DATABASE=homestead
```

### 5.2 加入空白 sqlite 檔
切換至 database 資料夾底下，加入 `database.sqlite`
```bash
cd database
touch database.sqlite
```
### 5.3 修改資料夾及檔案權限
修改資料夾及檔案權限以存取 database.sqlite 檔
```bash
# 回到專案目錄
# 修改資料夾權限為 755，group 設定為 www-data
chown tuvix:www-data database
chmod 775 database

# 切換至 database 資料夾
cd database
chown tuvix:www-data database.sqlite
```

## 6. 資料庫 Migration
```bash 
# 回到專案目錄後
php artisan migrate
```

## 7. Set Base URL
```bash 
vim .env

MIX_BASE_URL=http://example.com/braviary/
=>
MIX_BASE_URL=your own base url
```

## 8. npm 安裝套件
在 braviary 資料夾透過 npm 安裝需要的套件（記錄在 package.json）。
```
$ npm install
```

## 9. npm run watch
Listen for file changes while in development mode。
```
$ npm run watch
```
