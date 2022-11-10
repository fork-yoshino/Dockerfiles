# NestJS

## 1. 作業ディレクトリの作成、各種ファイルの準備

任意の名前のディレクトリを作成し、そのディレクトリ直下に下記のとおりファイルを配置する。
```
.
├── .gitignore
├── docker-compose.yml
└── Dockerfile
```

## 2. Dockerイメージのビルド

ターミナルを開いて作業ディレクトリに移動し、下記コマンドを実行する。<br>
```sh
docker compose build --no-cache
```

## 3. NestJSプロジェクトの作成

下記コマンドを実行し、NestJSプロジェクトを作成する。
```sh
docker compose run --rm backend nest new test-app --skip-git
```
`? Which package manager would you ❤️  to use?`と聞かれるので、`yarn`を選択する。<br>

下記コマンドを実行し、NestJSプロジェクトを`test-app`ディレクトリからルートディレクトリに移動する。
```sh
mv test-app/{*,.*} .
```
`*` : 全てのディレクトリ・ファイル<br>
`.*` : 全てのドットディレクトリ・ドットファイル<br>

下記コマンドを実行し、空になったtest-appディレクトリを削除する。
```sh
rmdir test-app
```

## 4. Dockerコンテナの起動

下記コマンドを実行し、コンテナを起動する。
```sh
docker compose up -d
```

## 5. その他

## 参考資料
