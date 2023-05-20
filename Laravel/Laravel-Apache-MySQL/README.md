# Laravel-Apache-MySQL

## 1. srcディレクトリの作成

作業ディレクトリに移動し、`src`ディレクトリを作成する。
``` sh
mkdir src
```

## 2. Dockerコンテナの起動

下記コマンドを実行し、コンテナを起動する。
``` sh
docker compose up -d --build
```

下記コマンドを実行し、appコンテナに入る。
``` sh
docker compose exec app bash
```

## 3. Laravelプロジェクトの新規作成

``` sh
# 最新バージョン
composer create-project --prefer-dist laravel/laravel .

# バージョン指定の場合
composer create-project --prefer-dist "laravel/laravel=10.*" .
```

Webブラウザで http://localhost:8080/ へアクセスし、Laravelが起動していることを確認する。

## 4. マイグレーションの実行

`src/.env`ファイル内のDB情報を下記のように編集する。
```ini
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=user
DB_PASSWORD=password
```

マイグレーションを実行し、初期テーブルを生成する。
```sh
php artisan migrate
```

## その他

### Viteでのレイアウト崩れの対応

`npm run dev`でViteを起動した際に、CSSとJSが効かずレイアウト崩れが起こる場合、下記のように対応する。

`vite.config.js`内に、`server`を追記する。
```js
export default defineConfig({
    ...
    // 追記
    server: {
        host: true,
        hmr: {
            host: 'localhost',
        },
    },
});
```

参考: https://qiita.com/hitotch/items/aa319c49d625c2a9b65e#--host-%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B<br>

### キャッシュの削除

```sh
# 全てのキャッシュを削除
php artisan cache:clear

# configのキャッシュを削除
php artisan config:clear
```

参考: https://blog.maro.style/post-1365/<br>

## 参考資料

### Laravel x Apache

https://laraweb.net/environment/8652/<br>
https://qiita.com/neneta0921/items/22f9864b6f6ff6d36004<br>

### PHP-FPM x Apache

https://qiita.com/charon/items/a284b05a838c88b5e8bc<br>
https://qiita.com/hamburg-love/items/f96ecd7fac7c13630279<br>
https://qiita.com/kouki_o9/items/113002580945e94b1456<br>
