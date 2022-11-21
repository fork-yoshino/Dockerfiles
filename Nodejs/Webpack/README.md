# Setup Webpack

## 1. 作業ディレクトリの作成、各種ファイルの準備

任意の名前のディレクトリを作成し、そのディレクトリ直下に下記のとおりファイルを配置する。
```
.
├── .gitignore
├── Dockerfile
└── docker-compose.yml
```

## 2. Dockerコンテナの起動

作業ディレクトリに移動し、下記コマンドを実行し、コンテナを起動する。
```
docker compose up -d --build
```

下記コマンドを実行し、frontendコンテナに入る。
```
docker compose exec frontend ash
```

## 3. その他

### TypeScriptのインストール & 設定ファイルの作成

`package.json`を作成する。
```
yarn init -y
```

TypeScriptパッケージをインストールし、設定ファイルを作成する。
```
yarn add --dev typescript
```
```
yarn tsc --init
```

### Webpackのインストール

Webpackパッケージをインストールする。
```
yarn add --dev webpack webpack-cli webpack-dev-server webpack-merge
```

必要なパッケージと各種ファイルに対応するローダーをインストールする。
```
yarn add --dev ts-loader html-loader css-loader sass-loader sass postcss-loader autoprefixer
```

必要なプラグインをインストールする。
```
yarn add --dev clean-webpack-plugin html-webpack-plugin webpack-watched-glob-entries-plugin mini-css-extract-plugin
```

参考:<br>
https://shuu1104.com/2021/12/4458/<br>
https://madogiwa0124.hatenablog.com/entry/2020/05/03/152217<br>
https://shuu1104.com/2021/12/4434/<br>
https://shuu1104.com/2021/11/4388/<br>

### ESLint & Prettier の設定

ESLintをインストールする。
```
yarn add --dev eslint
```

ESLintの初期設定を行う。
```
yarn run eslint --init
```

Prettierをインストールする。
```
yarn add --dev prettier eslint-config-prettier
```

下記URLを参考に、ESLintとPrettierの設定ファイルを構築する。

参考:<br>
https://zenn.dev/big_tanukiudon/articles/c1ab3dba7ba111<br>
https://qiita.com/notakaos/items/85fd2f5c549f247585b1<br>
https://chaika.hatenablog.com/entry/2021/07/10/083000<br>

### 開発用サーバーの起動

下記コマンドを実行し、開発用サーバーを起動する。
```
yarn dev
```
Webブラウザで http://localhost:8080 へアクセスし、webpack-dev-serverが起動していることを確認する。


## 参考資料
