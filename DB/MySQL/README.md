# Setup MySQL

## 1. 作業ディレクトリの作成、各種ファイルの準備

任意の名前のディレクトリを作成し、そのディレクトリ直下に下記のとおりファイルを配置する。
```
.
├── db
│   ├── init
│   │   └── 0001_init.sql
│   └── my.cnf
├── .gitignore
└── docker-compose.yml
```

## 2. Dockerコンテナの起動

下記コマンドを実行し、コンテナを起動する。
```
docker-compose up -d --build
```

## 3. その他

## 参考資料
